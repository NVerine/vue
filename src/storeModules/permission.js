import axios from "axios";
import Routes from "../router";

const permissions = {
  state: () => ({
    permissoes: {},
    token: {
      token: null,
      date: null
    }
  }),
  actions: {
    // eslint-disable-next-line no-unused-vars
    loadPermissoes({commit, state}) {
      axios
        .get("/api/permissoes/current")
        .then((response) => {
          state.permissoes = response.data.dados;
        })
        .catch(() => {
          // console.log(error);
          // if(error.response.status === 401){
          delete localStorage.token;  // temporario enquanto n�o crio uma tabela de sess�es
          // para controlar multiplas conex�es
          Routes.push({ name: "login"});
          //}
        });
    }
  },
  mutations: {
    setToken(state, data){
      state.token.token = data.token;
      state.token.date = data.date;
    }
  }
};

export default permissions;