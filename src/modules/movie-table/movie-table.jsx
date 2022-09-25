import { Button, notification, Space, Table, Input } from 'antd'
import { useAsync } from 'hooks/useAsync'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMovieListApi } from 'services/movie'
import { formatDate } from 'utils/common'
import { DeleteFilled, EditFilled, DiffFilled } from '@ant-design/icons'
import { deleteMovieApi } from 'services/movie'
import { useState } from 'react'

const { Search } = Input

export default function MovieTable() {
    const navigate = useNavigate()
    const [keyWord, setKeyWord] = useState('')

    let { state: data = [], refetch } = useAsync({
        service: () => fetchMovieListApi(),
    })

    const deleteMovie = async (movieId) => {
        await deleteMovieApi(movieId)
        notification.success({ message: 'Xóa phim thành công' })
        refetch()
    }

    const onChange = (value) => {
        setKeyWord(value.target.value)
    }

    if (keyWord !== '') {
        data = data.filter(
            (ele) =>
                (ele.biDanh.toLowerCase().trim().indexOf(keyWord.toLocaleLowerCase().trim()) !==
                    -1) |
                (ele.maPhim.toString().trim().indexOf(keyWord.toString().trim()) !== -1)
        )
    }

    const columns = [
        {
            title: 'Movie Id',
            dataIndex: 'maPhim',
            key: 'maPhim',
        },
        {
            title: 'Movie Name',
            dataIndex: 'tenPhim',
            key: 'tenPhim',
            render: (text) => {
                return <b>{text}</b>
            },
        },
        {
            title: 'Show Date',
            dataIndex: 'ngayKhoiChieu',
            key: 'ngayKhoiChieu',
            render: (text) => {
                return <span> {formatDate(text)} </span>
            },
        },
        {
            title: 'Rate',
            dataIndex: 'danhGia',
            key: 'danhGia',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button
                        onClick={() => navigate(`/admin/movie-management/${record.maPhim}/update`)}
                        className="btn btn-success"
                    >
                        <EditFilled />
                    </button>
                    <button onClick={() => deleteMovie(record.maPhim)} className="btn btn-danger">
                        <DeleteFilled />
                    </button>
                    <button
                        onClick={() =>
                            navigate(`/admin/movie-management/showtime/${record.maPhim}`)
                        }
                        className="btn btn-info"
                    >
                        <DiffFilled />
                    </button>
                </Space>
            ),
        },
    ]

    return (
        <>
            <div className="py-5">
                <Search
                    placeholder="Search by MovieId or MovieName"
                    onChange={onChange}
                    enterButton
                />
            </div>
            <div className="text-right mb-3">
                <Button onClick={() => navigate('/admin/movie-management/create')} type="primary">
                    CREATE
                </Button>
            </div>
            <Table rowKey="maPhim" columns={columns} dataSource={data} />
        </>
    )
}
