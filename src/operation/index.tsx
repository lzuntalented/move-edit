import { LaptopOutlined } from '@ant-design/icons';
import { div } from 'antd';
import React, { useContext } from 'react';
import Context from '../context';
import { ItemType, PlayStatus } from '../player/interface';
import store from '../store';
import Item from '../store/item';
import { formatTime } from '../utils';
import './index.scss';

interface Props {
  onWidgetClick(e: number): void;
  activeWidgetId: number;
}
function Operation({ onWidgetClick, activeWidgetId }: Props) {
  const { refresh } = useContext(Context);
  const onAddPicture = () => {
    // const url = 'http://127.0.0.1:5500/public/1.jpeg';
    // const layer = store.getActiveLayer();
    // const item = new Item(1000 * 3, '图片');
    // item.url = url;
    // item.type = ItemType.IMAGE;
    // layer.addItem(item);
    // store.updateFlag = Symbol(1);
    // store.activeItemId = item.id;
    // refresh();

    onWidgetClick(1);
  };
  const onAddVideo = () => {
    const url = 'http://movie.lzuntalented.cn/asset/short.mp4';
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
    const url = 'http://movie.lzuntalented.cn/asset/o.m4a';
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
  const menus = [
    {
      title: '图片',
      icon: <LaptopOutlined />,
      key: 1,
    },
    {
      title: '视频',
      icon: <LaptopOutlined />,
      key: 2,
    },
    {
      title: '文字',
      icon: <LaptopOutlined />,
      key: 3,
    },
    {
      title: '音乐',
      icon: <LaptopOutlined />,
      key: 4,
    },
    {
      title: '轨道',
      icon: <LaptopOutlined />,
      key: 5,
    },
  ];
  return (
    <div className="operation">
      {
        menus.map((it) => (
          <div
            className={`menu-item ${it.key === activeWidgetId ? 'menu-item-active' : ''}`}
            onClick={() => {
              onWidgetClick(it.key);
            }}
          >
            {it.icon}
            {it.title}
          </div>
        ))
      }
      <div className="menu-item" onClick={onAddPicture}>
        <LaptopOutlined />
        图片
      </div>
      <div className="menu-item" onClick={onAddVideo}>视频</div>
      <div className="menu-item" onClick={onAddText}>文字</div>
      <div className="menu-item" onClick={onAddMusic}>音乐</div>
      <div className="menu-item" onClick={onAddLayer}>轨道</div>
      <div className="menu-item" onClick={onChange}>
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
      </div>
    </div>
  );
}

export default Operation;
