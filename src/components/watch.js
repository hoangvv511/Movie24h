import React from 'react';
import '../style/chunk.css';
import VideoPlayer from '../components/videoPlayer';
import FilmAPI from '../services/filmApi'
import Film from '../models/film'
import ContentWatch from '../components/contentWatch';

class Watch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentID: '',
            url: '',
            currentFilm: new Film()
        }
    }

    componentWillMount = async () => {
        const filmData = await FilmAPI.getFilmByID(this.props.match.params.movieID)

        const filmUrl = await FilmAPI.getFilmUrl(filmData.Linkplay)
        await this.setState({ currentFilm: this.addFilmDetail(filmData), currentID: this.props.match.params.movieID, url: filmUrl })
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
            filmData.Cast
        )
    }

    render() {
        const { url, currentFilm: { id, nameVi, nameEng, banner, subEng, subVi } } = this.state

        return (
            <section className>
                <div className>
                    <div className="title-watch">
                        <VideoPlayer videoID={id} url={url} banner={banner} subEng={subEng} subVi={subVi} />
                        <ContentWatch videoID={id} nameVi={nameVi} nameEng={nameEng} />
                    </div>
                </div>
            </section>
        );
    }
}

export default Watch;
