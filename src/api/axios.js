import API from './api';

export function getData(uri) {
    API.get(`${uri}`)
}


export function postData(uri, body) {
    API.post(`${uri}`, body)
}