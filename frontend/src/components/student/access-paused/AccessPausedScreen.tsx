import { AccessSupport } from "./AccessSupport";
import { OverdueInstallment } from "./OverdueInstallment";
import { PausedAccessNotice } from "./PausedAccessNotice";
export function AccessPausedScreen() {
  return (
    <>
      <main className="p-main">
        <div className="p-split">
          <PausedAccessNotice />
          <aside
            style={{
              flex: "1 1 300px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <OverdueInstallment />
            <AccessSupport />
          </aside>
        </div>
      </main>
    </>
  );
}
