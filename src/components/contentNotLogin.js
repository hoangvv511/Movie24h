import React from 'react';
import '../style/chunk.css';

export default class ContentNotLogin extends React.Component {
    
    render() {
        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-two-thirds-tablet">
                            <h1 className="title is-3">Mẹ Ma Than Khóc La Llorona</h1>
                            <h2 className="subtitle is-5">The Curse Of La Llorona (<a href="/year/2019">2019</a>)</h2></div>
                        <div className="column has-text-right"><div>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=https://xemphim.plus/movie/the-curse-of-la-llorona~3586" className="fb-share button is-link" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                                </svg> Chia sẻ</a>
                        </div>
                            <div className="back">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path d="M11.093 251.65l175.998 184C211.81 461.494 256 444.239 256 408v-87.84c154.425 1.812 219.063 16.728 181.19 151.091-8.341 29.518 25.447 52.232 49.68 34.51C520.16 481.421 576 426.17 576 331.19c0-171.087-154.548-201.035-320-203.02V40.016c0-36.27-44.216-53.466-68.91-27.65L11.093 196.35c-14.791 15.47-14.791 39.83 0 55.3zm23.127-33.18l176-184C215.149 29.31 224 32.738 224 40v120c157.114 0 320 11.18 320 171.19 0 74.4-40 122.17-76.02 148.51C519.313 297.707 395.396 288 224 288v120c0 7.26-8.847 10.69-13.78 5.53l-176-184a7.978 7.978 0 0 1 0-11.06z" />
                                </svg>
                                <a href="/movie/the-curse-of-la-llorona~3586">Trở về trang giới thiệu phim</a>
                            </div>
                        </div>
                    </div>
                    <div className="has-text-grey-light">
                        <p>Bạn có thể <b>chỉnh lại thời gian</b> (resync) phụ đề, hoặc <b>upload 1 phụ đề khác</b> cho phim này (search phụ đề <a href="https://subscene.com/subtitles/searching?q=The Curse Of La Llorona" target="_blank">ở đây</a>):</p>
                        <div>Vui lòng <a href="/login">đăng nhập</a> để sử dụng tính năng này</div>
                    </div>
                    <div className="has-text-grey-light">Để gửi bình luận phim, vui lòng <a href="/login">đăng nhập</a>.</div>
                </div>
            </section>
        );
    }
};