import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Image,
    Input,
    InputNumber,
    notification,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd'
import { GROUP_ID } from 'constants/common'
import { useAsync } from 'hooks/useAsync'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMovieDetailApi } from 'services/movie'
import { addMovieUploadImage } from 'services/movie'
import moment from 'moment'
import { updateMovieUploadImage } from 'services/movie'
import { isEmpty } from 'lodash'

export default function MovieForm() {
    const [componentSize, setComponentSize] = useState('default')
    const [image, setImage] = useState()
    const [file, setFile] = useState()
    const params = useParams()
    const navigate = useNavigate()

    const [form] = Form.useForm()

    const { state: movieDetail } = useAsync({
        service: () => fetchMovieDetailApi(params.movieId),
        dependencies: [params.movieId],
        condition: !!params.movieId,
    })

    useEffect(() => {
        if (movieDetail) {
            form.setFieldsValue({
                ...movieDetail,
                ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
            })

            setImage(movieDetail.hinhAnh)
        }
    }, [movieDetail])

    const onFormLayoutChange = (event) => {
        setComponentSize(event.target.value)
    }

    const handleSave = async (values) => {
        values.ngayKhoiChieu = values.ngayKhoiChieu.format('DD/MM/YYYY')
        values.maNhom = GROUP_ID

        const formData = new FormData()

        for (const key in values) {
            formData.append(key, values[key])
        }

        file && formData.append('File', file, file.name)
        params.movieId && formData.append('maPhim', params.movieId)

        if (params.movieId) {
            await updateMovieUploadImage(formData)
        } else {
            await addMovieUploadImage(formData)
        }

        notification.success({
            description: 'Successfully!',
        })
        navigate('/admin/movie-management')
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0]

        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImage(e.target.result)
            setFile(file)
        }
    }

    return (
        <Form
            form={form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="vertical"
            initialValues={{
                tenPhim: '',
                moTa: '',
                ngayKhoiChieu: '',
                sapChieu: true,
                dangChieu: true,
                hot: true,
                trailer: '',
                danhGia: '',
            }}
            onFinish={handleSave}
            size={componentSize}
        >
            <Form.Item label="Form Size">
                <Radio.Group defaultValue={componentSize} onChange={onFormLayoutChange}>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="Movie Name"
                name="tenPhim"
                rules={[
                    {
                        validator: (rules, value) => {
                            if (isEmpty(value)) {
                                return Promise.reject('T??n phim kh??ng ???????c b??? tr???ng.')
                            }
                            return Promise.resolve()
                        },
                    },
                    {
                        pattern:
                            '[a-zA-Z]{4,}',
                        message: 'T??n phim kh??ng ????ng ?????nh d???ng. ',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Trailer"
                name="trailer"
                rules={[
                    {
                        validator: (rules, value) => {
                            if (isEmpty(value)) {
                                return Promise.reject('Trailer kh??ng ???????c b??? tr???ng.')
                            }
                            return Promise.resolve()
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="moTa"
                rules={[
                    {
                        validator: (rules, value) => {
                            if (isEmpty(value)) {
                                return Promise.reject('M?? t??? kh??ng ???????c b??? tr???ng.')
                            }
                            return Promise.resolve()
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Showing Date"
                name="ngayKhoiChieu"
                rules={[
                    {
                        validator: (rules, value) => {
                            if (isEmpty(value)) {
                                return Promise.reject('Ng??y kh???i chi???u kh??ng ???????c b??? tr???ng.')
                            }
                            return Promise.resolve()
                        },
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item label="Showing" valuePropName="checked" name="dangChieu">
                <Switch />
            </Form.Item>
            <Form.Item label="Coming Soon" valuePropName="checked" name="sapChieu">
                <Switch />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked" name="hot">
                <Switch />
            </Form.Item>
            <Form.Item
                label="Rate"
                name="danhGia"
                rules={[
                    { min: 1, message: 'S??? sao ph???i l???n h??n 0', type: 'number' },
                    { max: 10, message: 'S??? sao nh??? h??n ho???c b???ng 10', type: 'number' },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item label="File">
                <Input type="file" onChange={handleChangeImage} />
            </Form.Item>
            <Image src={image} />
            <Form.Item shouldUpdate>
                {() => {
                    return (
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={
                                !form.isFieldsTouched() ||
                                form.getFieldsError().some((ele) => ele.errors.length > 0)
                            }
                        >
                            SAVE
                        </Button>
                    )
                }}
            </Form.Item>
        </Form>
    )
}
