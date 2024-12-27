import Item from '../store/item';

export enum ItemType {
  VIDEO,
  IMAGE,
  TEXT,
  MUSIC
}

export enum PlayStatus {
  PEDDING,
  PLAYING,
  PAUSE,
}

export interface Effect {
  type: number;
  duration: number;
}

export interface PlayerControlProps {
  playStatus: PlayStatus;
  currentTime: number;
  list: Item[]
  refresh(): void;
  updateList: Symbol;
  updateFlag: Symbol;
  start: number;
  duration: number;
  effects: Effect[]
}

export interface VideoProps extends PlayerControlProps {
  playStart: number;
  url: string;
  volume: number;
}

export interface TextProps extends PlayerControlProps {
  content: string;
}
