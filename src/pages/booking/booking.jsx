import { LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import NyanCatLoader from 'components/loader/nyan-cat-loader';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Chair from '../../modules/chair/chair';
import { bookingTicketApi, fetchRoomListApi } from '../../services/booking';
import './index.scss';


export default function Booking() {
    const [danhSachGhe, setDanhSachGhe] = useState([]);
    const [roomList, setRoomList] = useState();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoomList();
    }, []);

    const fetchRoomList = async () => {
        const result = await fetchRoomListApi(params.maLichChieu);

        setRoomList(result.data.content);
    };

    const handleSelect = (selectedChair) => {
        const data = [...danhSachGhe];

        const idx = data.findIndex((ele) => ele.tenGhe === selectedChair.tenGhe);

        if (idx !== -1) {
            data.splice(idx, 1);
        } else {
            data.push(selectedChair);
        }

        setDanhSachGhe(data);
    };

    const classifySeat = (type) => {
        return danhSachGhe.map((ele, idx) => {
            if (ele.loaiGhe === type) {
                return (
                    <React.Fragment key={ele.tenGhe}>
                        <span className="mr-1 text-justify booking__seat">{ele.tenGhe}</span>
                        {(idx + 1) % 2 === 0 && <br />}
                    </React.Fragment>
                );
            }
        });
    };

    const handleBookingTicket = async () => {
        const danhSachVe = danhSachGhe.map((ele) => {
            return {
                maGhe: ele.maGhe,
                giaVe: ele.giaVe,
            };
        });

        const submitData = {
            maLichChieu: params.maLichChieu,
            danhSachVe,
        };

        await bookingTicketApi(submitData);

        notification.success({ message: 'Booking Successfully' });
        navigate('/');
    };

    return roomList ? (
        <div className='booking_wrapper'>
            <div className="row mx-auto my-5">
                <div className="col-lg-4 col-md-12">
                    <div className="container booking_table">
                        <h2>{roomList.thongTinPhim.tenPhim}</h2>
                        <img
                            className="pb-5"
                            src={roomList.thongTinPhim.hinhAnh}
                            alt="hinhPhim"
                        />
                        <div className='seat_note'>
                            <div>
                                <button className='standard'>
                                </button>
                                <span>Standard</span>
                            </div>
                            <div>
                                <button className='Vip'>
                                </button>
                                <span>Vip</span>
                            </div>
                            <div>
                                <button className='selecting'>
                                </button>
                                <span>Selecting</span>
                            </div>
                            <div>
                                <button className='daDat'>
                                </button>
                                <span>Booked</span>
                            </div>
                        </div>

                        <table className="table table-striped text-info">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Seat No.</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-justify">Standard</td>
                                    <td>{classifySeat('Thuong')}</td>
                                    <td className="text-danger">
                                        {danhSachGhe
                                            .reduce((previousValue, currentValue) => {
                                                previousValue += currentValue.giaVe;
                                                return previousValue;
                                            }, 0)
                                            .toLocaleString()}
                                    </td>
                                </tr>
                                <tr>
                                    <td>VIP</td>
                                    <td>{classifySeat('Vip')}</td>
                                    <td>
                                        <button
                                            onClick={handleBookingTicket}
                                            className="book-btn"
                                        >
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12 seatList ">
                    <div className='screen'></div>
                    <div className='seatListContainer pt-5'>
                        {roomList.danhSachGhe.map((ele, idx) => {
                            return (
                                <React.Fragment key={ele.tenGhe}>
                                    <Chair handleSelect={handleSelect} item={ele} />
                                    {(idx + 1) % 16 === 0 && <br />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <NyanCatLoader />

    );
}
