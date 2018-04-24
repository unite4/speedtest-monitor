const store = {
  state: {
    authState: null,
    logsState: null,
    timePeriod: null
  },

  updateAuthState: function(authState) {
    this.state.authState = authState;
  },

  updateLogsState: function(logsState) {
    this.state.logsState = logsState;
  },

  updateTimePeriod: function(timePeriod) {
    this.state.timePeriod = timePeriod;
  }
};

const state = store.state;

export { store, state };
