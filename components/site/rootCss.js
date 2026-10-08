/* Root font size and scroll offset used by the marketing site. Rendered as a
   <style> element by the site layout, so it only applies while a marketing
   page is on screen and never changes the app's rem sizing. */
export const SITE_ROOT_CSS = "html{font-size:clamp(15px, 0.625vw + 7px, 18px); scroll-padding-top:calc(env(safe-area-inset-top,0rem) + 4.75rem); -webkit-text-size-adjust:100%}\n@media (max-width:900px){html{font-size:16px}}"