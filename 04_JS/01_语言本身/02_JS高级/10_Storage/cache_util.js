class CacheUtil {
  #storage;

  constructor(isLocal = true) {
    this.#storage = isLocal ? localStorage : sessionStorage;
  }

  setCache(key, value) {
    if (typeof key !== "string") {
      throw new Error("key必须是string类型");
    }

    if (value === undefined || value === null) {
      throw new Error("value不能为undefined或null");
    }

    this.#storage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    if (typeof key !== "string") {
      throw new Error("key必须是string类型");
    }

    return JSON.parse(this.#storage.getItem(key));
  }

  removeCache(key) {
    if (typeof key !== "string") {
      throw new Error("key必须是string类型");
    }

    return this.#storage.removeItem(key);
  }

  clearCache() {
    this.#storage.clear();
  }
}

const localCache = new CacheUtil(true);
const sessionCache = new CacheUtil(false);