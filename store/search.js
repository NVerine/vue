export const state = () => ({
  table: [],
  search_limit: 10,
  search_offset: 0,
  limitItens: [
    {value: 10, text: 10},
    {value: 25, text: 25},
    {value: 50, text: 50},
    {value: 100, text: 100}
  ],
  urlApi: null
});

// try not to use mutations
export const mutations = {
  setTable(state, data) {
    state.table = data
  },
  setSearch_limit(state, value ) {
    state.search_limit = value;
  },
  setSearch_offset(state, value ) {
    state.search_offset = value;
  },
  setUrlApi(state, value ) {
    state.urlApi = value;
  },
};

export const actions = {
  setTable(context, data) {
    context.commit('setTable', data);
  },
  setSearch_limit(context, value) {
    context.commit('setSearch_limit', value);
  },
  setSearch_offset(context, value) {
    context.commit('setSearch_offset', value);
  },
  setUrlApi(context, value) {
    context.commit('setUrlApi', value);
  }
}