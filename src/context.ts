import React from 'react';
import { Updater } from 'use-immer';
import { Store } from './store';

interface IContext {
  state: {
    refreshFlag: Symbol
    activeWidgetId: number
  }
  refresh(): void
}

// type NonFunctionPropertyNames<T> = {
//   [K in keyof T]: T[K] extends Function ? never : K;
// }[keyof T];
// type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// type ExcludeMethods<T> =
//   Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>;

const Context = React.createContext({} as IContext);

export const { Provider, Consumer } = Context;
export default Context;
