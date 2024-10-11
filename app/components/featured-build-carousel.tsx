'use client'

import React from 'react'
import ProgressBar from '../ui/progress-bar';
import Image from "next/image";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ratings = [
    { name: "Overall", value: 4.8 },
    { name: "Aerodynamic", value: 5.0 },
    { name: "Weight", value: 4.0 },
]

export default function FeaturedBuildCarousel({ builds }: { builds: any }) {
    return (
        <div className='py-20 wrapper-padding'>
            <h1 className='flex justify-center text-2xl font-bold mb-20'>Featured Builds</h1>
            <SimpleSlider builds={builds} />
        </div>
    )
}

export function SimpleSlider({ builds }: { builds: any }) {
    var settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '0px',
        variableWidth: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };
    return (
        <Slider {...settings}>
            {
                builds?.length > 0 && builds.filter((build: any) => build.name !== "None").map((build: any) => (
                    <Card key={build.id} title={build.name} src={build.image_url} ratings={ratings} />
                ))
            }
        </Slider>
    );
}

function Card({ title, src, ratings }: { title: string, src: string, ratings: any }) {
    return (
        <div className='flex flex-col justify-between border p-5 w-96 h-[25rem]'>
            <div className='flex justify-between items-center gap-5'>
                <h2 className='text-2xl font-bold'>{title}</h2>
                <button className='border-none text-white p-3 bg-[#1A1A1A]'>VIEW&nbsp;BUILD</button>
            </div>
            <div>
                <div className='pt-5 w-[70%] text-right [&>p]:h-6'>
                    {
                        ratings.map((rating: any) => (
                            <div key={rating.name} className="flex justify-between gap-3">
                                <p>{ rating.name }</p>
                                <ProgressBar value={Number(rating.value) * 20} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center pt-10 pb-5'>
                <Image src={src} width={200} height={100} alt='' />
            </div>
        </div>
    )
}

const CustomPrevArrow = (props: any) => {
    const { className, style, onClick, currentSlide, slideCount, ...restProps } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }} // Customize your arrow's style
        onClick={onClick}
        {...restProps} // Spread other props
      >
        <svg
          viewBox="0 0 180 310"
          stroke="#000"
          strokeWidth={30}
          role="button"
          aria-label="previous"
        >
          <path d="M170 10 L10 161 M10 150 L170 300"></path>
        </svg>
      </div>
    );
  };
  
  const CustomNextArrow = (props: any) => {
    const { className, style, onClick, currentSlide, slideCount, ...restProps } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }} // Customize your arrow's style
        onClick={onClick}
        {...restProps} // Spread other props
      >
        <svg
          viewBox="0 0 180 310"
          stroke="#000"
          strokeWidth={30}
          role="button"
          aria-label="next"
        >
          <path d="M10 10 L170 161 M170 150 L10 300"></path>
        </svg>
      </div>
    );
  };
  
