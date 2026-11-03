# Web Interface Guidelines notes (milestone 7)

Checked against Vercel Web Interface Guidelines on the Next port:

- Forms use visible labels (`eit-field__label`) and `aria-describedby` on coupon field.
- Dialogs / popovers keep Esc + focus return via the ported interaction layer.
- Theme preference persists; no flash via inline boot script.
- Reduced motion: GSAP path and CSS animations respect `prefers-reduced-motion`.
- Touch targets bumped for notification list links (`min-height: 44px`).
- Public routes use Anek Bangla + JetBrains Mono (Geist removed).
- Placeholder owner content remains bracketed: `[SUPPORT PHONE]`, `[DIRECTOR NAME]`, `[SMS PROVIDER]`.

## Audit fix pass (shells + public flows + shared CSS)

- `layout.tsx` — skip link to `#main-content`.
- `globals.css` — `touch-action: manipulation`, enroll responsive `.p-enroll-grid`, skip-link styles, `html[data-theme="dark"]` color-scheme.
- `eit.css` — `color-scheme: dark` for `html[data-theme="dark"]`.
- `panel.css` — mobile `.p-iconbtn` stays 44×44.
- `console.css` — `.c-iconbtn` 44×44; `:focus-visible` on icon buttons and `.c-me`.
- `HtmlMain.tsx` / public pages — `#main-content` landmark for skip link.
- `navIcons.tsx` + shells — distinct icons per nav item (replaced placeholder circles/grids).
- `ConsoleShell.tsx` — `aria-label` on account menu; theme toggle `aria-pressed`.
- Login / forgot-password / enroll — single `h1`, form validation, `autocomplete` / `type` / placeholders with `…`, radiogroup keyboard via `useRadioGroup`, checkout pay is submit (not bare link), no `href="#"`.
