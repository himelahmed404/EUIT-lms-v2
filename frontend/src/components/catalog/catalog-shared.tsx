"use client";
import {
  cloneElement,
  useEffect,
  useId,
  useState,
  type ReactElement,
} from "react";
import { useAccount } from "@/components/account/auth-provider";
import { errorMessage } from "@/lib/api/account";
import "@/styles/catalog.css";
export function useCatalogResource<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null),
    [error, setError] = useState(""),
    [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setData(null);
    setError("");
    load()
      .then((value) => {
        if (active) setData(value);
      })
      .catch((e) => {
        if (active) setError(errorMessage(e));
      });
    return () => {
      active = false;
    };
  }, [load, revision]);
  return { data, error, retry: () => setRevision((v) => v + 1) };
}
export function ResourceState({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) {
  return error ? (
    <div role="alert">
      <p>{error}</p>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  ) : (
    <p role="status">Loading catalog…</p>
  );
}
export function CatalogPanel({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="account-card catalog-panel">
      {children}
    </main>
  );
}
export function CatalogPermission({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const { profile } = useAccount();
  return profile?.permissions.includes(permission) ? (
    children
  ) : (
    <CatalogPanel>
      <h1>Access unavailable</h1>
      <p>Your account does not have permission to view this catalog screen.</p>
    </CatalogPanel>
  );
}
export function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (page: number) => void;
}) {
  return (
    <nav className="account-actions" aria-label="Results pages">
      <button disabled={page === 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} · {total} results
      </span>
      <button disabled={page * 20 >= total} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </nav>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactElement<{ id?: string }>;
}) {
  const id = useId();
  return (
    <div className="catalog-field">
      <label htmlFor={id}>{label}</label>
      {cloneElement(children, { id })}
    </div>
  );
}
