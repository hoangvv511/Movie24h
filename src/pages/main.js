import React from 'react';
import '../style/chunk.css';
import '../style/vlai.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from "react-router-dom";
import routes from '../navigator/routes';
import { startResume, canShowMess } from '../redux/actions/userAction';
import moment from 'moment';


class Main extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isShowMessage: false
        }
    }

    showMessage = () => { this.setState({ isShowMessage: true }) }
    hideMessage = () => { this.setState({ isShowMessage: false }) }

    componentWillMount = () => {
        document.documentElement.scrollTo(0, 0)
    }

    seekToTimeResume = () => {
        this.props.startResume(true)
        this.props.canShowMess(false, -1)
        this.hideMessage()
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.canShowMessage) {
            this.showMessage()
        } else if (!nextProps.canShowMessage) {
            this.hideMessage()
        }
    }

    render() {
        return (
            <div id="__next">
                <main className={this.props.location.pathname.indexOf('movie') === 1 ? null : "has-navbar-fixed-top"}>
                    <Header
                        scrollTop={50}
                    ></Header>
                    <Switch>
                        {this.showContentMenu(routes)}
                    </Switch>
                    <Footer></Footer>
                    {
                        this.state.isShowMessage &&
                        <div>
                            <div className="watching-messbox-overlay" id="watching-messbox-overlay" style={{}} />
                            <div className="watching-messbox-wrapper" id="watching-messbox-wrapper" style={{ left: '50%', top: '50%', marginTop: '-84px', marginLeft: '-300px' }}>
                                <div className="watching-messbox-header">Xem tiếp từ lần trước</div>
                                <div className="watching-messbox-body">
                                    Hệ thống ghi nhận lần trước bạn đang xem bộ phim này, <b>thời gian: <b style={{ color: 'red' }}>{moment().startOf('day')
                                        .seconds(this.props.timeResume)
                                        .format('H:mm:ss')}</b></b>, bạn có muốn xem tiếp tại đó không?
                                </div>
                                <div className="watching-messbox-footer">
                                    <button onClick={() => this.hideMessage()} id="watching-messbox-close" className="watching-messbox-close" title="Đóng thông báo này lại">Đóng</button>
                                    <button onClick={() => this.seekToTimeResume()} id="watching-messbox-0" className="watching-messbox-button watching-messbox-cbutton" title="Xem tiếp ">Xem tiếp </button>
                                </div>
                            </div>
                        </div>
                    }
                </main>
            </div>
        );
    }

    showContentMenu = (routes) => {
        var result = null;

        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                );
            });
        }
        return result;
    }
}

const mapStateToProps = state => {
    return {
        canShowMessage: state.canShowMessage,
        timeResume: state.timeResume
    };
}

const mapDispatchToProps = dispatch => {
    return {
        startResume: (canStart) => dispatch(startResume(canStart)),
        canShowMess: (isShow, time) => dispatch(canShowMess(isShow, time))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));
