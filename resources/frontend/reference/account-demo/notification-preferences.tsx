export function NotificationPreferences() {
  return (
    <div id="notifications" data-pf-panel="">
      <section className="pf-card">
        <header>
          <h2>Notification preferences</h2>
        </header>
        <p className="pf-note">
          All updates appear in your student panel. Choose which ones you also
          receive by SMS or email.
        </p>
        <label className="pf-setting">
          <span>
            <b>Class updates</b>
            <small>Room changes, rescheduled classes and new recordings.</small>
          </span>
          <input
            type="checkbox"
            role="switch"
            data-pref="classes"
            defaultChecked
          />
        </label>
        <label className="pf-setting">
          <span>
            <b>Marks and feedback</b>
            <small>Project marks and replies from your mentor.</small>
          </span>
          <input type="checkbox" role="switch" data-pref="marks" />
        </label>
        <label className="pf-setting">
          <span>
            <b>Quiz reminders</b>
            <small>When a new class quiz opens.</small>
          </span>
          <input
            type="checkbox"
            role="switch"
            data-pref="quizzes"
            defaultChecked
          />
        </label>
        <label className="pf-setting">
          <span>
            <b>Payment reminders</b>
            <small>
              Required SMS reminder three days before each installment.
            </small>
          </span>
          <input
            type="checkbox"
            role="switch"
            data-pref="payments"
            defaultChecked
            disabled
          />
        </label>
        <label className="pf-setting">
          <span>
            <b>Email receipts</b>
            <small>Send a payment receipt to your profile email.</small>
          </span>
          <input
            type="checkbox"
            role="switch"
            data-pref="receipts"
            defaultChecked
          />
        </label>
        <p className="pf-status" id="pref-status" role="status" />
      </section>
    </div>
  );
}
