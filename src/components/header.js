import React from 'react';
import '../style/chunk.css';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { genre } from '../navigator/genre';
import { country } from '../navigator/country';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import FilmAPI from '../services/filmApi';

class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            navName: "navbar is-fixed-top",
            value: '',
        }
    }

    handleScroll = (event) => {
        if (window.scrollY > this.props.scrollTop) {
            this.setState({ navName: "navbar is-fixed-top has-bg" })
        } else
            this.setState({ navName: "navbar is-fixed-top" })
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    changeSearchValue = event => {
        const { value } = event.target;
        this.setState({ value: value });
    }

    showSearchValue = () => {
        const name = this.state.value
        window.location.replace(`/?search=${name.trim().replace(/ /g, '-')}`);
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.showSearchValue()
        }
    }

    logout = () => {
        localStorage.setItem('user', '')
        window.location.reload()
    }

    render() {
        const user = localStorage.getItem('user').length > 0 ? JSON.parse( localStorage.getItem('user')) : {}

        return (
            <nav className={this.state.navName} role="navigation" aria-label="main navigation" onScroll={this.handleScroll}>
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://xemphim.plus/static/skin/logo-full.png" alt="XemPhim.plus logo 1" className="logo-full" />
                        <img src="https://xemphim.plus/static/skin/logo-short.png" alt="XemPhim.plus logo 2" className="logo-short" />
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable countries">
                            <a className="navbar-link">Quốc gia</a>
                            <div className="navbar-dropdown">
                                {
                                    country.map((item, index) => {
                                        return (
                                            <Link key={index} className="navbar-item" to={`${item.href}`}>{item.value}</Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="navbar-item has-dropdown is-hoverable genres">
                            <a className="navbar-link">Thể loại</a>
                            <div className="navbar-dropdown">
                                {
                                    genre.map((item, index) => {
                                        return (
                                            <Link key={index} className="navbar-item" to={`${item.href}`}>{item.value}</Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="navbar-item search">
                            <div className="css-1pcexqc-container">
                                <div className="css-spoa9c-control">
                                    <div className="css-1hwfws3">
                                        <div className="css-1g6gooi">
                                            <div style={{ display: 'inline-block' }}>
                                                <input
                                                    id="react-select-2-input"
                                                    onKeyDown={this._handleKeyDown}
                                                    onSubmit={() => this.showSearchValue()}
                                                    style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'transparent', borderWidth: 0, outline: 'none' }}
                                                    placeholder="Nhập tên phim..."
                                                    value={this.state.searchValue}
                                                    onChange={this.changeSearchValue} />
                                                <div style={{ position: 'absolute', top: '0px', left: '0px', visibility: 'hidden', height: '0px', overflow: 'scroll', whiteSpace: 'pre', fontSize: '16px', fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, fontStyle: 'normal', letterSpacing: 'normal', textTransform: 'none' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="css-1wy0on6">
                                        <span className="css-bgvzuu-indicatorSeparator" />
                                        <div aria-hidden="true" className="css-16pqwjk-indicatorContainer">
                                            <svg onClick={() => this.showSearchValue()} height={20} width={20} viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="css-19bqh2r">
                                                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        {
                            _.isEmpty(user) ?
                                <div className="navbar-item">
                                    <a className="button is-primary" rel="nofollow" href="/login">Đăng nhập</a>
                                </div> :
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link">
                                        <span className="full-name">{user.Name}</span>
                                        <div className="initial-avatar">V</div>
                                    </a>
                                    <div className="navbar-dropdown is-right">
                                        <Link className="navbar-item" to={`/myfavorite/${user.Username}`}>Phim của tôi</Link>
                                        <a className="navbar-item" onClick={() => this.logout()}>Thoát</a>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(withRouter(Header))