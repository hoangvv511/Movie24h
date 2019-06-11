import React from 'react';
import '../style/chunk.css';
import { withRouter } from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer" style={{display:'auto'}}>
                <div className="container">
                    <h3 className="title is-6">
                        Phim chất lượng cao online của
                            <a href="/"> Movie24h </a>
                        khác gì so với các trang phim khác?
                    </h3>
                    <ul className="has-text-grey-light">
                        <li>Là phim bluray (remux), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất</li>
                        <li>Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải)</li>
                        <li>Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube)</li>
                        <li>Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem online</li>
                        <li>Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao</li>
                        <li>Vì trang web mới được lập ra nên còn nhiều phim chưa được up, chúng tôi đang xử lý 1 số lượng lớn phim &amp; sẽ up dần trong thời gian tới (xem <a href="/">tất cả phim</a>).</li>
                    </ul>
                    <div>
                        <a rel="nofollow" href="/contact">Liên hệ</a>
                    </div>
                </div>
            </footer>
        );
    }
};

export default withRouter(Footer)