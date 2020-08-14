import { Request } from "@/store/modules/article";
import store, { moduleActionContext, moduleGetterContext } from "@/store/store";
import { defineModule } from "direct-vuex";

export enum UserRoleTypes {
  USER = "USER",
  GUEST = "GUEST",
  ADMIN = "ADMIN"
}

export enum UserAuthTypes {
  GOOGLE = "Google",
  GITHUB = "Github"
}

export interface User {
  id: string;
  registeredAt: string;
  externalId: string;
  externalAuthType: UserAuthTypes;
  login: null | string;
  name: null | string;
  email: null | string;
  isBanned: boolean;
  roleId: UserRoleTypes;
}

export interface UserState {
  userId: null | string;
  isAuthorized: boolean;
  user: User;
  isAdmin: boolean;
}
const userModule = defineModule({
  namespaced: true as true,
  state: {
    userId: null,
    isAuthorized: false,
    user: {} as User,
    isAdmin: false
  } as UserState,
  getters: {
    isAuthorized: state => state.isAuthorized,
    isAdmin: state => {
      if (state.isAuthorized) {
        return state.user.roleId === UserRoleTypes.ADMIN;
      }
      return false;
    },
    userId: state => state.userId,
    user: state => state.user
  },
  mutations: {
    setUserId(state, userId: string) {
      state.userId = userId;
      state.isAuthorized = !!userId;
    },
    setUser(state, user: User) {
      state.user = user;
    }
  },
  actions: {
    async getMe(context): Promise<User | null> {
      const { dispatch, commit, getters, state } = userActionContext(context);
      const userId = await dispatch.getUserIdFromCookie();
      commit.setUserId(userId);

      if (userId) {
        const user = await dispatch.getUserById(userId);
        commit.setUser(user);
        return user;
      }

      return null;
    },
    getUserIdFromCookie(): string {
      const pairs = document.cookie.split(";");
      let userId = "";

      pairs.some(pair => {
        const kv = pair.split("=");
        if (kv[0] == "user_id") {
          userId = kv[1];
          return true;
        }
        return false;
      });
      return userId;
    },
    async getUserById(context, id: string): Promise<User> {
      const r: Request = {
        url: `/api/v1/user/${id}`,
        method: "GET",
        data: {}
      };
      return await store.dispatch.makeRequest(r);
    },
    authorizeWithGoogle(context) {
      const { dispatch, commit, getters, state } = userActionContext(context);
      dispatch.logout();
      window.location.href = `${process.env.VUE_APP_SERVER_HOST}/api/v1/google/oauth/login`;
    },
    authorizeWithGitHub(context) {
      const { dispatch, commit, getters, state } = userActionContext(context);
      dispatch.logout();
      window.location.href = `${process.env.VUE_APP_SERVER_HOST}/api/v1/github/oauth/login`;
    },
    logout(context) {
      document.cookie = "user_id=;" + "expires=Thu, 01-Jan-1970 00:00:01 GMT;";
      location.reload();
    }
  }
});
export default userModule;

const userActionContext = (context: any) =>
  moduleActionContext(context, userModule);
const userGetterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, userModule);
