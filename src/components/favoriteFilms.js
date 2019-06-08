import React from 'react';
import '../style/chunk.css';
import { Link } from "react-router-dom";
import PropTypes, { string } from 'prop-types'
import ReactPaginate from 'react-paginate';
import FilmAPI from '../services/filmApi'
import Pagination from 'rc-pagination';
import { country } from '../navigator/country'
import { genre } from '../navigator/genre'
import _ from 'lodash';

export default class FavoriteFilms extends React.Component {

    constructor(props) {
        super(props)

        this.user = JSON.parse(localStorage.getItem('user'))
        this.state = {
            data: [],
        }
    }

    componentWillMount = async () => {
        const listFilm = await FilmAPI.getFilmByListID(this.user.Favorite)

        this.setState({ data: listFilm })
    }

    renderFilm = (listFilm: Array) => {
        return listFilm.map((film, index) => {
            return (
                <div className="column is-one-fifth-fullhd is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                    <Link to={`/movie/${film.Id}`}>
                        <img src={film.Thumnail} alt={film.Name} title={film.Name} />
                    </Link>
                    <h3 className="name vi">
                        <Link to={`/movie/${film.Id}`}>{film.Subtitle}</Link>
                    </h3>
                    <h3 className="name en">
                        <Link to={`/movie/${film.Id}`}>{film.Name}</Link>
                    </h3>
                </div>
            )
        })
    }

    renderTitle = (numberFilm) => {
        return <h1 class="title is-3">{`Đã thích ${numberFilm} phim`}</h1>
    }

    render() {
        const { data } = this.state

        return (
            <section className="section">
                <div className="container">
                    <div className="title-list">
                        {this.renderTitle(data.length)}
                        <div className="grid columns is-mobile is-multiline is-variable is-4">
                            {this.renderFilm(data)}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};