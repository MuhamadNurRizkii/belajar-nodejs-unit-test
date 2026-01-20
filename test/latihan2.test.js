import { createData, datas, editDataById, getData } from "../src/latihan2";

describe("Tes function createData", () => {
  beforeEach(() => {
    datas.length = 0;
  });
  test("Tes ketika semua data benar", async () => {
    const result = await createData(1, "mangga", 10000);

    expect(result.success).toBeTruthy();
    expect(result.message).toBe("Data baru berhasil ditambahkan");
    expect(result.data).toEqual({ id: 1, name: "mangga", price: 10000 });
    expect(datas).toHaveLength(1);
  });

  test("Tes ketika id sudah digunakan", async () => {
    await createData(1, "pisang", 12000);

    await expect(createData(1, "apel", 18000)).rejects.toThrow(
      "Id sudah digunakan",
    );

    expect(datas).toHaveLength(1);
  });

  test("Tes ketika tipe data salah", async () => {
    await expect(createData("1", "pisang", 12000)).rejects.toThrow(
      "Tipe data tidak valid",
    );
    await expect(createData(2, "apel", "18000")).rejects.toThrow(
      "Tipe data tidak valid",
    );

    expect(datas).toHaveLength(0);
  });

  test("Tes ketika id tidak ada", async () => {
    await expect(createData(undefined, "apel", 18000)).rejects.toThrow(
      "Semua field wajib diisi",
    );
    expect(datas).toHaveLength(0);
  });

  test("Tes ketika name tidak ada", async () => {
    await expect(createData(2, undefined, 18000)).rejects.toThrow(
      "Semua field wajib diisi",
    );
    expect(datas).toHaveLength(0);
  });

  test("Tes ketika price tidak ada", async () => {
    await expect(createData(2, "apel", undefined)).rejects.toThrow(
      "Semua field wajib diisi",
    );
    expect(datas).toHaveLength(0);
  });

  test("Tes ketikan input price = 0", async () => {
    await expect(createData(2, "nanas", -12000)).rejects.toThrow(
      "Harga tidak boleh kurang dari nol",
    );
  });
});

describe("Tes function getData", () => {
  beforeEach(() => {
    datas.length = 0;
  });

  test("Tes ketika data sudah ada", async () => {
    await createData(1, "mangga", 10000);
    await createData(2, "apel", 15000);
    await createData(3, "nanas", 12000);

    const result = await getData();

    expect(result.success).toBe(true);
    expect(result.message).toBe("Data berhasil diambil");
    expect(result.data).toContainEqual({ id: 2, name: "apel", price: 15000 });
    expect(datas).toHaveLength(3);
    expect(result.data).toHaveLength(3);
  });

  test("Tes ketika data masih kosong", async () => {
    const result = await getData();

    expect(result.success).toBe(true);
    expect(result.message).toBe("Data masih kosong");
    expect(result.data).toHaveLength(0);
    expect(datas).toHaveLength(0);
  });
});

describe("Tes function editDataById", () => {
  beforeEach(() => {
    datas.length = 0;
  });

  test("Tes ketika data berhasil diupdate", async () => {
    await createData(1, "apel", 15000);
    await createData(2, "mangga", 10000);
    await createData(3, "nanas", 9200);

    const result = await editDataById(3, undefined, 10000);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Data berhasil diedit");
    expect(result.data).toEqual({ id: 3, name: "nanas", price: 10000 });

    expect(datas).toContainEqual({ id: 3, name: "nanas", price: 10000 });
  });

  test("Tes ketika id tidak ada", async () => {
    await createData(1, "apel", 15000);
    await createData(2, "mangga", 10000);
    await createData(3, "nanas", 9200);

    await expect(editDataById(5, "pepaya", 18000)).rejects.toThrow(
      "Id tidak ditemukan",
    );
    expect(datas).not.toContainEqual({ id: 5, name: "pepaya", price: 10000 });
  });

  test("Tes ketika tipe data id !== number", async () => {
    await createData(1, "apel", 15000);
    await createData(2, "mangga", 10000);
    await createData(3, "nanas", 9200);

    await expect(editDataById("1", "apel", 20000)).rejects.toThrow(
      "Tipe data tidak valid",
    );
  });

  test("Tes ketika harga < 0", async () => {
    await createData(1, "apel", 15000);
    await createData(2, "mangga", 10000);
    await createData(3, "nanas", 9200);

    await expect(editDataById(2, "manggga", -5000)).rejects.toThrow(
      "Harga tidak boleh kurang dari nol",
    );
  });

  test("Tes ketika harga === 0", async () => {
    await createData(1, "apel", 15000);
    await createData(2, "mangga", 10000);
    await createData(3, "nanas", 9200);

    await expect(editDataById(3, "nanas", 0)).rejects.toThrow(
      "Harga tidak boleh nol",
    );
  });
});
