"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { onIdTokenChanged, reload, signOut, type User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/auth/firebase-client";
import {
  accountApi,
  errorMessage,
  portalHome,
  type Profile,
} from "@/lib/api/account";
import "@/styles/account.css";
import { PortalLoadingSkeleton } from "./PortalLoadingSkeleton";
import { AccountUnavailableScreen } from "./AccountUnavailableScreen";

type Session = {
  phase: "loading" | "signed-out" | "verification" | "ready" | "error";
  user: User | null;
  profile: Profile | null;
  error: string;
};
type Context = Session & {
  refresh: (force?: boolean) => Promise<Profile | null>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<Context | null>(null);
export const useAccount = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("Account provider missing");
  return value;
};
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    phase: "loading",
    user: null,
    profile: null,
    error: "",
  });
  const revision = useRef(0);
  const load = useCallback(async (user: User | null) => {
    const version = ++revision.current;
    const save = (state: Session) => {
      if (version === revision.current) setSession(state);
    };
    if (!user) {
      save({ phase: "signed-out", user: null, profile: null, error: "" });
      return null;
    }
    if (!user.emailVerified) {
      save({ phase: "verification", user, profile: null, error: "" });
      return null;
    }
    try {
      const profile = await accountApi.me();
      save({ phase: "ready", user, profile, error: "" });
      return profile;
    } catch (error) {
      save({ phase: "error", user, profile: null, error: errorMessage(error) });
      return null;
    }
  }, []);
  const refresh = useCallback(
    async (force = false) => {
      let user: User | null = null;
      try {
        user = firebaseAuth().currentUser;
        if (force && user) {
          await reload(user);
          await user.getIdToken(true);
        }
        return await load(user);
      } catch (error) {
        ++revision.current;
        setSession({
          phase: "error",
          user,
          profile: null,
          error: errorMessage(error),
        });
        return null;
      }
    },
    [load],
  );
  useEffect(() => {
    try {
      return onIdTokenChanged(firebaseAuth(), (user) => {
        void load(user);
      });
    } catch (error) {
      setSession({
        phase: "error",
        user: null,
        profile: null,
        error: errorMessage(error),
      });
    }
  }, [load]);
  useEffect(() => {
    const focus = () => {
      void refresh();
    };
    window.addEventListener("focus", focus);
    return () => window.removeEventListener("focus", focus);
  }, [refresh]);
  async function logout() {
    await signOut(firebaseAuth());
    ++revision.current;
    setSession({ phase: "signed-out", user: null, profile: null, error: "" });
    window.location.assign("/");
  }
  return (
    <AuthContext.Provider value={{ ...session, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function AccessGate({ children }: { children: React.ReactNode }) {
  const account = useAccount();
  const path = usePathname();
  const router = useRouter();
  const protectedPath =
    /^(\/admin|\/mentor|\/student)(\/|$)/.test(path) &&
    ![
      "/student/login",
      "/student/forgot-password",
      "/student/verify-email",
    ].includes(path);
  const home = account.profile && portalHome(account.profile);
  const wrongPortal =
    protectedPath && home && path.split("/")[1] !== home.split("/")[1];
  useEffect(() => {
    if (!protectedPath) return;
    if (account.phase === "signed-out" || account.phase === "verification")
      router.replace("/");
    else if (wrongPortal) router.replace(home!);
  }, [protectedPath, account.phase, wrongPortal, home, router]);
  if (!protectedPath) return <>{children}</>;
  if (account.phase === "error")
    return (
      <AccountUnavailableScreen
        error={account.error}
        onRetry={() => void account.refresh(true)}
      />
    );
  if (account.phase !== "ready" || wrongPortal)
    return <PortalLoadingSkeleton />;
  return (
    <>
      {!/(\/profile|\/roles)$/.test(path) &&
        ![
          "/admin/courses",
          "/admin/course-edit",
          "/admin/batch-edit",
          "/admin/batch-detail",
          "/admin/mentors",
        ].includes(path) && (
          <p className="account-demo-note">
            Course, schedule and payment information is sample data. Your
            account and profile are connected.
          </p>
        )}
      {children}
    </>
  );
}
export function SignOutButton({
  className,
  children = "Sign out",
}: {
  className?: string;
  children?: React.ReactNode;
} = {}) {
  const { logout } = useAccount();
  const [error, setError] = useState("");
  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => void logout().catch((e) => setError(errorMessage(e)))}
      >
        {children}
      </button>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
