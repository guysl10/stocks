interface ISessionStorage {
  setItem: (key: string, value: string)=> void,
  getItem: (key: string)=> string,
  removeItem: (key: string)=> void,
}

class Cache {
  sessionStorage: ISessionStorage;

  constructor() {
    try {
      // eslint-disable-next-line no-undef
      this.sessionStorage = window.sessionStorage;
    } catch (e) {
      // this.sessionStorage = {};
    }
  }

  setItem(key: string, value: string) {
    this.sessionStorage.setItem(key, value);
  }

  getItem(key: string) {
    this.sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    this.sessionStorage.removeItem(key);
  }

  setJSONItem({ key, value }: {key: string, value: object}) {
    const updateValue = JSON.stringify(value);
    this.sessionStorage.setItem(key, updateValue);
  }

  getJSONItem(key: string) {
    let returnValue = {};
    try {
      returnValue = JSON.parse(this.sessionStorage.getItem(key));
    } catch (e) {
      // do nothing
    }
    return returnValue;
  }
}

const cache = new Cache();

export default cache;
