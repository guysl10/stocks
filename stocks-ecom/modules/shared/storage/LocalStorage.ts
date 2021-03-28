interface ILocalStorage {
  setItem: (key: string, value: string)=> void,
  getItem: (key: string)=> string,
  removeItem: (key: string)=> void,
}

class LocalStorageClass {
  localStorage: ILocalStorage;

  constructor() {
    try {
      // eslint-disable-next-line no-undef
      this.localStorage = window.localStorage;
    } catch (e) {
      // this.localStorage = {};
    }
  }

  setItem(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  getItem(key: string) {
    this.localStorage.getItem(key);
  }

  removeItem(key: string) {
    this.localStorage.removeItem(key);
  }

  setJSONItem({ key, value }: {key: string, value: object}) {
    const updateValue = JSON.stringify(value);
    this.localStorage.setItem(key, updateValue);
  }

  getJSONItem(key: string) {
    let returnValue = {};
    try {
      returnValue = JSON.parse(this.localStorage.getItem(key));
    } catch (e) {
      // do nothing
    }
    return returnValue;
  }
}

const LocalStorage = new LocalStorageClass();
export default LocalStorage;
