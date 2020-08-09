import store from "@/store/store";
import { Request } from "@/store/modules/article";

interface File {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

interface UploadObjectsResponse {
  files: Array<UploadedFile>;
}
interface UploadedFile {
  url: string;
  name: any;
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
    async uploadFiles(
      context,
      payload: Array<any>
    ): Promise<UploadObjectsResponse> {
      const bodyFormData = new FormData();

      const headers = {
        "Content-Type": "multipart/form-data"
      };

      payload.forEach(el => {
        console.log("fff, ", el);
        bodyFormData.append("files", el);
      });

      const r: Request = {
        url: "/api/v1/object-storage/upload",
        method: "POST",
        data: bodyFormData,
        headers: headers
      };
      return await store.dispatch.makeRequest(r);
    }
  }
};
