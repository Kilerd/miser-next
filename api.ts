import Axios from 'axios'

const urls = {
    development: "http://localhost:8000",
    production: "https://miser.3min.work/api"
}

const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
export const apiGetter = url => api.get(url).then(res => res.data);
export const apiPoster = (url, data) => api.post(url, data).then(res => res.data);

export default api;


