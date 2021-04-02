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
    return this.localStorage.getItem(key);
  }

  removeItem(key: string) {
    this.localStorage.removeItem(key);
  }

  setJSONItem(key: string, value: any) { {
    const updateValue = JSON.stringify(value);
    this.localStorage.setItem(key, updateValue);
  }

  getJSONItem(key: string): any {
    let returnValue = {} as any;
    try {
      returnValue = JSON.parse(this.localStorage.getItem(key));
    } catch (e) {
      // do nothing
    }
    return returnValue;
  }
}

const localStorage = new LocalStorageClass();
export default localStorage;
