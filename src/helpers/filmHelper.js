import _ from 'lodash'

const NUMBER_FILM_PER_PAGE = 15;

export default class FilmHelper {
    static countPagination = (arrFilm: Array) => Math.round(arrFilm.length / NUMBER_FILM_PER_PAGE)

}