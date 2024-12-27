import React, { useEffect, useRef } from 'react';
import store from '../store';
import { PlayStatus, VideoProps } from './interface';

export default function Music(props: VideoProps) {
  const {
    url, playStatus, updateFlag,
    start, playStart, volume,
  } = props;
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (url) {
      if (ref?.current) {
        ref.current.volume = volume;
        if (playStatus === PlayStatus.PAUSE) {
          ref.current?.pause();
        } else if (ref.current) {
          ref.current.play();
        }
      }
    }
  }, [playStatus, url]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = (store.currentTime - start + playStart) / 1000;
    }
  }, [start, updateFlag, playStart]);

  // console.log(playStatus, 'playStatus', url, ref?.current?.currentTime);
  return <audio ref={ref} src={url} />;
}
