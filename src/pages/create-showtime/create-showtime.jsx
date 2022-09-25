import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    notification,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd'
import { useAsync } from 'hooks/useAsync'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { addScheduleMovieApi } from 'services/cinema'
import { fetchCinemaInfoApi } from 'services/cinema'
import { fetchCinemaListApi } from 'services/cinema'

export default function CreateShowtime() {
    const params = useParams()
    const [cinemaId, setCinemaId] = useState()
    const [componentSize, setComponentSize] = useState('default')

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size)
    }

    const { state: cinemaList } = useAsync({
        service: () => fetchCinemaListApi(),
    })

    useEffect(() => {
        setCinemaId(cinemaList?.[0].maHeThongRap)
    }, [cinemaList])

    useEffect(() => {
        setCinemaId(cinemaList?.[0].maHeThongRap)
    }, [cinemaList])

    const renderCinemas = () => {
        return cinemaList?.map((ele) => {
            return (
                <Select.Option key={ele.maHeThongRap} value={ele.maHeThongRap}>
                    {ele.tenHeThongRap}
                </Select.Option>
            )
        })
    }

    const handleChangeCinema = (value) => {
        setCinemaId(value)
    }

    const { state: theater } = useAsync({
        service: () => fetchCinemaInfoApi(cinemaId),
        dependencies: [cinemaId],
        condition: !!cinemaId,
    })

    const renderTheater = () => {
        return theater?.map((ele) => {
            return (
                <Select.Option key={ele.maCumRap} value={ele.maCumRap}>
                    {ele.tenCumRap}
                </Select.Option>
            )
        })
    }

    const onFinish = async (value) => {
        value.ngayChieuGioChieu = value.ngayChieuGioChieu.format('DD/MM/YYYY hh:mm:ss')
        const data = {
            ...value,
            maPhim: params.movieId,
        }

        await addScheduleMovieApi(data)
        notification.success({ message: 'Successfully' })
    }

    return cinemaList ? (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-7">
                    <Form
                        onFinish={onFinish}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: componentSize,
                        }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                    >
                        <Form.Item label="Cinemas cluster">
                            <Select
                                onChange={handleChangeCinema}
                                defaultValue={cinemaList[0].maHeThongRap}
                            >
                                {renderCinemas()}
                            </Select>
                        </Form.Item>
                        <Form.Item name="maRap" label="Theater cluster">
                            <Select>{renderTheater()}</Select>
                        </Form.Item>

                        <Form.Item name="ngayChieuGioChieu" label="DatePicker[showTime]">
                            <DatePicker showTime />
                        </Form.Item>

                        <Form.Item name="giaVe" label="Price">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Function">
                            <Button htmlType="submit" type="primary">
                                Thêm Lịch Chiếu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    ) : (
        'loading'
    )
}
