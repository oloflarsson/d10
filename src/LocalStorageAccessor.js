class LocalStorageAccessor {
  constructor(key, initialValue) {
    this.key = key;
    this.initialValue = JSON.stringify(initialValue);
  }

  getInitial() {
    return JSON.parse(this.initialValue);
  }

  get() {
    const json = window.localStorage.getItem(this.key);
    if (json === null || json === undefined) {
      return this.getInitial();
    }
    try {
      return JSON.parse(json);
    } catch (error) {
      return this.getInitial();
    }
  }

  set(value) {
    const json = JSON.stringify(value)
    return window.localStorage.setItem(this.key, json);
  }
}

export default LocalStorageAccessor;
