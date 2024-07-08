import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import './tvshow-episodes.scss';

import Button from '../button/Button';

SwiperCore.use([Navigation, Pagination]);

const API_KEY = '5a917d25f7c40ac92b4317c99a46600d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const TVShowEpisodes = ({ tvShowId, seasonNumber, onEpisodeSelect, onInitialEpisodeLoad }) => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            const response = await fetch(`${TMDB_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}?api_key=${API_KEY}`);
            const data = await response.json();
            setEpisodes(data.episodes);
        };

        fetchEpisodes();
    }, [tvShowId, seasonNumber]);

    useEffect(() => {
        if (episodes.length > 0) {
            onInitialEpisodeLoad(episodes[0]);
        }
    }, [episodes, onInitialEpisodeLoad]);

    return (
        <div className="episodes-container">
            <h2>Episodes</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={'auto'}
                grabCursor={true}
            >
                {episodes.map((episode) => (
                    <SwiperSlide key={episode.id}>
                        <div className="episode-card">
                            <Button onClick={() => onEpisodeSelect(episode)}>
                                <i className="bx bx-play"></i>
                            </Button>
                            <img src={`${POSTER_IMAGE_URL}${episode.still_path}`} alt={episode.name} />
                        </div>
                        <p>{episode.name}</p>
                        <h3>Episode {episode.episode_number}</h3>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TVShowEpisodes;
