const pessoas = {
  state: () => ({
    cidades: [],
    estados: []
  }),
  mutations: {
    saveEstados (state, lista) {
      state.estados = lista;
    },
    saveCidades(state, lista){
      state.cidades = lista;
    }
  },
};

export default pessoas;