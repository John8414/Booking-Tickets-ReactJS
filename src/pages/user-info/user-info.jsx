import { useAsync } from 'hooks/useAsync'
import BookingHistory from 'modules/booking-history/booking-history'
import RegisterForm from 'pages/register-form/register-form'
import React from 'react'
import { useSelector } from 'react-redux'
import { fetchUserAccountApi } from 'services/user'
import './index.scss'

export default function UserInfo() {
    const userState = useSelector((state) => state.userReducer)

    const { state: userInfoFormApi } = useAsync({
        service: () => fetchUserAccountApi(),
        condition: userState.userInfo,
    })

    return (
        <div className="w-75 mx-auto">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#info">
                        Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#history">
                        Booking History
                    </a>
                </li>
            </ul>
            {/* Tab panes */}
            <div className="tab-content py-5">
                <div className="tab-pane container active" id="info">
                    <RegisterForm userInfoFormApi={userInfoFormApi} />
                </div>
                <div className="tab-pane container fade text-center" id="history">
                    <BookingHistory userInfoFormApi={userInfoFormApi} />
                </div>
            </div>
        </div>
    )
}
