import { Button, Form, Input, InputNumber, notification } from 'antd';
import { GROUP_ID } from 'constants/common';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfoApi } from 'services/user';
import { registerApi } from 'services/user';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default function RegisterForm(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (props.userInfoFormApi) {
            form.setFieldsValue(props.userInfoFormApi);
        }
    }, [props.userInfoFormApi]);

    const onFinish = async (values) => {
        if (props.userInfoFormApi) {
            const dataUpdated = {
                ...values,
                maNhom: GROUP_ID,
                maLoaiNguoiDung: props.userInfoFormApi.maLoaiNguoiDung,
            };
            await updateUserInfoApi(dataUpdated);
            notification.success({
                message: 'Update successfully  Next login will be updated',
            });
        } else {
            const data = { ...values, maNhom: GROUP_ID };

            await registerApi(data);
            notification.success({ message: 'Successfully' });

            navigate("/");
        }


    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <Form form={form} {...layout} onFinish={onFinish}>
                        <div className="form-group text-center">
                            <h4 className="text-warning">
                                {props.userInfoFormApi ? 'Profile' : 'Register Form'}
                            </h4>
                        </div>
                        <Form.Item
                            name="taiKhoan"
                            label="User Name "
                            rules={[
                                {
                                    required: true,
                                    message: 'Tài Khoản không được bỏ trống.',
                                },
                                {
                                    pattern: '[a-zA-Z]{4,}',
                                    message: 'Tài khoản không đúng định dạng.',
                                },
                                {
                                    min: 6,
                                    max: 15,
                                    message: 'Tài khoản phải từ 6-15 ký tự.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="matKhau"
                            label="Password "
                            rules={[
                                {
                                    required: true,
                                    message: 'Mật khẩu không được bỏ trống.',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="hoTen"
                            label="First and last name "
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ và tên không được bỏ trống.',
                                },
                                {
                                    pattern: '[a-zA-Z]{4,}',
                                    message: 'Họ và tên không đúng định dạng.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email không được bỏ trống.',
                                },
                                {
                                    pattern: '[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,4}',
                                    message: 'Email không đúng định dạng.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="soDT"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Số phone không được bỏ trống.',
                                },
                                {
                                    pattern: /^[0-9\b]+$/,
                                    message: 'Vui lòng không nhập chữ.',
                                },
                                {
                                    min: 0,
                                    max: 10,
                                    message: 'Số phone không nhập quá 10 số.',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
