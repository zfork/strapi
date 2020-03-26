import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import PlayIcon from '../PlayIcon';
import Duration from '../Duration';
import Wrapper from './Wrapper';

const VideoPlayer = ({ src }) => {
  const [isHover, setIsHover] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef();

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      // Change isPlaying here too because onPause handler is only called on controls click
      setIsPlaying(false);
    } else {
      videoRef.current.play();
    }
  };

  return (
    <Wrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={togglePlay}
    >
      <video
        controls={isPlaying}
        ref={videoRef}
        src={src}
        crossOrigin="anonymous"
        onLoadedData={({ target: { duration } }) => {
          setDuration(duration);
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
      >
        <track default kind="captions" srcLang="en" src="" />
      </video>
      {isHover && !isPlaying && <PlayIcon />}
      <Duration duration={duration} />
    </Wrapper>
  );
};

VideoPlayer.defaultProps = {
  src: null,
};

VideoPlayer.propTypes = {
  src: PropTypes.string,
};

export default VideoPlayer;
