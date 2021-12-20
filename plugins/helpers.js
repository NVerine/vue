export default ({app}, inject) => {
  let locale = app.i18n.locale === app.i18n.defaultLocale ? '' : '/' + app.i18n.locale;

  const helper = {
    // no location required
    redirect(path) {
      if (path.substring(0, 3) == locale) {
        app.router.push('/' + path);
        return;
      }
      app.router.push(locale + path);
    },
    logout() {
      app.store.dispatch("session/logout");
      app.router.push(locale + '/login');
    },
    isLogged() {
      return app.store.state.session.user_id || false;
    },
    toStart() {
      helper.redirect('/');
    },
    oneLevelUp() {
      app.router.replace("./").then(()=>{
        // if u want to reload all the page use this code
        // app.router.go(0);
      });
    },
    redirPath(path) {
      app.router.replace("./"+path);
    }
  }

  inject('helper', helper)
}