import { ArrowUpRight,Copy } from "lucide-react";
import Link from "next/link";

export function ReferralPanel() {
  return (
    <div id="pf-refer" data-pf-panel="">
      <section className="pf-card">
        <header>
          <h2>Your referral code</h2>
        </header>
        <div className="pf-code">
          <strong>NUSRAT148</strong>
          <button
            type="button"
            id="copy-referral"
            aria-label="Copy referral code"
          >
            <Copy size={16} strokeWidth={1.8} aria-hidden="true" /> Copy
          </button>
        </div>
        <p className="pf-note">
          Your friend gets ৳1,000 off with this code. Seven days after their
          first payment, you receive ৳1,000 credit. One code per course
          enrollment.
        </p>
        <p className="pf-status" id="copy-status" role="status" />
      </section>
      <section className="pf-card">
        <header>
          <h2>Referral activity</h2>
          <Link className="pf-textlink" href="/student/payments">
            View payments{" "}
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </header>
        <p className="pf-note">
          ৳1,500 credit added · ৳1,000 expected on 21 October
        </p>
        <div className="pf-record">
          <span>
            <b>Farhana R.</b>
            <small>14 Sep · WordPress B14</small>
          </span>
          <span>Credit added</span>
        </div>
        <div className="pf-record">
          <span>
            <b>Sabbir Ahmed</b>
            <small>22 Sep · Graphic Design B9</small>
          </span>
          <span>Credit added</span>
        </div>
        <div className="pf-record">
          <span>
            <b>Afsana Mim</b>
            <small>14 Oct · WordPress B14</small>
          </span>
          <span>Enrolled</span>
        </div>
      </section>
      <section className="pf-card">
        <header>
          <h2>Redeem a coupon</h2>
        </header>
        <form className="pf-redeem">
          <label htmlFor="pf-coupon">Coupon code</label>
          <div>
            <input
              id="pf-coupon"
              autoComplete="off"
              maxLength={12}
              placeholder="PUJA15"
              aria-describedby="pf-redeem-msg"
            />
            <button className="pf-primary">Apply</button>
          </div>
          <p className="pf-status" id="pf-redeem-msg" role="status" />
          <div data-redeem-action="" />
        </form>
      </section>
    </div>
  );
}
