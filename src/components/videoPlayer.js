import React from 'react';
import '../style/chunk.css';
import ReactDOM from 'react-dom';
import ReactJWPlayer from 'react-jw-player';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { canShowMess, startResume } from '../redux/actions/userAction'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class VideoPlayer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            player: undefined,
            isLoading: true,
            playlist: [],
            canResume: false
        }

        this.playerId = 'player'
    }

    onReady = async (event) => {
        // interact with JW Player API here
        const player = window.jwplayer(this.playerId);
        const cookie = new Cookies();
        const data = cookie.getAll()

        // Kiem tra neu phim da xem thi bat message
        Object.keys(data).forEach(key => {
            if (this.props.videoID == key) {
                console.log(`ID video: ${this.props.videoID}`)
                console.log(`time: ${cookie.get(`${this.props.videoID}`)}`)
                this.props.canShowMess(true, cookie.get(`${this.props.videoID}`))
            }
        })
        await this.setState({ player: player })
    }

    getCookieValueByID = (id) => {
        const cookie = new Cookies();
        return cookie.get(`${id}`)
    }

    seekPlayer = (time) => {
        this.state.player.play()
        this.state.player.seek(time)
    }

    onTime = (event) => {
        const cookie = new Cookies();
        cookie.set(`${this.props.videoID}`, Math.round(event.position), { path: '/', maxAge: 60 * 60 * 24 });
    }

    componentWillUnmount = () => {
        this.props.canShowMess(false, -1)
        this.props.startResume(false)
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.url.length && !nextProps.acceptResume) {
            const playlist = this.state.playlist
            playlist.push(
                {
                    image: nextProps.banner,
                    file: nextProps.url,
                    tracks: [
                        {
                            file: nextProps.subVi,
                            label: 'VN',
                            kind: 'captions',
                            'default': true
                        },
                        {
                            file: nextProps.subEng,
                            label: 'ENG',
                            kind: 'captions',
                            'default': false
                        }
                    ],
                }
            )
            await this.setState({ playlist: playlist, isLoading: false })
        } else if (nextProps.acceptResume) {
            this.seekPlayer(this.getCookieValueByID(this.props.videoID))
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.isLoading ?
                        <div style={{ marginTop: '1%', marginLeft: '14%', marginRight: '14%' }}>
                            <ReactJWPlayer
                                playlist={this.state.playlist}
                                aspectRatio={'16:9'}
                                onReady={this.onReady}
                                isAutoPlay={false}
                                licenseKey='eNFaXCjyURVoCCGiHp7HTQ3hDhE/AfL0g8VE1fRbL84='
                                onAdPlay={this.onAdPlay}
                                onPlay={this.onPlay}
                                onBuffer={this.onBuffer}
                                onVideoLoad={this.onVideoLoad}
                                onTime={(event) => this.onTime(event)}
                                onReady={this.onReady}
                                onVideoLoad={this.onVideoLoad}
                                playerId={this.playerId} // bring in the randomly generated playerId
                                playerScript={'https://content.jwplatform.com/libraries/Jq6HIbgz.js'}
                                customProps={{
                                    preload: 'auto',
                                    volume: 100,
                                }}
                            />
                        </div> :
                        <div style={{ marginTop: '1%', marginLeft: '14%', marginRight: '14%', height: 800, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                            <h1 style={{ textAlign: 'center', paddingTop: 400 }}>Đang tải phim...</h1>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        acceptResume: state.acceptResume,
        canShowMessage: state.canShowMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        canShowMess: (isShow, time) => dispatch(canShowMess(isShow, time)),
        startResume: (canStart) => dispatch(startResume(canStart))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(VideoPlayer))