import axios from 'axios'

const originUrl = "http://localhost:8080/WebPhim"
// TODO: sort : sắp xếp giảm dần theo:  Id: ngày đăng; Date: ngày phát hành; Imbd: điểm đánh giá

const header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
}

export default class FilmAPI {

    static getAllFilm = (page, sortType) => {
        return axios.get(`${originUrl}/GetAllFilm?page=${page}&sort=${sortType}`).then(res => res.data)
    }

    static getFilmByID = (id) => {
        return axios.get(`${originUrl}/GetFilmById?Id=${id}`).then(res => res.data)
    }

    static getFilmByCountry = (countryID, page, sortType) => {
        return axios.get(`${originUrl}/GetFilmByCountry?country=${countryID}&page=${page}&sort=${sortType}`).then(res => res.data)
    }

    static getFilmByGenre = (genreID, page, sortType) => {
        return axios.get(`${originUrl}/GetFilmByType?type=${genreID}&page=${page}&sort=${sortType}`).then(res => res.data)
    }

    static getCountAllFilm = () => {
        return axios.get(`${originUrl}/GetCountAllFilm`).then(res => res.data)
    }

    static getCountFilmByCountry = (countryID) => {
        return axios.get(`${originUrl}/GetCountFilmByCountry?country=${countryID}`).then(res => res.data)
    }

    static getCountFilmByGenre = (genreID) => {
        return axios.get(`${originUrl}/GetCountFilmByType?type=${genreID}`).then(res => res.data)
    }

    static getFilmUrl = (url) => {
        return axios.get(url).then(res => res.data)
    }
}

