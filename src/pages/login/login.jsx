import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_INFO_KEY } from 'constants/common';
import { loginApi } from 'services/user';
import { setUserInfoAction } from 'store/actions/user.action';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        taiKhoan: '',
        matKhau: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await loginApi(state);

        localStorage.setItem(USER_INFO_KEY, JSON.stringify(result.data.content));
        dispatch(setUserInfoAction(result.data.content));
        navigate('/');
    };

    return (
        <form className="w-25 mx-auto my-5" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Tài khoản</label>
                <input
                    name="taiKhoan"
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Mật khẩu</label>
                <input
                    name="matKhau"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                />
            </div>
            <button className="btn btn-success w-100">LOGIN</button>
        </form>
    );
}
