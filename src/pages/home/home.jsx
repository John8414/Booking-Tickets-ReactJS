import Schedule from 'modules/schedule/schedule'
import React from 'react'
import Carousel from '../../modules/carousel/carousel'
import MovieList from '../../modules/movie-list/movie-list'

export default function Home() {
    return (
        <div className="py-5">
            <Carousel />
            <MovieList />
            <Schedule />
        </div>
    )
}
