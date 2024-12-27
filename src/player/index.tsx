import React, { useContext, useEffect, useState } from 'react';
import Layer from '../store/layer';
import Video from './video';
import { ItemType, PlayStatus } from './interface';
import PlayControl from './control';
import Context from '../context';
import store from '../store';
import Indicator from '../indicator';
import './index.scss';

// interface EventProps {

// }
// interface VideoProps {
//   start = 0;

//   url = '';

//   end = 0;
// }

interface PlayerProps {
  layers: Layer[];
  refresh: Symbol

  // private currentTime = 0;

  // run() {

  // }

  // playVideo() {

  // }
}

export default function Player(props: PlayerProps) {
  // const [currentTime, setCurrentTime] = useState(0);
  const { layers } = props;
  const { refresh } = useContext(Context);
  useEffect(() => {
    store.setUpdateCallback(() => {
      refresh();
    });
  }, []);

  // console.log('refresh active-----------');

  return (
    <div className="area-player">
      {/* <div>{store.currentTime}</div> */}
      {
        layers.map((item) => (
          <div className="player-container" key={item.id}>
            <PlayControl
              updateFlag={store.updateFlag}
              key={item.id}
              playStatus={store.playStatus}
              list={item.items}
              currentTime={store.currentTime}
            />

          </div>
        ))
      }
    </div>
  );
}
