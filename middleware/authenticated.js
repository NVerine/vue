export default function ({ app }) {
  // If the user is not authenticated
  if (process.browser && !app.$helper.isLogged()) {
    app.$helper.redirect('/login');
  }
}