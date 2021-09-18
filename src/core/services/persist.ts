import localforage from 'localforage';
import type { Unsubscriber, Writable } from 'svelte/store';

export class PersistService<DataType> {
  constructor(options: LocalForageOptions) {
    this.storage = localforage.createInstance(options);
  }

  private storage: LocalForage | null = null;

  private async persistData(key: string, value: DataType): Promise<void> {
    try {
      await this.storage?.setItem(key, value);
    } catch (error) {
      console.error(`Unable to persist data. ${error}`);
    }
  }

  async getData(key: string): Promise<DataType | null> {
    try {
      const result = await this.storage?.getItem<DataType>(key);

      return result ?? null;
    } catch (error) {
      console.error(`Unable to get the data. ${error}`);
    }

    return null;
  }

  subscribe(store: Writable<DataType>, key: string): Unsubscriber {
    const unsubscribe = store.subscribe((value) => {
      this.persistData(key, value);
    });

    return unsubscribe;
  }
}
