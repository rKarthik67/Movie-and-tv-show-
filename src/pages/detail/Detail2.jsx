// Detail.js

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './detail.scss';
import CastList from './CastList';
import MovieList from '../../components/movie-list/MovieList';
import Button from '../../components/button/Button';
import TVShowSeasons from '../../components/series/TVShowSeasons';
import TVShowEpisodes from '../../components/series/TVShowEpisodes';

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(1); // Default to season 1
  const videoSectionRef = useRef(null);
  const seasonsSectionRef = useRef(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  const handlePlayNowClick = () => {
    videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeasonsClick = () => {
    seasonsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeasonNumber(seasonNumber);
  };
  

  return (
    <>
      {item && (
        <>
          <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
              <div className="btns-poster">
                {category === 'movie' ? (
                  <Button onClick={handlePlayNowClick} className="play-now-btn">
                    Play Now
                  </Button>
                ) : (
                  <Button onClick={handleSeasonsClick} className="seasons-btn">Seasons</Button>
                )}
              </div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">
                {item.title || item.name}
              </h1>
              <div className="genres">
                {item.genres && item.genres.slice(0, 5).map((genre, i) => (
                  <span key={i} className="genres__item">{genre.name}</span>
                ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="btns-info">
                {category === 'movie' ? (
                  <Button onClick={handlePlayNowClick} className="play-now-btn">
                    Play Now
                  </Button>
                ) : (
                  <Button onClick={handleSeasonsClick} className="seasons-btn">Seasons</Button>
                )}
              </div>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              {category === 'movie' ? (
                <div ref={videoSectionRef} className="video-player">
                  <iframe
                    src={`https://player.smashy.stream/movie/${item.id}`}
                    width="100%"
                    height="500px"
                    frameBorder="0"
                    allowFullScreen
                    title="Movie Player"
                  ></iframe>
                </div>
              ) : (
                <div ref={seasonsSectionRef} className="seasons-sections">
                  <div className="seasons-list">
                    <TVShowSeasons tvShowId={item.id} onSeasonSelect={handleSeasonSelect} />
                  </div>
                  <TVShowEpisodes tvShowId={item.id} seasonNumber={selectedSeasonNumber} />
                </div>
              )}
                <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
