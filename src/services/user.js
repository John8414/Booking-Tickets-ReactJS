import { GROUP_ID } from 'constants/common'
import { request } from '../configs/axios'
import { pickBy } from 'lodash'

const loginApi = (data) => {
    return request({
        data,
        url: '/QuanLyNguoiDung/DangNhap',
        method: 'POST',
    })
}

const registerApi = (data) => {
    return request({
        data: data,
        url: '/QuanLyNguoiDung/DangKy',
        method: 'POST',
    })
}

const fetchUserListApi = () => {
    return request({
        url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
        method: 'GET',
    })
}

const fetchUserAccountApi = () => {
    return request({
        url: '/QuanLyNguoiDung/ThongTinTaiKhoan',
        method: 'POST',
    })
}

const updateUserInfoApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        method: 'POST',
        data,
    })
}

const deleteUserApi = (taiKhoan) => {
    return request({
        url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: 'DELETE',
    })
}

const fetchTypeUserApi = () => {
    return request({
        url: '/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung',
        method: 'GET',
    })
}

const addUserAdminApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/ThemNguoiDung',
        method: 'POST',
        data,
    })
}

const fetchUserInfoAdminApi = (userId) => {
    return request({
        url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${userId}`,
        method: 'POST',
    })
}

const updateUserInfoAdminApi = (data) => {
    return request({
        url: '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
        method: 'POST',
        data,
    })
}

const searchUserApi = (keyword) => {
    return request({
        url: `/QuanLyNguoiDung/TimKiemNguoiDung`,
        params: {
            MaNhom: GROUP_ID,
            ...(keyword ? { tuKhoa: keyword } : {}),
        },
        method: 'GET',
    })
}

export {
    loginApi,
    fetchUserListApi,
    registerApi,
    fetchUserAccountApi,
    updateUserInfoApi,
    deleteUserApi,
    fetchTypeUserApi,
    addUserAdminApi,
    fetchUserInfoAdminApi,
    updateUserInfoAdminApi,
    searchUserApi,
}
