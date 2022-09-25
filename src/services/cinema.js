import { GROUP_ID } from 'constants/common'
import { request } from '../configs/axios'

const fetchMovieShowTimesApi = (movieId) => {
    return request({
        url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
        method: 'GET',
    })
}

const fetchCinemaListApi = () => {
    return request({
        url: '/QuanLyRap/LayThongTinHeThongRap',
        method: 'GET',
    })
}

const fetchCinemaInfoApi = (maRap) => {
    return request({
        url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`,
        method: 'GET',
    })
}

const scheduleCinemaApi = () => {
    return request({
        url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap?maNhom=${GROUP_ID}`,
        method: 'GET',
    })
}

const addScheduleMovieApi = (data) => {
    return request({
        url: `/QuanLyDatVe/TaoLichChieu`,
        method: 'POST',
        data,
    })
}

export {
    fetchMovieShowTimesApi,
    fetchCinemaListApi,
    scheduleCinemaApi,
    fetchCinemaInfoApi,
    addScheduleMovieApi,
}
