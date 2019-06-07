import React from 'react';
import '../style/chunk.css';
import { withRouter } from 'react-router-dom'
import AuthApi from '../services/authApi'

class SingupForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            name: '',
            password: ''
        }
    }

    handleInputChange = (event, type) => {
        const { value } = event.target;
        if (type === 'USERNAME') {
            this.setState({ username: value })
        } else if (type === 'NAME') {
            this.setState({ name: value })
        } else {
            this.setState({ password: value })
        }
    }

    signup = async () => {
        const { username, name, password } = this.state
        const user = localStorage.getItem('user')

        const userData = await AuthApi.register(username, name, password)
        if (userData.data.code === "200") {
            alert(userData.data.message)
            this.props.history.push('/login')
        } else {
            alert(userData.data.message)
            this.myFormRef.reset()
            this.props.history.push('/signup')
        }
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <form ref={(el) => this.myFormRef = el}>
                        <div className="column is-half-tablet is-offset-one-quarter-tablet is-one-third-widescreen is-offset-one-third-widescreen">
                            <h1 className="title has-text-grey">Đăng ký</h1>
                            <div className="box">
                                <div className="field">
                                    <div className="control">
                                        <input
                                            onChange={(event) => this.handleInputChange(event, 'USERNAME')}
                                            className="input is-large"
                                            name="username"
                                            placeholder="Tên đăng nhập"
                                            required />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input
                                            onChange={(event) => this.handleInputChange(event, 'NAME')}
                                            className="input is-large"
                                            name="name"
                                            placeholder="Tên bạn"
                                            required />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input
                                            onChange={(event) => this.handleInputChange(event, 'PASSWORD')}
                                            type="password"
                                            className="input is-large"
                                            name="password"
                                            placeholder="Mật khẩu"
                                            required />
                                    </div>
                                </div>
                                <button type='button' onClick={this.signup} className="button is-block is-info is-large is-fullwidth">Đăng ký</button>
                            </div>
                            <p className="has-text-grey has-text-right">
                                <a href="/login">Đăng nhập</a></p>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
};

export default withRouter(SingupForm)