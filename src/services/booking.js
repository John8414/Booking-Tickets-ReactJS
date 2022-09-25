import { request } from "../configs/axios";

const fetchRoomListApi = (showTimeId) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeId}`,
    method: "get",
  });
};

const bookingTicketApi = (data) => {
  return request({
    url: "/QuanLyDatVe/DatVe",
    method: "post",
    data,
  });
};

export { fetchRoomListApi, bookingTicketApi };
