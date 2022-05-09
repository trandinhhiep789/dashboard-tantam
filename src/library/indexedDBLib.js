/*
https://www.npmjs.com/package/idb
*/
import idb from 'idb'
export default class indexedDBLib {
  constructor(objectStorName) {
    //  console.log("indexedDBLib:",objectStorName);
    this.objectStorName = objectStorName
    this.dbPromise = idb.open(objectStorName, 1, upgradeDB => {
      // console.log("upgradeDB: ", objectStorName);
      upgradeDB.createObjectStore(objectStorName)
    })
  }
  get(key) {
    return this.dbPromise.then(db => {
      return db.transaction(this.objectStorName).objectStore(this.objectStorName).get(key)
    })
  }

  set(key, val) {
    return this.dbPromise.then(db => {
      const tx = db.transaction(this.objectStorName, 'readwrite')
      tx.objectStore(this.objectStorName).put(val, key)
      return tx.complete
    })
  }
  delete(key) {
    return this.dbPromise.then(db => {
      const tx = db.transaction(this.objectStorName, 'readwrite')
      tx.objectStore(this.objectStorName).delete(key)
      return tx.complete
    })
  }
  clear() {
    return this.dbPromise.then(db => {
      const tx = db.transaction(this.objectStorName, 'readwrite')
      tx.objectStore('keyval').clear()
      return tx.complete
    })
  }
  getAllKeys() {
    return this.dbPromise.then(db => {
      const tx = db.transaction(this.objectStorName)
      const keys = []
      const store = tx.objectStore(this.objectStorName)

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      ;(store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return
        keys.push(cursor.key)
        cursor.continue()
      })

      return tx.complete.then(() => keys)
    })
  }

  getAllData() {
    return this.getAllKeys().then(arrKey => {
      let arrData = []
      arrKey.map(item => {
        this.get(item).then(result => {
          arrData.push({ key: item, value: result })
        })
      })
      return arrData
    })
  }
}
