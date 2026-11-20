export function SecurityPanel() {
  return (
    <div id="pf-security" data-pf-panel="">
      <section className="pf-card">
        <header>
          <h2>Password</h2>
        </header>
        <p className="pf-note">
          Try the password form with sample values in this demo.
        </p>
        <form id="profile-password" method="post">
          <div className="pf-grid">
            <label className="pf-field">
              <span>Current demo password</span>
              <input
                type="password"
                name="current"
                autoComplete="off"
                required
              />
            </label>
            <label className="pf-field">
              <span>New demo password</span>
              <input
                type="password"
                name="next"
                autoComplete="off"
                minLength={8}
                required
              />
              <small>At least 8 characters</small>
            </label>
            <label className="pf-field">
              <span>Repeat new password</span>
              <input
                type="password"
                name="repeat"
                autoComplete="off"
                required
              />
            </label>
          </div>
          <div className="pf-actions">
            <button className="pf-primary">Check password</button>
            <p className="pf-status" id="password-status" role="status" />
          </div>
        </form>
      </section>
      <section className="pf-card">
        <header>
          <h2>Signed-in devices</h2>
        </header>
        <div className="pf-record">
          <span>
            <b>Chrome on Windows</b>
            <small>Dhaka · active now</small>
          </span>
          <span>This device</span>
        </div>
        <div className="pf-record" data-other-device="">
          <span>
            <b>Android phone</b>
            <small>Dhaka · last active 14 Oct</small>
          </span>
          <button type="button" className="pf-secondary" id="device-logout">
            Sign out device
          </button>
        </div>
        <p className="pf-status" id="device-status" role="status" />
      </section>
    </div>
  );
}
