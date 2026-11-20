export function PasswordRecoveryForm() {
  return (
    <form className="form-stack" id="recovery-form">
      <section data-recovery="phone">
        <label className="text-field">
          Mobile number
          <input
            type="tel"
            inputMode="tel"
            defaultValue="01700000000"
            pattern="01[0-9]{9}"
            required
          />
        </label>
        <p className="field-note">
          Use the sample number to preview account recovery.
        </p>
      </section>
      <section data-recovery="code" hidden>
        <label className="text-field">
          Verification code
          <input
            inputMode="numeric"
            maxLength={6}
            pattern="246810"
            required
            disabled
          />
        </label>
        <p className="field-note">Enter the demo code 246810.</p>
      </section>
      <section data-recovery="password" hidden>
        <label className="text-field">
          New demo password
          <input
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            disabled
          />
        </label>
        <p className="field-note">
          Use at least eight characters for this preview.
        </p>
      </section>
      <button className="primary-action" id="recovery-next">
        Continue
      </button>
    </form>
  );
}
