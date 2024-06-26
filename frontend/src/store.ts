import { watch } from "vue";

import { State } from "@/state";

const IDB_NAME = "flowey";
const OBJECT_STORE_NAME = "state";

class Store {
  idb: IDBDatabase | null = null;
  state: State = new State();

  async init() {
    this.idb = await this.openIndexedBD();

    for (const [ref, property] of this.state) {
      watch(ref, () => {
        this.put(ref.value, property);
      });
    }
  };

  put(value: unknown, property: string) {
    this.idb!
      .transaction(OBJECT_STORE_NAME, "readwrite")
      .objectStore(OBJECT_STORE_NAME)
      .put(value, property);
  }

  private async openIndexedBD() {
    return new Promise<IDBDatabase>((resolve) => {
      const request = window.indexedDB.open(IDB_NAME);

      request.onupgradeneeded = (event) => {
        const idb = (event.target as IDBOpenDBRequest).result;
        const objectStore = idb.createObjectStore(OBJECT_STORE_NAME);

        objectStore.transaction.oncomplete = () => {
          const objectStore = idb
            .transaction(OBJECT_STORE_NAME, "readwrite")
            .objectStore(OBJECT_STORE_NAME);

          for (const [ref, property] of this.state) {
            objectStore.put(ref.value, property);
          }
        };
      };

      request.onsuccess = (event) => {
        const idb = (event.target as IDBOpenDBRequest).result;
        const objectStore = idb
          .transaction(OBJECT_STORE_NAME, "readonly")
          .objectStore(OBJECT_STORE_NAME);

        for (const [ref, property] of this.state) {
          objectStore.get(property).onsuccess = (event) => {
            const value: unknown = (event.target as IDBRequest).result;
            if (value !== undefined && typeof value === typeof ref.value) {
              ref.value = value as typeof ref.value;
              return;
            }
            this.put(ref.value, property);
          };
        }

        resolve(idb);
      };
    });
  }
}

const store = new Store();
await store.init();

export const state = store.state;
