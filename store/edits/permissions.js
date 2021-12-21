import {getField, updateField} from 'vuex-map-fields';
import Vue from 'vue';

export const state = () => ({
  urlApi: "/api/permissions/",
  id: null,
  data: {
    routes: {}
  },
  checkeds: []
});


export const getters = {
  // Add the `getField` getter to the
  // `getters` of your Vuex store instance.
  getField,
}

// try not to use mutations
export const mutations = {
  // Add the `updateField` mutation to the
  // `mutations` of your Vuex store instance.
  updateField,
  setData(state, value) {
    state.data = value;
  },
  setId(state, val) {
    state.id = val;
  },
  toggleChecked(state, value) {
    let index = state.checkeds.indexOf(value)
    if (index > -1){
      state.checkeds.splice(index, 1);
    }
    else{
      state.checkeds.push(value);
    }
  }
};

export const actions = {
  setData({commit, dispatch}, value) {
    for(let r in value.permissions){
      commit("toggleChecked", value.permissions[r].route);
    }
    commit("setData", value);
  },
  toggleChecked({commit, dispatch}, value){
    commit("toggleChecked", value);
  },
  getData({commit, dispatch, rootState}, id) {
    commit("setId", id);
    return dispatch("edit/getData", {url: rootState.edits.permissions.urlApi, id: rootState.edits.permissions.id}, {root: true}).then((r) => {
      if (r) dispatch("setData", r);
    });
  },
  submit({dispatch, state}) {
    let url = `${state.urlApi}${state.id}/edit`;
    let data = Object.assign({}, state.data);
    data.permissions = state.checkeds;
    dispatch('edit/submit', {url, data}, {root: true})
  }
}