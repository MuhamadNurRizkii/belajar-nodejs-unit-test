const tambah = (a, b) => {
  return a + b;
};

const kali = (a, b) => {
  return a * b;
};

const getUser = () => {
  return {
    id: 1,
    name: "Andi",
    age: 20,
    address: "Bandung",
  };
};

export const getUserAsync = async () => {
  return {
    name: "Andi",
    age: 30,
    address: "Surabaya",
  };
};

export const totalPrice = (price, qty) => {
  return price * qty;
};

export { tambah, getUser, kali };
