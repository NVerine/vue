const interfacectrl = {
  state: () => ({
    messages: [],
    isLoading: 0,
    isErrored: false,
    showedMessages: [],
    appState: 1,
  }),
  mutations: {
    updateState(state){
      state.appState++;
    },
    addMessage(state, message){
      state.messages.push(message);
    },
    addShowedMessages(state, message){
      state.showedMessages.push(message);
    },
    showMessages(state){
      for(const i in state.messages){
        state.showedMessages.push(state.messages[i]);
        state.messages = [];
      }
    }
  }
};

export default interfacectrl;