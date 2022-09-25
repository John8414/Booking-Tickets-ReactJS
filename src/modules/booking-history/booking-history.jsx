import React from 'react'
import { formatDate } from 'utils/common'

import './index.scss'

export default function BookingHistory(props) {
    const renderContent = () => {
        return props.userInfoFormApi?.thongTinDatVe.map((ele) => {
            return (
                <div key={ele.maVe} className="section row py-2 mb-3 ">
                    <div className="col-4">
                        <img className="img-fluid movie-img" src={ele.hinhAnh} alt="" />
                        <h4>{ele.tenPhim}</h4>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12">
                                                <h3>{ele.danhSachGhe[0].tenHeThongRap}</h3>
                                                <h4>{ele.danhSachGhe[0].tenRap}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 text-info">
                                <p>{formatDate(ele.ngayDat)}</p>
                            </div>
                            <div className="col-12">
                                {ele.danhSachGhe.map((seat) => {
                                    return (
                                        <div key={seat.maGhe} className="btn btn-success m-2">
                                            {seat.tenGhe}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return <div>{renderContent()}</div>
}
