import { writable } from 'svelte/store';

export type RouterStore = {
  currentPath: string;
};

export const routerStore = writable<RouterStore>({ currentPath: '' });
