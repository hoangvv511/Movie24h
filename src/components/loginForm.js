import React from 'react';
import '../style/chunk.css';
import AuthApi from '../services/authApi'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUser } from '../redux/actions/userAction';

class LoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange = (event, type) => {
        const { value } = event.target;
        if (type === 'USERNAME') {
            this.setState({ username: value })
        } else {
            this.setState({ password: value })
        }
    }

    login = async () => {
        const { username, password } = this.state
        const user = localStorage.getItem('user')

        if(username.length <= 0 ) {
            alert("Tài khoản không được trống")
            return
        } else if(password.length <= 0){
            alert("Bạn chưa nhập mật khẩu")
            return
        }

        const userData = await AuthApi.login(username, password)
        console.log(userData)
        if (userData.data.code === "200") {
            alert(userData.data.message)
            localStorage.setItem('user', userData.data.user)
            window.history.back();
        } else {
            alert(userData.data.message)
            this.myFormRef.reset()
            this.props.history.push('/login')
        }
    }

    render() {
        console.log(this.props.user)
        return (
            <section className="section">
                <div className="container">
                    <form ref={(el) => this.myFormRef = el}>
                        <div className="column is-half-tablet is-offset-one-quarter-tablet is-one-third-widescreen is-offset-one-third-widescreen">
                            <h1 className="title has-text-grey">Đăng nhập</h1>
                            <div className="box has-text-grey">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input is-large"
                                            name="username"
                                            onChange={(event) => this.handleInputChange(event, 'USERNAME')}
                                            placeholder="Tên đăng nhập" 
                                            required
                                            />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input
                                            type="password"
                                            className="input is-large"
                                            name="password"
                                            onChange={(event) => this.handleInputChange(event, 'PASSWORD')}
                                            placeholder="Mật khẩu" 
                                            required
                                            />
                                    </div>
                                </div>
                                <button type='button' onClick={this.login} className="button is-block is-info is-large is-fullwidth">Đăng nhập</button>
                            </div>
                            <p className="has-text-grey has-text-right">
                                <a href="/signup">Đăng ký</a>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (user) => dispatch(saveUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))