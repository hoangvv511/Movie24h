import React from 'react';
import '../style/chunk.css';

export default class SingupForm extends React.Component {
    render() {
        return (
            <section className="section">
                <div className="container">
                    <form>
                        <div className="column is-half-tablet is-offset-one-quarter-tablet is-one-third-widescreen is-offset-one-third-widescreen">
                            <h1 className="title has-text-grey">Đăng ký</h1>
                            <div className="box">
                                <div className="field">
                                    <div className="control">
                                        <input type="email" className="input is-large" name="email" placeholder="Email" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large" name="name" placeholder="Tên bạn" required />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="password" className="input is-large" name="password" placeholder="Mật khẩu" required />
                                    </div>
                                </div>
                                <button type="submit" className="button is-block is-info is-large is-fullwidth">Đăng ký</button>
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