import './index.scss'
import React from 'react'
import IconCgv from '../icon/icon-cgv'
import { IconBhd, IconGPlay, IconLogo } from '../icon'
import IconLotte from '../icon/icon-lotte'
import IconCinestar from '../icon/icon-cinestar'
import IconAppStore from '../icon/icon-app-store'

export default function Footer() {
    return (
        <section className="mt-5 footer">
            <div className="line"></div>
            <div className="logo text-center py-3">
                <a className="navbar-brand ">
                    <IconLogo />
                </a>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                        <h1 className="text-center footer_title ">Brands</h1>
                        <ul className="nav justify-content-around">
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.cgv.vn/" target="_blank">
                                    <IconCgv />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.cgv.vn/" target="_blank">
                                    <IconBhd />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.cgv.vn/" target="_blank">
                                    <IconLotte />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.cgv.vn/" target="_blank">
                                    <IconCinestar />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                        <h1 className="text-center footer_title">Contact Us</h1>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <iframe
                                    className="vw-25"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.698849027608!2d106.66066231511415!3d10.75767679233425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f84395debb7%3A0xd031403ec35b96b8!2sVNET%20Coffee%20Gaming!5e0!3m2!1sen!2s!4v1660823599633!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link p-0"
                                    href="https://goo.gl/maps/TVMiX7a1m1Rw1qKm6"
                                    target="_blank"
                                >
                                    Address: 33 Nguyễn Kim st, Dis.5
                                </a>
                            </li>
                            <li className="nav-item">Phone: 0353626765</li>
                            <li className="nav-item">
                                <ul className="nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i className="fab fa-facebook" />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i className="fab fa-instagram-square" />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i className="fab fa-telegram" />
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                        <h1 className="text-center footer_title">News</h1>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link d-flex justify-content-center " href="#">
                                    About us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  d-flex justify-content-center" href="#">
                                    Mission
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  d-flex justify-content-center" href="#">
                                    Society
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link  d-flex justify-content-center" href="#">
                                    Work with us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
                        <h1 className="text-center footer_title">Available on:</h1>
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <IconAppStore />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <IconGPlay />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copy-right text-center mt-3 py-3">
                <img
                    width="200px"
                    src="https://cinestar.com.vn/catalog/view/theme/default/images/dathongbao.png"
                />

                <p>
                    CÔNG TY CỔ PHẦN GIẢI TRÍ PHÁT HÀNH PHIM – RẠP CHIẾU PHIM NGÔI SAO
                    <br />
                    ĐỊA CHỈ: 135 HAI BÀ TRƯNG, PHƯỜNG BẾN NGHÉ, QUẬN 1, TP.HCM
                    <br />
                    GIẤY CNĐKDN SỐ: 0312742744, ĐĂNG KÝ LẦN ĐẦU NGÀY 18/04/2014, ĐĂNG KÝ THAY ĐỔI
                    LẦN THỨ 2 NGÀY 15/09/2014, CẤP BỞI SỞ KH&ĐT TP.HCM
                </p>
                <p>2015 © TRICINEMA. ALL RIGHTS RESERVED.</p>
            </div>
        </section>
    )
}
