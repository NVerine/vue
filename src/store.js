import Vue from 'vue'
import permissions from "./storeModules/permission";
import interfacectrl from "./storeModules/interfacectrl";
import pessoas from "./storeModules/pessoas";

// configura vuex
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        interfacectrl,
        permissions,
        pessoas
    }
});

export default store;