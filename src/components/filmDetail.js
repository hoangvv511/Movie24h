import React from 'react';
import '../style/chunk.css';
import '../style/static.css';
import Slider from 'react-slick'
import { Link } from "react-router-dom";
import FilmAPI from '../services/filmApi'
import Film from '../models/film'
import _ from 'lodash';
import genreType, { genre } from '../navigator/genre';

export default class FilmDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentID: '',
            currentFilm: new Film(),
            user: localStorage.getItem('user').length > 0 ? JSON.parse(localStorage.getItem('user')) : {}
        }
    }

    componentWillMount = async () => {
        const filmData = await FilmAPI.getFilmByID(this.props.match.params.movieID)
        await this.setState({ currentFilm: this.addFilmDetail(filmData), currentID: this.props.match.params.movieID })
        console.log(this.state.currentFilm)
    }

    addFilmDetail = (filmData) => {
        return new Film(
            filmData.Id,
            filmData.Subtitle,
            filmData.Name,
            filmData.Linkplay,
            filmData.Thumnail,
            filmData.Banner,
            filmData.Content,
            filmData.Time,
            filmData.Type,
            filmData.Country,
            filmData.Writer,
            filmData.Directors,
            filmData.Date,
            filmData.Imbd,
            filmData.Imgtrailer,
            filmData.Linktrailer,
            filmData.Subviet,
            filmData.Subeng,
            filmData.Cast,
            filmData.Comment
        )
    }

    renderGenres = (genres: String) => {
        var genresArr = genres.split(',')

        return genresArr.reduce((renderResult, genre, index, originGenres) => {
            renderResult.push(
                <a class="button is-link is-small is-rounded is-inverted is-outlined" href="#">{genre.trim()}</a>
            )
            return renderResult
        }, [])
    }

    renderCast = (cast: Object) => {
        let castArr = []

        Object.keys(cast).forEach(key => {
            castArr.push(
                <div>
                    <div className="item" tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                        <a className="image" href="#">
                            <figure>
                                <img src={`${cast[key].Avatar}`} alt={`${cast[key].CastName}`} />
                            </figure>
                        </a>
                        <p>
                            <a className="name" href="#">{`${cast[key].CastName}`}</a>
                        </p>
                        <p className="character">{`${cast[key].CharacterName}`}</p>
                    </div>
                </div>
            )
        });
        return castArr
    }

    renderFavoriteButton = (isLike) => {
        if (isLike) {
            return (
                <a className="heart-share button is-link-heart">
                    <svg class="svg-icon" viewBox="0 0 20 20">
                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                    </svg>
                    Đã thích
                </a>
            )
        }
    }

    handleFavoriteMovie = async (id, isLike: Boolean, user) => {
        let favorites = []

        if (isLike) {
            favorites = await FilmAPI.removeFavoriteMovie(user.Username, id)
        } else {
            favorites = await FilmAPI.addFavoriteMovie(user.Username, id)
        }
        this.updateUserFavorite(favorites)
        this.setState({ user: JSON.parse(localStorage.getItem('user')) })
    }

    updateUserFavorite = (arrFavorite) => {
        const oldUser = JSON.parse(localStorage.getItem('user'))
        oldUser.Favorite = arrFavorite
        const newUser = JSON.stringify(oldUser)
        localStorage.setItem('user', newUser)
    }

    isMovieLiked = (id, arrFavorite: Array) => {
        return arrFavorite.find(filmID => { return filmID == id }) == undefined ? false : true
    }


    renderFavoriteButton = (id, user) => {
        if (!_.isEmpty(user)) {
            const isLiked = this.isMovieLiked(id, user.Favorite)
            return (
                <a onClick={() => this.handleFavoriteMovie(id, isLiked, user)} className="heart-share button is-link-heart">
                    {
                        isLiked ?
                            <svg class="svg-icon" viewBox="0 0 20 20">
                                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                            </svg>
                            :
                            <svg class="svg-icon" viewBox="0 0 18 18">
                                <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                            </svg>
                    }
                    {isLiked ? 'Đã thích' : 'Yêu thích'}
                </a>
            )
        }
    }

    render() {
        const { currentFilm: { id, nameVi, nameEng, url, thumnail, banner, content, time, genres, country, writers, directors, date, imbd, trailerImg, trailerUrl, subVi, subEng, cast }, user } = this.state

        return (
            <div>
                <div className="backdrop" style={{ backgroundImage: `url(${banner})` }} />
                <section className="section">
                    <div className="container shiftup">
                        <div className="tt-details columns is-variable is-8">
                            <div className="column is-one-quarter-tablet">
                                <p className="has-text-centered">
                                    <img src={`${thumnail}`} />
                                </p>
                                <Link className="watch button is-danger is-medium is-fullwidth" to={`/watch/${id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                    </svg> Xem phim
                                </Link>
                            </div>
                            <div className="column main">
                                <h1 className="title is-2">{nameEng}</h1>
                                <h2 className="subtitle is-4">{nameVi}</h2>
                                <div className="meta">
                                    <span>{time}</span>
                                    <span className="tag is-dark has-text-weight-bold">PG-13</span>
                                </div>
                                <div className="meta">
                                    <span className="imdb-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                            <path d="M44 13H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17c0-2.2-1.8-4-4-4z" fill="#ffc107" />
                                            <path d="M28.102 18h-3.704v13.102h3.704c2 0 2.796-.403 3.296-.704.602-.398.903-1.097.903-1.796v-7.903c0-.898-.403-1.699-.903-2-.796-.5-1.097-.699-3.296-.699zm.699 10.3c0 .598-.7.598-1.301.598V20c.602 0 1.3 0 1.3.602zM33.8 18v13.3h2.802s.199-.902.398-.698c.398 0 1.5.597 2.2.597.698 0 1.1 0 1.5-.199.6-.398.698-.7.698-1.3v-7.802c0-1.097-1.097-1.796-2-1.796-.898 0-1.796.597-2.199.898v-3zm3.598 4.2c0-.4 0-.598.403-.598.199 0 .398.199.398.597v6.602c0 .398 0 .597-.398.597-.2 0-.403-.199-.403-.597zM22.7 31.3V18h-4.4l-.8 6.3-1.102-6.3h-4v13.3h2.903v-7.402l1.3 7.403h2l1.297-7.403v7.403zM7.602 18h3.097v13.3H7.602z" fill="#263238" />
                                        </svg>
                                    </span>
                                    <span className="has-text-weight-bold">{imbd}</span>
                                </div>
                                <div className="level genres">
                                    <div className="level-left">
                                        <div className="level-item">
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/movie/${id}`} className="fb-share button is-link" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                                                </svg> Chia sẻ</a>
                                            <div style={{ marginLeft: 10, marginRight: 10 }} />
                                            {this.renderFavoriteButton(id, user)}
                                        </div>
                                    </div>
                                    <div className="level-right">
                                        <div className="level-item buttons">
                                            {this.renderGenres(genres)}
                                        </div>
                                    </div>
                                </div>
                                <dl className="horizontal-dl">
                                    {
                                        directors.length &&
                                        <div>
                                            <dt>Đạo diễn</dt>
                                            <dd className="csv">
                                                <a href="#">{directors}</a>
                                            </dd>
                                        </div>
                                    } {
                                        writers.length &&
                                        <div>
                                            <dt>Kịch bản</dt>
                                            <dd className="csv">
                                                <a href="#">{writers}</a>
                                            </dd>
                                        </div>
                                    } {
                                        country.length &&
                                        <div>
                                            <dt>Quốc gia</dt>
                                            <dd className="csv">
                                                <a href="#">{country}</a>
                                            </dd>
                                        </div>
                                    } {
                                        date.length &&
                                        <div>
                                            <dt>Khởi chiếu</dt>
                                            <dd>{date}</dd>
                                        </div>
                                    }
                                </dl>
                                <div className="intro has-text-grey-light">{content}</div>
                                <h3 className="section-header">Diễn viên</h3>
                                <div className="cast" style={{ visibility: _.isEmpty(cast) ? 'hidden' : 'visible' }}>
                                    <Slider
                                        arrows={true}
                                        infinite={false}
                                        slidesToShow={Object.keys(cast).length > 6 ? 6 : 5}
                                        slidesToScroll={2}
                                        prevArrow={
                                            <div className="slick-arrow slick-prev" style={{ display: 'block' }} >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
                                                </svg>
                                            </div>
                                        }
                                        nextArrow={
                                            <div className="slick-arrow slick-next" style={{ display: 'block' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                                </svg>
                                            </div>
                                        }
                                    >
                                        {this.renderCast(cast)}
                                    </Slider>
                                </div>
                                <h3 className="section-header">Trailer</h3>
                                <div className="trailers" style={{ visibility: _.isEmpty(trailerUrl) ? 'hidden' : 'visible', width: 300, height: 200 }}>
                                    <div role='button' className="item" tabIndex={-1} style={{ width: '100%', display: 'inline-block' }}>
                                        <div onClick={() => window.open(`${trailerUrl}`)} className="clip">
                                            <img src={`${trailerImg}`} />
                                            <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};