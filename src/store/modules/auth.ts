export interface Auth {
  userId: null | string;
  isAuthorized: boolean;
}
export default {
  namespaced: true as true,
  state: {
    userId: null,
    isAuthorized: false
  } as Auth,
  getters: {
    isAuthorized: state => state.isAuthorized,
    userId: state => state.userId
  },
  mutations: {
    setUserId(state, userId: string) {
      state.userId = userId;
      console.log(userId);
      state.isAuthorized = !!userId;
    }
  },
  actions: {
    authorizeWithGoogle(context) {
      window.location.href = `${process.env.VUE_APP_SERVER_HOST}/api/v1/google/oauth/login`;
    },
    logout(context) {
      document.cookie = "user_id=;" + "expires=Thu, 01-Jan-1970 00:00:01 GMT;";
      location.reload();
    }
  }
};
