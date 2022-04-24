export const localStorageSet = (name, data, expire = new Date().setDate(new Date().getDate() + 1)) => {
    const obj = {
      data,
      expire
    };
    localStorage.setItem(name, JSON.stringify(obj));
  };
  
  //读取缓存
export const localStorageGet = name => {
    const storage = localStorage.getItem(name);
    const time = new Date().getTime();
  
    let result = {};
    if (storage) {
      const obj = JSON.parse(storage);
      if (time < obj.expire) {
        result = obj.data;
      } else {
        localStorage.removeItem(name);
      }
    }
    return result;
  };
