import {
  createData,
  datas,
  deleteData,
  editData,
  getData,
  getDataById,
} from "../src/latihan.js";

describe("Tes function create data", () => {
  beforeEach(() => {
    datas.length = 0;
  });
  test("create data dengan data yang benar", () => {
    const result = createData(1, "mangga", 10000);
    expect(result).toBeDefined();
    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("message", "Data berhasil ditambahkan");
    expect(result).toHaveProperty("data", {
      id: 1,
      name: "mangga",
      price: 10000,
    });
  });

  test("create data dengan id = 0", () => {
    expect(createData(0, "jeruk", 10000)).toHaveProperty(
      "message",
      "Id tidak boleh dari nol",
    );
  });

  test("create data dengan id yang sudah ada", () => {
    createData(1, "pepaya", 15000);
    const result = createData(1, "apel", 15000);

    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("message", "Id sudah digunakan");
    expect(result).toHaveProperty("data", {});
  });

  test("create data dengan price < 0", () => {
    const result = createData(5, "nanas", -5000);

    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty(
      "message",
      "Harga tidak boleh kurang dari nol",
    );
  });

  test("create data dengan salah satu parameter kosong", () => {
    expect(createData(2, "apel", undefined)).toHaveProperty(
      "message",
      "Semua field wajib diisi",
    );
    expect(createData(2, undefined, 10000)).toHaveProperty(
      "message",
      "Semua field wajib diisi",
    );
    expect(createData(undefined, "apel", 10000)).toHaveProperty(
      "message",
      "Semua field wajib diisi",
    );
  });

  test("create data dengan tipe data yang salah", () => {
    expect(createData("1", "mangga", 1000)).toHaveProperty(
      "message",
      "Tipe data tidak valid",
    );
    expect(createData(1, "mangga", "10000")).toHaveProperty(
      "message",
      "Tipe data tidak valid",
    );
  });
});

describe("Tes function getData", () => {
  beforeEach(() => {
    datas.length = 0;
  });
  test("get data jika data masih kosong", () => {
    const result = getData();

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("message", "Data masih kosong");
    expect(result.data).toHaveLength(0);
  });

  test("get data dengan data yang sudah ditambahkan", () => {
    createData(1, "mangga", 10000);
    createData(2, "jeruk", 8000);
    const result = getData();

    expect(result.data).toHaveLength(2);
    expect(result.message).toBe("Data berhasil diambil");
    expect(result.success).toBe(true);
    expect(result.data).toContainEqual({ id: 2, name: "jeruk", price: 8000 });
  });
});

describe("Tes function getDataById", () => {
  beforeEach(() => {
    datas.length = 0;
  });

  test("tes jika data ditemukan", () => {
    createData(1, "mangga", 10000);
    createData(2, "pepaya", 8000);
    createData(3, "jeruk", 5000);
    createData(4, "apel", 15000);

    const result = getDataById(2);

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("message", "Data berhasil ditemukan");
    expect(result.data).toEqual({ id: 2, name: "pepaya", price: 8000 });
  });

  test("tes jika data tidak ditemukan", () => {
    const result = getDataById(5);

    expect(result).toHaveProperty("success", false);
    expect(result).toHaveProperty("message", "Data tidak ditemukan");
    expect(result.data).toBeNull();
  });
});

describe("Tes function editData", () => {
  beforeEach(() => {
    datas.length = 0;
  });

  test("tes edit data jika id ditemukan", () => {
    createData(1, "mangga", 10000);
    createData(2, "apel", 15000);
    createData(3, "nanaS", 8200);

    const result = editData(3, "nanas", 8000);

    expect(result.success).toBeTruthy();
    expect(result.message).toBe("Data berhasil diedit");
    expect(result.data).toEqual({ id: 3, name: "nanas", price: 8000 });
  });

  test("tes edit jika id tidak ditemukan", () => {
    const result = editData(9, "pepaya", 12000);

    expect(result.success).toBeFalsy();
    expect(result.message).toBe("Id tidak ditemukan");
  });

  test("tes edit jika harga < 0", () => {
    createData(9, "pepaya", 15000);
    const result = editData(9, "pepaya", -12000);

    expect(result.success).toBeFalsy();
    expect(result.message).toBe("Harga tidak boleh kurang dari nol");
  });

  test("tes edit jika tipe data harga == string", () => {
    createData(9, "pepaya", 15000);
    const result = editData(9, "pepaya", "12000");

    expect(result.success).toBeFalsy();
    expect(result.message).toBe("Tipe data harga tidak valid");
  });
});

describe("Tes function deleteData", () => {
  beforeEach(() => {
    datas.length = 0;
  });

  test("tes jika data masih kosong", () => {
    const result = deleteData(1);

    expect(result.success).toBeFalsy();
    expect(result.message).toBe("Data masih kosong");
  });

  test("tes jika data ditemukan", () => {
    createData(1, "mangga", 10000);
    createData(2, "pepaya", 12000);
    createData(3, "jeruk", 8000);
    createData(4, "nanas", 18000);
    createData(5, "kelapa", 15000);

    const result = deleteData(2);

    expect(result.success).toBeTruthy();
    expect(result.message).toBe("Data berhasil dihapus");
    expect(datas).not.toContainEqual({ id: 2, name: "pepaya", price: 12000 });
    expect(datas).toHaveLength(4);
  });

  test("test jika data id tidak ditemukan", () => {
    createData(1, "mangga", 10000);
    createData(2, "pepaya", 12000);
    createData(3, "jeruk", 8000);

    const result = deleteData(7);

    expect(result.success).toBeFalsy();
    expect(result.message).toBe("Id tidak ditemukan");
  });
});
