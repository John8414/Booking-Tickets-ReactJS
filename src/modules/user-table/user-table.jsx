import { Button, notification, Space, Table, Input } from 'antd'
import { useAsync } from 'hooks/useAsync'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserListApi } from 'services/user'

import { EditFilled, DeleteFilled } from '@ant-design/icons'
import { deleteUserApi } from 'services/user'
import { searchUserApi } from 'services/user'
import { useEffect } from 'react'

const { Search } = Input

export default function UserTable() {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')

    const { state: data = [], refetch } = useAsync({
        service: () => fetchUserListApi(),
    })

    const deleteUser = async (taiKhoan) => {
        await deleteUserApi(taiKhoan)
        notification.success({ message: 'Successfuly' })
        refetch()
    }

    const { state: searchUser } = useAsync({
        service: () => searchUserApi(keyword),
        dependencies: [keyword],
        // condition: !!keyWord,
    })

    const onChange = (event) => {
        setKeyword(event.target.value)
    }

    let count = 0

    const columns = [
        {
            title: 'No',
            dataIndex: 'stt',
            key: 'stt',
            render: () => {
                count += 1
                return <p>{count}</p>
            },
        },
        {
            title: 'Username',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
        },
        {
            title: 'Password',
            dataIndex: 'matKhau',
            key: 'matKhau',
        },
        {
            title: 'Fullname',
            key: 'hoTen',
            dataIndex: 'hoTen',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            key: 'soDT',
            dataIndex: 'soDT',
        },
        {
            title: 'Action',
            key: 'thaoTac',
            render: (_, record) => (
                <Space size="middle">
                    <button
                        onClick={() => navigate(`/admin/user-management/update/${record.taiKhoan}`)}
                        className="btn btn-success"
                    >
                        <EditFilled />
                    </button>
                    <button onClick={() => deleteUser(record.taiKhoan)} className="btn btn-danger">
                        <DeleteFilled />
                    </button>
                </Space>
            ),
        },
    ]
    return (
        <>
            <div className="py-5">
                <Search placeholder="Search by username" onChange={onChange} enterButton />
            </div>

            <div className="text-right mb-3">
                <Button onClick={() => navigate('/admin/user-management/create')} type="primary">
                    CREATE USER
                </Button>
            </div>

            <Table rowKey="taiKhoan" columns={columns} dataSource={searchUser} />
        </>
    )
}
