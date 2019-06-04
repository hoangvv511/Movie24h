import React from 'react';
import '../style/chunk.css';

export default class LoginForm extends React.Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <form>
                        <div className="column is-half-tablet is-offset-one-quarter-tablet is-one-third-widescreen is-offset-one-third-widescreen">
                            <h1 className="title has-text-grey">Đăng nhập</h1>
                            <div className="box has-text-grey">
                                <div className="field">
                                    <div className="control">
                                        <input type="email" className="input is-large" name="email" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="password" className="input is-large" name="password" placeholder="Mật khẩu" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="checkbox">
                                        <input type="checkbox" name="remember" /> Ghi nhớ</label>
                                </div>
                                <button type="submit" className="button is-block is-info is-large is-fullwidth">Đăng nhập</button>
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