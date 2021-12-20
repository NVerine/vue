const defaultState = () => {
  return {
    messages: [],
    isLoading: 0,
    isErrored: 0,
    isShowingMessages: false,
    isGoingBackAfterError: false,
    showedMessages: [],
    module: 'general',
    title: 'general',
    activeTab: 1,
    appState: 1,
  }
};

export const state = () => defaultState();

export const mutations = {
  addAppState(state) {
    state.appState++;
  },
  addLoading(state) {
    state.isLoading++;
  },
  dcrLoading(state) {
    state.isLoading--;
  },
  addMessage(state, message) {
    state.messages.push(message);
  },
  unshiftMessage(state, message) {
    state.messages.unshift(message)
  },
  removeMessage(state, timestamp) {
    const indexToDelete = state.messages.findIndex(n => n.timestamp === timestamp);
    if (indexToDelete !== -1) {
      state.showedMessages.push(state.messages[indexToDelete]);
      state.messages.splice(indexToDelete, 1);
    }
  },
  addIsErrored(state){
    state.isErrored++;
  },
  dcrIsErrored(state){
    state.isErrored--;
  },
  setIsGoingBackAfterError(state, value){
    state.isGoingBackAfterError = value;
  },
  clearState(clear) {
    Object.assign(clear, defaultState());
  },
  updateTitle(state, title) {
    state.title = title
  },
  updateModule(state, module) {
    state.module = module
  },
  updateActiveTab(state, tab) {
    state.activeTab = tab
  }
};

export const actions = {
  addAppState(context, param) {
    context.commit('addAppState');
  },
  addLoading(context) {
    context.commit('addLoading');
  },
  dcrLoading(context) {
    context.commit('dcrLoading');
  },
  //{type: "danger", text: "message"}
  addMessage(context, message) {
    let notification = { message: "Empty notification." };
    if (typeof message.text === 'string') {
      notification = { message: message.text };
    }
    notification.timestamp = new Date();
    notification.timestamp.setMilliseconds(
      notification.timestamp.getMilliseconds() + context.state.messages.length
    );
    notification = Object.assign({}, this.$notifications.settings, notification);
    if (message.type === "danger"){
      context.commit('addIsErrored');
    }
    if(message.type){
      notification.type = message.type;
    }
    if (this.$notifications.settings.order === 'reverse') {
      context.commit('unshiftMessage', notification);
    } else {
      context.commit('addMessage', notification);
    }
  },
  removeMessage({state, commit}, timestamp){
    if(this.state.interfacectrl.isErrored > 0 && this.state.interfacectrl.isGoingBackAfterError){
      this.$helper.oneLevelUp();
    }
    commit('removeMessage', timestamp);
  },
  updateBreadcrumb(context, {module, title}){
    context.commit('updateTitle', title)
    context.commit('updateModule', module)
  },
  setIsGoingBackAfterError({commit}, value){
    commit('setIsGoingBackAfterError', value);
  },
  updateActiveTab(context, value){
    context.commit('updateActiveTab', value);
  },
}