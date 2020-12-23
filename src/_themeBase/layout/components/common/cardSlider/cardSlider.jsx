import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./cardSlider.css";


export const Article = ({ data }) => {
    let image = data.image,
        title = data.title,
        subtitle = data.subtitle;
    return (
        <figure className="snip1584">
            <img src={image} />
            <figcaption>
                <h3>{title}</h3>
                <h5>{subtitle}</h5>
            </figcaption><a href="#"></a>
        </figure>
    )
}

const CardSlider = ({ data }) => {
    let newsTemplate;
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows:true,
        // adaptiveHeight: true,
        // autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    // var settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,
    //     initialSlide: 0,
    //     arrows:true,
    //     rtl: true,
    //     responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 3,
    //           slidesToScroll: 3,
    //           infinite: true,
    //           dots: true
    //         }
    //       },
    //       {
    //         breakpoint: 600,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 2,
    //           initialSlide: 2
    //         }
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1
    //         }
    //       }
    //     ]
    //   };

    if (data.length > 0) {
        newsTemplate = data.map((item, index) => {
            return (
                <div key={index}>
                    <Article data={item} />
                </div>
            )
        })
    } else {
        newsTemplate = <p></p>
    }
    return (
        < >
            <Slider {...settings}>{newsTemplate}</Slider>
            {/* <strong className={'news__count ' + (data.length > 0 ? '' : 'none')}>
                Total cards: {data.length}
            </strong> */}
        </>
    //     <div>
    //     <h2> Responsive </h2>
    //     <Slider {...settings}>
    //       <div>
    //         <h3>1</h3>
    //       </div>
    //       <div>
    //         <h3>2</h3>
    //       </div>
    //       <div>
    //         <h3>3</h3>
    //       </div>
    //       <div>
    //         <h3>4</h3>
    //       </div>
    //       <div>
    //         <h3>5</h3>
    //       </div>
    //       <div>
    //         <h3>6</h3>
    //       </div>
    //       <div>
    //         <h3>7</h3>
    //       </div>
    //       <div>
    //         <h3>8</h3>
    //       </div>
    //     </Slider>
    //   </div>
    );
}

export default CardSlider
