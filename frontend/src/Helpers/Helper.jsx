const setLocStorageItem = (name, value) => {
    localStorage.setItem(name, value);
};

const getLocStorageItem = (name) => {
    return localStorage.getItem(name);
};

const getPriceAfterDiscount = (price, discount) => {
    return price - (price * discount) / 100;
};
export { setLocStorageItem, getLocStorageItem, getPriceAfterDiscount };
