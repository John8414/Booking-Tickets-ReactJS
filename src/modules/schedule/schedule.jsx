import { Button, Tabs } from 'antd'
import { useAsync } from 'hooks/useAsync'
import React from 'react'
import { scheduleCinemaApi } from 'services/cinema'

import _ from 'lodash'

import './index.scss'

const { TabPane } = Tabs

export default function Schedule() {
    const { state: cinemas = [] } = useAsync({
        service: () => scheduleCinemaApi(),
    })

    const renderTime = (list) => {
        const res = _.groupBy(list, (ele) => {
            return ele.ngayChieuGioChieu.slice(0, 10)
        })

        return Object.keys(res).map((key) => {
            const list = res[key]
            return (
                <div>
                    <h5>{key}</h5>
                    {list.map((ele) => (
                        <Button>{ele.ngayChieuGioChieu.slice(11, 16)}</Button>
                    ))}
                    <hr />
                </div>
            )
        })
    }

    const renderTabs = () => {
        return cinemas.map((cinema, idx) => {
            return (
                <TabPane tab={<img style={{ width: 50 }} src={cinema.logo} />} key={idx}>
                    <Tabs tabPosition="left">
                        {cinema.lstCumRap.map((cumRap, idx) => {
                            return (
                                <TabPane
                                    style={{ width: 200 }}
                                    tab={
                                        <div style={{ display: 'flex' }}>
                                            <div>
                                                <h5>{cumRap.tenCumRap}</h5>
                                                <p style={{ textAlign: 'left' }}>{cumRap.diaChi}</p>
                                            </div>
                                        </div>
                                    }
                                    key={idx}
                                >
                                    <Tabs tabPosition="left">
                                        {cumRap.danhSachPhim.map((movie, idx) => {
                                            return (
                                                <TabPane
                                                    className="showtimes"
                                                    style={{ width: 200 }}
                                                    tab={
                                                        <div>
                                                            <img
                                                                src={movie.hinhAnh}
                                                                style={{
                                                                    width: 200,
                                                                    height: 250,
                                                                    marginRight: 15,
                                                                    objectFit: 'cover',
                                                                }}
                                                            />
                                                            <h6>{movie.tenPhim}</h6>
                                                        </div>
                                                    }
                                                    key={idx}
                                                >
                                                    {renderTime(movie.lstLichChieuTheoPhim)}
                                                </TabPane>
                                            )
                                        })}
                                    </Tabs>
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </TabPane>
            )
        })
    }

    return (
        <div className="schedule__wrapper">
            <h2 className="title text-center p-2">Showtimes</h2>
            <div className="container tab">
                <Tabs className="tab-custom" tabPosition="left">
                    {renderTabs()}
                </Tabs>
            </div>
        </div>
    )
}
