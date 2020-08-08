import store from "@/store/store";
import { Method } from "axios";
import { Moment } from "moment";

interface Request {
  method: Method;
  url: string;
  data: any;
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

interface GetListOfArticlesRequest {
  from: Moment;
  to: Moment;
}

export interface Module1State {
  name: null | string;
}
export default {
  namespaced: true as true,
  state: {
    name: null
  } as Module1State,
  getters: {},
  mutations: {},
  actions: {
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
};
