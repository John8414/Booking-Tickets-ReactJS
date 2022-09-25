import React from 'react'
import { Carousel as CarouselAntd } from 'antd'

const contentStyle = {
    width: '100%',
    height: '450px',
    objectFit: 'cover',
}

export default function Carousel() {
    return (
        <CarouselAntd dotPosition="bottom" autoplay>
            <div>
                <img
                    style={contentStyle}
                    src="https://cdn.flickeringmyth.com/wp-content/uploads/2019/03/Avengers-Endgame-intl-banner-1.jpg"
                />
            </div>
            <div>
                <img
                    style={contentStyle}
                    src="https://collider.com/wp-content/uploads/avengers-character-poster-banner.jpeg"
                />
            </div>
            <div>
                <img
                    style={contentStyle}
                    src="https://sportshub.cbsistatic.com/i/2021/11/11/f0d33317-5c68-4ad7-9941-f55fdf656e67/new-marvel-disney-plus-banner-revealed-day.jpg?auto=webp&width=1630&height=628&crop=2.596:1,smart"
                />
            </div>
            <div>
                <img
                    style={contentStyle}
                    src="https://alltimelines.com/wp-content/uploads/2019/10/homepagebanner-marvel.jpg"
                />
            </div>
        </CarouselAntd>
    )
}
