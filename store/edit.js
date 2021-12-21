import {getField, updateField} from 'vuex-map-fields';

export const state = () => ({
  data: [],
});

// try not to use mutations
export const mutations = {
  // Add the `updateField` mutation to the
  // `mutations` of your Vuex store instance.
  updateField,
  setData(state, value) {
    state.data = value;
  }
};

export const getters = {
  // Add the `getField` getter to the
  // `getters` of your Vuex store instance.
  getField,
}

export const actions = {

  getData({commit, dispatch}, {url, id}) {
    let el = this;
    if (id > 0) {
      url += id;
    } else {
      return null;
    }

    dispatch("interfacectrl/setIsGoingBackAfterError", true, {root: true});
    return this.$backend
      .get(url)
      .then(response => {
        if (response.data.notify.length === 0 && el.state.interfacectrl.isErrored === 0) {
          dispatch("interfacectrl/setIsGoingBackAfterError", false, {root: true});
        }
        commit('setData', response.data.data.items[0]);
        return this.state.edit.data;
      });
  },
  submit({commit, dispatch}, {url, data}) {
    let el = this;
    commit('setData', data);
    return this.$backend
      .post(url, this.state.edit.data)
      .then(response => {
        if (el.state.interfacectrl.isErrored === 0){
          if(response.data.data.items == 0){
            this.$helper.redirPath(0);
            // dispatch("interfacectrl/addAppState", null, {root: true});
          }
          else if(response.data.data.items){
            dispatch("interfacectrl/addAppState", null, {root: true});
          }
          else{
            this.$helper.oneLevelUp();
          }
        }
      });
  },
}