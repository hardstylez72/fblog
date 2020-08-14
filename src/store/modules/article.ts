import store, { moduleActionContext, moduleGetterContext } from "@/store/store";
import { Method } from "axios";
import { Moment } from "moment";
import userModule from "@/store/modules/user";
import { defineModule } from "direct-vuex";

export interface Request {
  method: Method;
  url: string;
  data: any;
  headers?: any;
}

export interface ArticlePreview {
  id: string;
  preface: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface Article extends ArticlePreview {
  body: string;
}

interface SaveArticleRequest {
  body: string;
  title: string;
  preface: string;
  userId: string;
}

interface UpdateArticleRequest {
  id: string;
  body: string;
  title: string;
  preface: string;
  userId: string;
}

interface GetListOfArticlesRequest {
  from: Moment;
  to: Moment;
}

export interface ArticleState {
  name: null | string;
}
const articleModule = defineModule({
  namespaced: true as true,
  state: {
    name: null
  } as ArticleState,
  getters: {},
  mutations: {},
  actions: {
    async updateArticle(
      context,
      payload: UpdateArticleRequest
    ): Promise<string> {
      const r: Request = {
        url: "/api/v1/article",
        method: "PUT",
        data: payload
      };
      return await store.dispatch.makeRequest(r);
    },
    async saveArticle(context, payload: SaveArticleRequest): Promise<string> {
      const r: Request = {
        url: "/api/v1/article",
        method: "POST",
        data: payload
      };
      return await store.dispatch.makeRequest(r);
    },
    async getArticleById(context, id: string): Promise<Article> {
      const r: Request = {
        url: `/api/v1/article/${id}`,
        method: "GET",
        data: {}
      };
      return await store.dispatch.makeRequest(r);
    },
    async getArticlesByPeriod(
      context,
      payload: GetListOfArticlesRequest
    ): Promise<Array<ArticlePreview>> {
      const r: Request = {
        url: `/api/v1/articles?from=${payload.from.format()}&to=${payload.to.format()}`,
        method: "GET",
        data: {}
      };
      return await store.dispatch.makeRequest(r);
    }
  }
});

export default articleModule;

const articleActionContext = (context: any) =>
  moduleActionContext(context, userModule);

const articleGetterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, userModule);
