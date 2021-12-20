export const state = () => ({
  cidades: [],
  estados: []
});

export const mutations = {
  saveEstados(state, lista) {
    state.estados = lista;
  },
  saveCidades(state, lista) {
    state.cidades = lista;
  }
};
