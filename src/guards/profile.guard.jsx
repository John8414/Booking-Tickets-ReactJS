import { notification } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProfileGuard() {
    const userState = useSelector((state) => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userState.userInfo) {
            notification.warning({ message: 'You need to login' })
            return navigate('/login')
        }
    }, [])

    return <Outlet />
}
