import { createId } from '../utils';
import Item from './item';

export default class Layer {
  items: Item[] = [];

  readonly id: string = '';

  readonly type = 0;

  constructor() {
    this.id = createId();
  }

  addItem(obj: Item) {
    const last = this.items[this.items.length - 1];
    if (last) {
      obj.setStart(last.start + last.duration);
    }
    this.items.push(obj);
  }

  insertItem(obj: Item, index: number) {
    this.items = [...this.items.slice(0, index), obj, ...this.items.slice(index)];
  }
}
