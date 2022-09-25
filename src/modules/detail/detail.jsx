import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetailApi } from 'services/movie';
import { formatDate } from 'utils/common';
import Swal from 'sweetalert2';
import './index.scss';

export default function Detail() {
  const [movieDetail, setMovieDetail] = useState({});
  const params = useParams();

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.movieId);

    setMovieDetail(result.data.content);
  };

  return (
    <div className='detail__wrapper'>
      <div className="row">
        <div className="col-3">
          <img className="w-100" src={movieDetail.hinhAnh} alt='hinhPhim' />
        </div>
        <div className="col-9 ">
          <h4 className='detail__tenPhim'>{movieDetail.tenPhim}</h4>
          <p className='detail__moTa'>{movieDetail.moTa}</p>
          <p >
            Screening on:
            <span className='text-info'>
              {formatDate(movieDetail.ngayKhoiChieu)}
            </span>
          </p>
          <div>
            <button
              className="trailer0-btn"
              onClick={() => {
                Swal.fire({
                  html: `<iframe width="100%" height="315" src=${movieDetail.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                  width: 600,
                  padding: '3em',
                  color: '#716add',
                  backdrop: `
                                    rgba(0,0,123,0.4)
                                    url("https://sweetalert2.github.io/images/nyan-cat.gif?fbclid=IwAR38qMGSP8JigdrS0TGl8uLKoG0U9wmIr0CEcepNE3qLHrsgJUoLEMnV864")
                                    left top
                                    no-repeat
                                  `
                });
              }}
            >Trailer</button>
          </div>
        </div>
      </div >
    </div>
  );
}
