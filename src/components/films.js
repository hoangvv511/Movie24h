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

export default class Films extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            option: "Id",
            maxFilm: -1,
            maxPage: -1,
            currentType: 'none',
            currentTypeID: '',
            searchName: '',
            currentPage: -1,
        }
    }

    componentWillMount = async () => {
        const search = this.props.location.search
        const type = this.props.match.params
        const currentType = this.getTypeFilm(type, search)
        const currentTypeID = currentType === 'none' || currentType === 'search' ? '' : currentType === 'country' ? type.countryID : type.genreID
        await this.updateFilm(currentType, currentTypeID, 1, this.state.option, search.substr(8))
        this.getFilmStatus()
    }

    getTypeFilm = (type, search = '') => {
        if (_.isEmpty(type) && search.length) {
            return 'search'
        } else if (_.isEmpty(type) && !search.length) {
            return 'none'
        } else if (type.countryID == undefined && !search.length) {
            return 'genre'
        } else {
            return 'country'
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.location.pathname != prevProps.location.pathname) {
            const currentType = this.getTypeFilm(this.props.match.params)
            let typeID = ''

            if (currentType === 'country') {
                typeID = this.props.match.params.countryID
            } else if (currentType === 'genre') {
                typeID = this.props.match.params.genreID
            }

            this.updateFilm(currentType, typeID, 1, this.state.option)
        }
    }

    updateFilm = async (type, typeId, page, option, name = '') => {
        let data = []
        let maxFilm = -1

        if (type === 'none') {
            data = await FilmAPI.getAllFilm(page, option)
            maxFilm = await FilmAPI.getCountAllFilm()
        } else if (type === 'search') {
            data = await FilmAPI.getFilmByName(name, page, option)
            maxFilm = await FilmAPI.getCountFilmByName(name)
        } else if (type === 'country') {
            data = await FilmAPI.getFilmByCountry(typeId, page, option)
            maxFilm = await FilmAPI.getCountFilmByCountry(typeId)
        } else {
            data = await FilmAPI.getFilmByGenre(typeId, page, option)
            maxFilm = await FilmAPI.getCountFilmByGenre(typeId)
        }

        await this.setState({
            data: data,
            maxFilm: maxFilm,
            maxPage: Math.round(maxFilm / 15),
            currentPage: page,
            currentType: type,
            currentTypeID: typeId,
            option: option,
            searchName: name
        })
    }

    getFilmStatus = () => {
        console.log("Trang thai phim")
        console.log(`data: ${this.state.data}`)
        console.log(`loaiPhim: ${this.state.currentType}`)
        console.log(`trang hien tai: ${this.state.currentPage}`)
        console.log(`tong so trang: ${this.state.maxPage}`)
        console.log(`id hien tai: ${this.state.currentTypeID}`)
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

    setFilmOption = async (option) => {
        this.updateFilm(this.state.currentType, this.state.currentTypeID, this.state.currentPage, option.target.value)
    }

    updatePage = async (page) => {
        this.getFilmStatus()
        document.documentElement.scrollTo(0, 0)
        let data = []
        const nextPage = page.selected + 1

        await this.updateFilm(this.state.currentType, this.state.currentTypeID, nextPage, this.state.option, this.state.searchName)
    }

    buildPageLocation = (pageNumber) => {
        return `/?page=${pageNumber}`
    }

    renderTitle = (currentType) => {
        if (currentType !== 'none') {
            if (currentType === 'country') {
                return <h1 class="title is-3">{`Phim ${country.find(item => { return item.href === this.props.match.url.toString() }).value}`}</h1>
            } else if (currentType === 'genre') {
                return <h1 class="title is-3">{`Phim ${genre.find(item => { return item.href === this.props.match.url.toString() }).value}`}</h1>
            } else {
                return <h1 class="title is-3">{`Tìm thấy ${this.state.maxFilm} kết quả`}</h1>
            }
        }
    }

    render() {
        const { currentType } = this.state
        return (
            <section className="section">
                <div className="container">
                    <div className="title-list">
                        {this.renderTitle(currentType)}
                        <div className="field is-horizontal filters">
                            <div className="field-label is-small">
                                <label className="label">Sắp xếp theo:</label>
                            </div>
                            <div className="select is-small">
                                <select onChange={(event) => this.setFilmOption(event)} >
                                    <option value="Id">Ngày đăng</option>
                                    <option value="Date">Ngày phát hành</option>
                                    <option value="Imbd">Điểm đánh giá</option>
                                </select>
                            </div>
                            <div className="view">
                                <a href="javascript:;" className>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M96 96c0 26.51-21.49 48-48 48S0 122.51 0 96s21.49-48 48-48 48 21.49 48 48zM48 208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm0 160c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm96-236h352c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="grid columns is-mobile is-multiline is-variable is-4">
                            {this.renderFilm(this.state.data)}
                        </div>
                        <ReactPaginate
                            previousLinkClassName={"pagination-previous nav undefined"}
                            nextLinkClassName={"pagination-next nav undefined"}
                            previousLabel={"Trang trước"}
                            nextLabel={"Trang sau"}
                            breakLabel={'...'}
                            breakClassName={'pagination-ellipsis'}
                            pageCount={this.state.maxPage}
                            marginPagesDisplayed={2}
                            onPageChange={(page) => this.updatePage(page)}
                            pageRangeDisplayed={5}
                            ariaLabelBuilder={page => `Go to page ${page}`}
                            hrefBuilder={pageNumber => this.buildPageLocation(pageNumber)}
                            pageLinkClassName={'pagination-link undefined'}
                            containerClassName={'pagination-list undefined'}
                            activeClassName={'is-current'}
                            activeLinkClassName={'is-current'}
                            disabledClassName={'pagination-disable'}
                        />
                    </div>
                </div>
            </section>
        );
    }
};