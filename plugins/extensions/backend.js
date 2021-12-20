export default ({store, $axios, $config, app }, inject) => {
  const backend = $axios.create();

  // Add a request interceptor
  backend.onRequest(config => {
    store.dispatch('interfacectrl/addLoading');
    config.url = $config.urlApi+config.url;

    // tratamento de requisições autentificadas
    if (store.state.session.token) {
      config.headers.common["Token"] = store.state.session.token.token;
      config.headers.common["Username"] = store.state.session.username;
    }

    return config;
  });

  backend.onResponse(response => {
    store.dispatch('interfacectrl/dcrLoading');
    if(response.data.notify.length > 0){
      for(let r in response.data.notify){
        store.dispatch('interfacectrl/addMessage', response.data.notify[r]);
      }
    }
    return response;
  });

  backend.onError( error => {
    store.dispatch('interfacectrl/dcrLoading');
    if (!error.response || error.response.status === 401){
      app.$helper.logout();
      return Promise.reject(404);
    }
    if(error.response.data.message){
      store.dispatch('interfacectrl/addMessage', {type: "danger", text: error.response.data.message});
    }
    return Promise.reject(error.response.data);
  });

  inject('backend', backend)
}