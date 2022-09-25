import React from 'react';
import Detail from 'modules/detail/detail';
import ShowTimes from 'modules/show-times/show-times';

export default function MovieDetail() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Detail />
          </div>
          <div className="col-12 mt-5">
            <ShowTimes />
          </div>
        </div>
      </div>
    </div>
  );
}
