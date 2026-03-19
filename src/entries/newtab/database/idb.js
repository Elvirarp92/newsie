const DB_NAME = 'newsie'
const DB_VERSION = 1
let DB

export default {
  getDb() {
    return new Promise((resolve, reject) => {
      if(DB) { return resolve(DB) }

      const DBOpenRequest = window.indexedDB.open(DB_NAME, DB_VERSION)

      DBOpenRequest.onerror = (event) => {
        console.error(`Database error: ${event.target.error?.message}`);
        reject(`Database error: ${event.target.error?.message}`)
      };
      
      DBOpenRequest.onupgradeneeded = event => {
        const newDB = event.target.result
      
        /* 
          using URL as key paths as they're guaranteed to be unique -- you don't want duplicates 
          of the same feed, do you?
        */
        const objectStore = newDB.createObjectStore('feeds', { keyPath: 'url' })
      
        // Indices for search
        objectStore.createIndex('title', 'title', { unique: false })
      }
      
      DBOpenRequest.onsuccess = event => {
        DB = event.target.result
        resolve(DB)
      }
    })
  },

  async createFeed(feed) {
    // making sure everything is initialized before we go doing CRUD operations
    const db = await this.getDb()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['feeds'], 'readwrite')

      transaction.oncomplete = () => {
        resolve()
      }

      transaction.onerror = error => {
        reject(error)
      }

      const objectStore = transaction.objectStore('feeds')
      objectStore.add(feed)
    })
  },

  async readFeeds() {
    // making sure everything is initialized before we go doing CRUD operations
    const db = await this.getDb()

    return new Promise((resolve, reject) => {
      const feeds = []
      const transaction = db.transaction(['feeds'], 'readonly')

      transaction.oncomplete = () => {
        resolve(feeds)
      }

      transaction.onerror = error => {
        reject(error)
      }

      const objectStore = transaction.objectStore('feeds')
      objectStore.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					feeds.push(cursor.value)
					cursor.continue();
				}
			};
    })
  },

  async deleteFeed(feed) {
    // making sure everything is initialized before we go doing CRUD operations
    const db = await this.getDb()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['feeds'], 'readwrite')

      transaction.oncomplete = () => {
        resolve()
      }

      transaction.onerror = error => {
        reject(error)
      }

      const store = transaction.objectStore('feeds')
      store.delete(feed.url)
    })
  }
}