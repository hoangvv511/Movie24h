import React from 'react';
import '../style/chunk.css';
import _ from 'lodash'
import FilmAPI from '../services/filmApi';
import moment from 'moment'
import 'moment/locale/vi';

const sampleComment = [
    {
        name: 'Vũ Việt Hoàng',
        content: 'Phim tạm được',
        time: new Date().toLocaleString()
    },
    {
        name: 'Nguyễn Văn Bình',
        content: 'Phim coi không hay lắm',
        time: new Date().toLocaleString()
    },
    {
        name: 'Lê Bá Phúc Hiếu',
        content: 'Chất lượng tốt',
        time: new Date().toLocaleString()
    },
]

class ContentWatch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            nameVi: '',
            nameEng: '',
            id: -1,
            comments: []
        }
        this.playerId = 'player'
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.nameVi.length) {
            await this.setState({
                nameVi: nextProps.nameVi,
                nameEng: nextProps.nameEng,
                id: nextProps.videoID,
                comments: await FilmAPI.getAllComment(nextProps.videoID)
            })
        }
    }

    renderComment = (id, arrComment: Array, user) => {
        return arrComment.reduce((renderResult, comment, index, originArrComment) => {
            const timeComment = new Date(comment.Date)

            renderResult.push(
                <article className="media">
                    <div className="media-content">
                        <div className="content"><strong>{comment.Name}</strong> &nbsp;
                        <small className="has-text-grey">{moment(timeComment).lang('vi').fromNow()}</small>
                            <div className="comment">{comment.Content}</div>
                        </div>
                    </div>
                    {
                        user.Name === comment.Name &&
                        <div className="media-right">
                            <button onClick={() => this.removeComment(id, comment.Id)} className="delete" />
                        </div>
                    }
                </article>
            )
            return renderResult
        }, [])
    }

    addNewComment = async (id, user, value) => {
        if(value === ''){
            alert("Bạn phải nhập bình luận")
            return
        }

        const result = await FilmAPI.addNewComment(id, user.Name, value, new Date().toLocaleString())
        if (!_.isEmpty(result)) {
            this.updateComments()
        }
    }

    updateComments = async () => {
        this.setState({ comments: await FilmAPI.getAllComment(this.state.id), value: '' })
    }

    removeComment = async (id, commentId) => {
        const result = await FilmAPI.removeComment(id, commentId)
        if (!_.isEmpty(result)) {
            this.updateComments()
        }
    }

    handleInputChange = (event) => {
        const { value } = event.target;
        this.setState({ value: value })
    }

    render() {
        const { nameVi, nameEng, id, comments, value } = this.state
        const user = localStorage.getItem('user').length > 0 ? JSON.parse(localStorage.getItem('user')) : {}

        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-two-thirds-tablet">
                            <h1 className="title is-3">{nameVi}</h1>
                            <h2 className="subtitle is-5">{nameEng}</h2></div>
                        <div className="column has-text-right"><div>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/movie/${id}`} className="fb-share button is-link" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                                </svg> Chia sẻ</a>
                        </div>
                            <div className="back">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M11.093 251.65l175.998 184C211.81 461.494 256 444.239 256 408v-87.84c154.425 1.812 219.063 16.728 181.19 151.091-8.341 29.518 25.447 52.232 49.68 34.51C520.16 481.421 576 426.17 576 331.19c0-171.087-154.548-201.035-320-203.02V40.016c0-36.27-44.216-53.466-68.91-27.65L11.093 196.35c-14.791 15.47-14.791 39.83 0 55.3zm23.127-33.18l176-184C215.149 29.31 224 32.738 224 40v120c157.114 0 320 11.18 320 171.19 0 74.4-40 122.17-76.02 148.51C519.313 297.707 395.396 288 224 288v120c0 7.26-8.847 10.69-13.78 5.53l-176-184a7.978 7.978 0 0 1 0-11.06z" />
                                </svg>
                                <a href={`/movie/${id}`}>Trở về trang giới thiệu phim</a>
                            </div>
                        </div>
                    </div>
                    {
                        _.isEmpty(user) &&
                        <div className="has-text-grey-light">Để gửi bình luận phim, vui lòng <a href="/login">đăng nhập</a>.</div>
                    }
                    <div className="comments-section">
                        <h2 className="section-title title is-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.4 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.1 2.1 18.4 3.7 28 4.8 31.5 57.5 105.5 98 191.8 98 20.8 0 40.8-2.4 59.8-6.8 28.5 18.5 71.6 38.8 125.2 38.8 9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.5-.4-22.6-24.2-37.9-54.9zM142.2 311l-11.4 7.4c-20.1 13.1-50.5 28.2-87.7 32.5 8.8-11.3 20.2-27.6 29.5-46.4L83 283.7l-16.5-16.3C50.7 251.9 32 226.2 32 192c0-70.6 79-128 176-128s176 57.4 176 128-79 128-176 128c-17.7 0-35.4-2-52.6-6l-13.2-3zm303 103.4l-11.4-7.4-13.2 3.1c-17.2 4-34.9 6-52.6 6-65.1 0-122-25.9-152.4-64.3C326.9 348.6 416 278.4 416 192c0-9.5-1.3-18.7-3.3-27.7C488.1 178.8 544 228.7 544 288c0 34.2-18.7 59.9-34.5 75.4L493 379.7l10.3 20.7c9.4 18.9 20.8 35.2 29.5 46.4-37.1-4.2-67.5-19.4-87.6-32.4zm-37.8-267.7c.1.2.1.4.2.6-.1-.2-.1-.4-.2-.6z" /></svg> Bình luận phim</h2>
                        {
                            !_.isEmpty(user) &&
                            <form>
                                <div className="field">
                                    <textarea
                                        className="textarea"
                                        rows={2}
                                        placeholder="Nhập bình luận..."
                                        required
                                        value={value}
                                        onChange={(event) => this.handleInputChange(event)}
                                        name="content"
                                        defaultValue={""} />
                                </div>
                                <div className="has-text-right">
                                    <button onClick={() => this.addNewComment(id, user, value)} type="button" className="button is-inverted is-primary is-outlined is-small">Gửi</button>
                                </div>
                            </form>
                        }
                        {this.renderComment(id, comments, user)}
                    </div>
                </div>
            </section>
        );
    }
};

export default ContentWatch