import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'hooks/useAsync';
import { fetchMovieListApi } from 'services/movie';

import { Pagination } from 'antd';

import './index.scss';

export default function MovieList() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [moviePerPage] = useState(8);

    const { state: movieList = [] } = useAsync({
        dependencies: [],
        service: () => fetchMovieListApi(),
    });

    // Get current post
    const indexOfLastMovie = currentPage * moviePerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviePerPage;
    const currentMovie = movieList.slice(indexOfFirstMovie, indexOfLastMovie);

    const renderMovieList = () => {
        return currentMovie.map((ele) => {
            return (
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 " key={ele.maPhim}>
                    <div className="item__wrapper">
                        <div className='item__container'>
                            {/* item */}
                            <div className="thumb__item">
                                <img className="thumb-img " src={ele.hinhAnh} alt="movie" />
                            </div>
                            {/* overlay  */}
                            <div className="thumb__overlay text-center">
                                <h6 className="thumb__title text-danger">{ele.tenPhim}</h6>
                                <p className="thumb__describe">{ele.moTa}</p>
                                <button
                                    onClick={() => navigate(`/movie/${ele.maPhim}`)}
                                    className="seeMore-btn"
                                >
                                    See More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const handleChange = (number) => {
        setCurrentPage(number);
    };

    return (
        <section className="py-5 thumbnails">
            <h2 className="title text-center p-2">Movie</h2>
            <div className="container">
                <div className="row justify-content-center">{renderMovieList()}</div>
                <div className="text-center py-3">
                    <Pagination
                        onChange={handleChange}
                        defaultCurrent={1}
                        total={movieList.length}
                        pageSize={moviePerPage}
                    />
                </div>
            </div>
        </section>
    );
}
