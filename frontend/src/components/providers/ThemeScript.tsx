/** Inline before paint — mirrors assets/js/theme.js */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("eit-theme");var n=localStorage.getItem("eit-nav");var r=document.documentElement;r.setAttribute("data-theme",t==="dark"?"dark":"light");if(n==="mini"&&r.classList.contains("is-console"))r.setAttribute("data-nav","mini");}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
