import axios, { Method } from 'axios';

export default (method: Method, url: string, payload: any) => {
    return axios({
        method,
        url: process.env.VUE_APP_SERVER_HOST + url,
        data: payload,
    })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            return err;
        });
}
