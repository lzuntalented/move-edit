import { Button } from 'antd';
import React, { useContext } from 'react';
import Context from '../context';
import { ItemType, PlayStatus } from '../player/interface';
import store from '../store';
import Item from '../store/item';
import { formatTime } from '../utils';
import './index.scss';

function Operation() {
  const { refresh } = useContext(Context);
  const onAddPicture = () => {
    const url = 'http://127.0.0.1:5500/public/1.jpeg';
    const layer = store.getActiveLayer();
    const item = new Item(1000 * 3, '图片');
    item.url = url;
    item.type = ItemType.IMAGE;
    layer.addItem(item);
    store.updateFlag = Symbol(1);
    store.activeItemId = item.id;
    refresh();
  };
  const onAddVideo = () => {
    const url = 'http://127.0.0.1:9000/d.mp4';
    const layer = store.getActiveLayer();
    const item = new Item(8 * 1000, '视频');
    item.url = url;
    item.type = ItemType.VIDEO;
    layer.addItem(item);
    // item.setStart(2 * 1000);
    store.activeItemId = item.id;
    store.updateFlag = Symbol(1);
    refresh();
  };
  const onAddText = () => {
    const content = '我是字幕';
    const layer = store.getActiveLayer();
    const item = new Item(1000 * 1, '文字');
    item.content = content;
    item.type = ItemType.TEXT;
    layer.addItem(item);
    store.activeItemId = item.id;
    store.updateFlag = Symbol(1);
    refresh();
  };
  const onAddMusic = () => {
    const url = 'http://127.0.0.1:5500/public/o.m4a';
    const layer = store.addLayer();
    const item = new Item(100 * 1000, '音乐');
    item.url = url;
    item.type = ItemType.MUSIC;
    layer.addItem(item);
    store.activeItemId = item.id;
    store.activeLayer = 0;
    refresh();
  };

  const onAddLayer = () => {
    const layer = store.addLayer();
    const content = '我是字幕';
    const item = new Item(1000 * 1, '文字');
    item.content = content;
    item.type = ItemType.TEXT;
    layer.addItem(item);
    store.activeItemId = item.id;
    store.updateFlag = Symbol(1);
    refresh();
  };

  const onChange = () => {
    if (store.playStatus !== PlayStatus.PLAYING) {
      store.play();
    } else {
      store.pause();
      refresh();
    }
  };
  const total = store.getTotalTime();
  return (
    <div className="operation">
      <Button onClick={onAddPicture}>添加图片</Button>
      <Button onClick={onAddVideo}>添加视频</Button>
      <Button onClick={onAddText}>添加文字</Button>
      <Button onClick={onAddMusic}>添加音乐</Button>
      <Button onClick={onAddLayer}>添加轨道</Button>
      <Button onClick={onChange}>
        {
            store.playStatus === PlayStatus.PLAYING ? '暂停' : '播放'
          }
        {
            formatTime(store.currentTime)
          }
        /
        {
            formatTime(total)
          }
      </Button>
    </div>
  );
}

export default Operation;
