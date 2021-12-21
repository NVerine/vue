const defaultState = () => {
  return{
    user_id: null,
    username: null,
    name: null,
    group: null,
    photo: null,
    branch_name: null,
    branch_id: null,
    permissions: null,
    token: {
      token: null,
      date: null
    }
  }
}

export const state = () => defaultState();

export const mutations = {
  login(state, data) {
    state.token.token = data.token;
    state.token.date = data.date;
    state.username = data.username;
    state.user_id = data.user_id;
    state.name = data.usuario_nome;
    state.group = data.grupo;
    state.photo = data.photo;
    state.branch_id = data.branch_id;
    state.branch_name = data.branch_name;
  },

  logout(clear) {
    window.localStorage.clear();
    Object.assign(clear, defaultState());
  }
};

export const actions = {
  // makes the store of all saved datas from login
  login(context, data) {
    context.commit('login', data);
    if (this.$helper.isLogged()) {
      this.$helper.toStart();
    }
  },
  logout({ commit }){
    commit('interfacectrl/clearState', null, { root: true })
    commit('session/logout', null, { root: true })
  }
}