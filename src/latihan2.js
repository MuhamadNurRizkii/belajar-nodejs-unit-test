export const datas = [];

export const createData = async (id, name, price) => {
  const data = datas.find((data) => data.id === id);

  if (data) {
    throw new Error("Id sudah digunakan");
  }

  if (!id || !name || !price) {
    throw new Error("Semua field wajib diisi");
  }

  if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    typeof price !== "number"
  ) {
    throw new Error("Tipe data tidak valid");
  }

  if (price < 0) {
    throw new Error("Harga tidak boleh kurang dari nol");
  }

  const newData = { id, name, price };
  datas.push(newData);

  return {
    success: true,
    message: "Data baru berhasil ditambahkan",
    data: newData,
  };
};

export const getData = async () => {
  if (datas.length === 0) {
    return {
      success: true,
      message: "Data masih kosong",
      data: datas,
    };
  }

  return {
    success: true,
    message: "Data berhasil diambil",
    data: datas,
  };
};

export const editDataById = async (id, name, price) => {
  if (typeof id !== "number") {
    throw new Error("Tipe data tidak valid");
  }

  if (price < 0) {
    throw new Error("Harga tidak boleh kurang dari nol");
  }

  if (price === 0) {
    throw new Error("Harga tidak boleh nol");
  }

  const data = datas.find((data) => data.id === id);

  if (!data) {
    throw new Error("Id tidak ditemukan");
  }

  data.name = name || data.name;
  data.price = price || data.price;

  return {
    success: true,
    message: "Data berhasil diedit",
    data: data,
  };
};
