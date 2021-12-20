export default ({store, $config }, inject) => {

  const NotificationStore = {
    state: store.state.interfacectrl.messages, // here the notifications will be added
    settings: {
      overlap: false,
      verticalAlign: 'top',
      horizontalAlign: 'right',
      type: 'info',
      timeout: 5000,
      closeOnClick: false,
      showClose: true,
      order: 'normal' // normal | reverse (When reverse, each notification will be added on top)
    },
    setOptions(options) {
      this.settings = Object.assign(this.settings, options);
    },
    removeNotification(timestamp) {
      store.dispatch('interfacectrl/removeMessage', timestamp);
    },
    addNotification(notification) {
      store.dispatch('interfacectrl/addMessage', notification);
    },
    notify(notification) {
      if (Array.isArray(notification)) {
        notification.forEach(notificationInstance => {
          NotificationStore.addNotification(notificationInstance);
        });
      } else {
        NotificationStore.addNotification(notification);
      }
    },
  };

  inject('notify', NotificationStore.notify)
  inject('notifications', NotificationStore)
}
