export const questions = [
  {
    title: "Which files must every WordPress theme have?",
    answers: [
      { label: "functions.php", code: true },
      { label: "index.php and style.css", code: true },
      { label: "header.php", code: true },
      { label: "single.php", code: true },
    ],
    selected: 1,
  },
  {
    title: "Which function is the right way to load a theme stylesheet?",
    answers: [
      { label: "wp_enqueue_style()", code: true },
      { label: "wp_head()", code: true },
      { label: "include_css()", code: true },
      { label: "add_style()", code: true },
    ],
    selected: 0,
  },
  {
    title:
      "For a single blog post, which template does WordPress look for first?",
    answers: [
      { label: "index.php", code: true },
      { label: "singular.php", code: true },
      { label: "single.php", code: true },
      { label: "page.php", code: true },
    ],
    selected: 0,
  },
  {
    title: "What does get_header() do?",
    answers: [
      { label: "Prints the site title", code: false },
      { label: "Loads the header.php template", code: false },
      { label: "Adds the main menu", code: false },
      { label: "Loads style.css", code: false },
    ],
    selected: -1,
  },
  {
    title: "Where do you register a navigation menu location?",
    answers: [
      { label: "functions.php, with register_nav_menus()", code: false },
      { label: "header.php, with wp_nav_menu()", code: false },
      { label: "style.css", code: false },
      { label: "Only in the dashboard", code: false },
    ],
    selected: -1,
  },
  {
    title: 'What is "The Loop" used for?',
    answers: [
      { label: "Repeating CSS rules", code: false },
      { label: "Showing posts from the current query", code: false },
      { label: "Caching pages", code: false },
      { label: "Loading plugins", code: false },
    ],
    selected: -1,
  },
  {
    title: "Which hook should you use to enqueue scripts?",
    answers: [
      { label: "init", code: true },
      { label: "wp_footer", code: true },
      { label: "wp_enqueue_scripts", code: true },
      { label: "admin_menu", code: true },
    ],
    selected: -1,
  },
  {
    title: "A child theme’s style.css needs which header line?",
    answers: [
      { label: "Parent: twentytwentyfour", code: false },
      { label: "Template: parent-folder-name", code: false },
      { label: "Import: parent", code: false },
      { label: "Child: true", code: false },
    ],
    selected: -1,
  },
  {
    title: "What does the_title() do?",
    answers: [
      { label: "Returns the site name", code: true },
      { label: "Prints the current post’s title", code: true },
      { label: "Sets the page title tag", code: true },
      { label: "Prints an h1 heading", code: true },
    ],
    selected: -1,
  },
  {
    title: "Which file is the final fallback in the template hierarchy?",
    answers: [
      { label: "home.php", code: true },
      { label: "archive.php", code: true },
      { label: "404.php", code: true },
      { label: "index.php", code: true },
    ],
    selected: -1,
  },
];
