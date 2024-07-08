// TVShowSeasons.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './tvshow-seasons.scss';
import Button from '../button/Button';

SwiperCore.use([Navigation, Pagination]);

const API_KEY = '5a917d25f7c40ac92b4317c99a46600d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const TVShowSeasons = ({ tvShowId, onSeasonSelect }) => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/${tvShowId}`, {
          params: {
            api_key: API_KEY,
            append_to_response: 'seasons'
          }
        });
        setSeasons(response.data.seasons);
      } catch (error) {
        console.error('Error fetching TV show seasons:', error);
      }
    };

    fetchSeasons();
  }, [tvShowId]);

  const handleSeasonClick = (seasonNumber) => {
    onSeasonSelect(seasonNumber);
  };

  return (
    <div className="tv-show-seasons">
      <h2>Seasons</h2>
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={'auto'}
      >
        {seasons.map(season => (
          <SwiperSlide key={season.id} onClick={() => handleSeasonClick(season.season_number)}>
            <div className="tv-card" style={{ backgroundImage: `url(${POSTER_IMAGE_URL}${season.poster_path})` }}>
              <Button>
                <i className="bx bx-play"></i>
              </Button>
            </div>
            <h3>Season {season.season_number}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TVShowSeasons;
