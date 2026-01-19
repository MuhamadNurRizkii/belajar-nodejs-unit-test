export const datas = [];

export const createData = (id, name, price) => {
  const data = datas.find((data) => data.id === id);

  if (data) {
    return {
      success: false,
      message: "Id sudah digunakan",
      data: {},
    };
  }

  if (id === 0) {
    return {
      success: false,
      message: "Id tidak boleh dari nol",
    };
  } else if (!id || !name || !price) {
    return {
      success: false,
      message: "Semua field wajib diisi",
    };
  } else if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    typeof price !== "number"
  ) {
    return {
      success: false,
      message: "Tipe data tidak valid",
    };
  } else if (price < 0) {
    return {
      success: false,
      message: "Harga tidak boleh kurang dari nol",
    };
  }

  const newData = { id, name, price };

  datas.push(newData);

  return { success: true, message: "Data berhasil ditambahkan", data: newData };
};

export const getData = () => {
  if (datas.length === 0) {
    return {
      success: true,
      message: "Data masih kosong",
      data: [],
    };
  }

  const result = datas.map((data) => ({
    id: data.id,
    name: data.name,
    price: data.price,
  }));

  return {
    success: true,
    message: "Data berhasil diambil",
    data: result,
  };
};

export const getDataById = (id) => {
  const data = datas.find((data) => data.id === id);

  if (!data) {
    return {
      success: false,
      message: "Data tidak ditemukan",
      data: null,
    };
  }

  return {
    success: true,
    message: "Data berhasil ditemukan",
    data: data,
  };
};

export const editData = (id, name, price) => {
  const data = datas.find((data) => data.id === id);

  if (!data) {
    return {
      success: false,
      message: "Id tidak ditemukan",
    };
  }

  if (price < 0) {
    return {
      success: false,
      message: "Harga tidak boleh kurang dari nol",
    };
  }

  if (typeof price !== "number") {
    return {
      success: false,
      message: "Tipe data harga tidak valid",
    };
  }

  data.name = name || data.name;
  data.price = price || data.price;

  return {
    success: true,
    message: "Data berhasil diedit",
    data: data,
  };
};

export const deleteData = (id) => {
  if (datas.length === 0) {
    return {
      success: false,
      message: "Data masih kosong",
    };
  }

  const index = datas.findIndex((data) => data.id === id);

  if (!datas[index]) {
    return {
      success: false,
      message: "Id tidak ditemukan",
    };
  }

  datas.splice(index, 1);

  return {
    success: true,
    message: "Data berhasil dihapus",
  };
};
