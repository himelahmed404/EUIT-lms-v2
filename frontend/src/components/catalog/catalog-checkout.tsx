"use client";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "@/components/account/auth-provider";
import { accountApi, errorMessage } from "@/lib/api/account";
import {
  catalogApi,
  resolveChoice,
  days,
  tk,
  type CatalogChoice,
} from "@/lib/api/catalog";
import {
  CatalogPanel,
  Field,
  ResourceState,
  useCatalogResource,
} from "./catalog-shared";
import { EnrollTop } from "@/components/enroll/EnrollChrome";
function CheckoutInner() {
  const params = useSearchParams(),
    courseId = params.get("course") || "";
  const { profile, refresh, phase } = useAccount();
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [submitError, setSubmitError] = useState("");
  const load = useCallback(() => catalogApi.course(courseId), [courseId]);
  const { data: course, error, retry } = useCatalogResource(load);
  const selected = course && resolveChoice(course, params);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!course || !selected) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    setSubmitError("");
    try {
      // Re-read just before account setup; never accept a price or batch from the URL.
      const latest = await catalogApi.course(course.id),
        current = resolveChoice(latest, params);
      if (
        !current ||
        JSON.stringify(current.plan) !== JSON.stringify(selected.plan)
      ) {
        retry();
        throw new Error(
          "This batch or price changed. Review the latest selection before continuing.",
        );
      }
      const choice: CatalogChoice = {
        course: course.id,
        batch: current.batch.id,
        format: current.batch.format,
        plan: current.plan.id,
      };
      sessionStorage.setItem("euit.pending-enrollment", JSON.stringify(choice));
      if (profile) {
        await accountApi.updateProfile({ phone: String(form.get("phone")) });
        await refresh();
        setMessage(
          "Contact details saved. Enrollment and online payments are not available yet. Contact the office to enroll.",
        );
      } else {
        await accountApi.signup(
          String(form.get("name")),
          String(form.get("email")),
          String(form.get("password")),
        );
        setMessage(
          "Account request accepted. Verify your email and sign in. Your course selection is saved in this browser. No payment has been taken.",
        );
      }
    } catch (e) {
      setSubmitError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <EnrollTop />
      <CatalogPanel>
        <h1>Review your course selection</h1>
        <p>
          Account setup is available. Online enrollment and payment are coming
          soon.
        </p>
        {!courseId ? (
          <p role="alert">
            Select a course and batch first.{" "}
            <Link href="/enroll/course">Browse courses</Link>
          </p>
        ) : !course ? (
          <ResourceState error={error} retry={retry} />
        ) : !selected ? (
          <p role="alert">
            This selection is unavailable. The batch may be full, closed, or its
            plan may have changed.{" "}
            <Link href="/enroll/course">Choose an available batch</Link>
          </p>
        ) : (
          <>
            <section>
              <h2>{course.title}</h2>
              <p>
                {selected.batch.name} · {selected.batch.format} · Starts{" "}
                {selected.batch.startDate}
              </p>
              <p>
                {selected.batch.repeatDays.map((d) => days[d]).join(" & ")} ·{" "}
                {selected.batch.startTime}–{selected.batch.endTime} (
                {selected.batch.timeZone})
              </p>
              <p>
                {selected.batch.location} · {selected.batch.seatsAvailable}{" "}
                seats available
              </p>
              <h3>{selected.plan.label}</h3>
              <p className="catalog-price">
                {tk(selected.plan.total)} BDT total
              </p>
              <p>{selected.plan.amounts.map(tk).join(" + ")}</p>
              <p>
                Published price only. A final quote, discounts and payment due
                dates will be confirmed when enrollment opens.
              </p>
              <Link href="/enroll/course">Change course, batch or plan</Link>
            </section>
            {message && (
              <p role="status">
                {message} <Link href="/">Sign in</Link>
              </p>
            )}
            {submitError && <p role="alert">{submitError}</p>}
            <section>
              <h2>
                {profile ? "Contact details" : "Create your student account"}
              </h2>
              <form
                key={profile?.id ?? "guest"}
                onSubmit={submit}
                aria-label="Account setup"
              >
                <div className="account-grid">
                  <Field label="Full name">
                    <input
                      name="name"
                      defaultValue={profile?.fullName}
                      readOnly={!!profile}
                      required
                      maxLength={120}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email address">
                    <input
                      name="email"
                      type="email"
                      defaultValue={profile?.email}
                      readOnly={!!profile}
                      required
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Mobile number">
                    <input
                      name="phone"
                      type="tel"
                      defaultValue={profile?.phone ?? ""}
                      required
                      pattern="[+0-9 ()-]{7,24}"
                      autoComplete="tel"
                    />
                  </Field>
                  {!profile && (
                    <Field label="Create a password">
                      <input
                        name="password"
                        type="password"
                        minLength={8}
                        required
                        autoComplete="new-password"
                      />
                    </Field>
                  )}
                </div>
                <label className="account-toggle">
                  <input type="checkbox" name="terms" required />I understand
                  account setup does not reserve a seat or take payment.
                </label>
                <button
                  disabled={busy || !["ready", "signed-out"].includes(phase)}
                >
                  {busy
                    ? "Please wait…"
                    : profile
                      ? "Save contact details"
                      : "Create account"}
                </button>
              </form>
            </section>
          </>
        )}
      </CatalogPanel>
    </>
  );
}
export function CatalogCheckout() {
  return (
    <Suspense fallback={<p>Loading checkout…</p>}>
      <CheckoutInner />
    </Suspense>
  );
}
