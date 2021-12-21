import {getField, updateField} from 'vuex-map-fields';
import Vue from 'vue';

export const state = () => ({
  urlApi: "/api/person/",
  id: null,
  data: {
    address: [],
    contact: [],
    mainAddressIndex: null,
    mainContactIndex: null,
  },
  model: {
    address: {
      district: null,
      address: null,
      address_complement: null,
      number: null,
      city: null,
      zip: null,
    },
    contact: {
      contact_name: null,
      email: null,
      phone: null
    }
  }
});


export const getters = {
  // Add the `getField` getter to the
  // `getters` of your Vuex store instance.
  getField,
  getAddressList: (state, getters, rootState, rootGetters) => {
    let retorno = [];
    for (var r in rootState.edit.data.address) {
      if (rootState.edit.data.address[r].address
        && rootState.edit.data.address[r].city
        && rootState.edit.data.address[r].number) {
        let txt = rootState.edit.data.address[r].city + " - " +
          rootState.edit.data.address[r].address + " " +
          rootState.edit.data.address[r].number;
        retorno.push({value: r, text: txt});
      }
    }
    return retorno;
  },
  getContactList: (state, getters, rootState, rootGetters) => {
    let retorno = [];
    for (var r in rootState.edit.data.contact) {
      if (rootState.edit.data.contact[r].phone && rootState.edit.data.contact[r].email) {
        let txt = rootState.edit.data.contact[r].email + " - " +
          rootState.edit.data.contact[r].phone;
        retorno.push({value: r, text: txt});
      }
    }
    return retorno;
  }
}

// try not to use mutations
export const mutations = {
  // Add the `updateField` mutation to the
  // `mutations` of your Vuex store instance.
  updateField,
  setData(state, value) {
    state.data = value;
  },
  setMainAddress(state, value) {
    Vue.set(state.data, 'mainAddressIndex', value);
  },
  setMainContact(state, value) {
    Vue.set(state.data, 'mainContactIndex', value);
  },
  newAddress(state) {
    state.data.address.push(Object.assign({}, state.model.address));
  },
  newContact(state) {
    state.data.contact.push(Object.assign({}, state.model.contact));
  },
  delAddress(state, pos) {
    if (state.data.address[pos].id) {
      Vue.set(state.data.address[pos], "exclude", true);
    } else {
      state.data.address.splice(pos, 1);
    }
  },
  delContact(state, pos) {
    if (state.data.contact[pos].id) {
      Vue.set(state.data.contact[pos], "exclude", true);
    } else {
      state.data.contact.splice(pos, 1);
    }
  },
  setId(state, val) {
    state.id = val;
  }
};

export const actions = {
  setMainAddress({state, commit}, mainAddress = null) {
    if (!state.data.address) return;
    if (mainAddress) {
      commit("setMainAddress", mainAddress);
      return;
    }

    if (!state.data.main_address || !state.data.main_address.id) return;
    for (var r in state.data.address) {
      if (state.data.address[r].id === state.data.main_address.id){
        commit("setMainAddress", r);
        return;
      }
    }
  },
  setMainContact({state, commit}, mainContact = null) {
    if (!state.data.contact) return;
    if (mainContact) {
      commit("setMainContact", mainContact);
      return;
    }

    if (!state.data.main_contact || !state.data.main_contact.id) return;
    for (var r in state.data.contact) {
      if (state.data.contact[r].id === state.data.main_contact.id) {
        commit("setMainContact", r);
        return;
      }
    }
  },
  setData({commit, dispatch}, value) {
    commit("setData", value);
    dispatch("setMainAddress");
    dispatch("setMainContact");
  },
  newAddress({commit}) {
    commit("newAddress");
  },
  newContact({commit}) {
    commit("newContact");
  },
  delContact({commit}, pos) {
    commit("delContact", pos);
  },
  dellAddress({commit}, pos) {
    commit("delAddress", pos);
  },
  getData({commit, dispatch, rootState}, id) {
    commit("setId", id);
    return dispatch("edit/getData", {url: rootState.edits.person.urlApi, id: rootState.edits.person.id}, {root: true}).then((r) => {
      if (r) dispatch("setData", r);
    });
  },
  submit({dispatch, state}) {
    let url = `${state.urlApi}${state.id}/edit`;
    let data = state.data;
    dispatch('edit/submit', {url, data}, {root: true})
  }
}