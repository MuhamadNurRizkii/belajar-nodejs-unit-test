import { getUser, kali, tambah } from "../src/math";

test("test function tambah", () => {
  const result = tambah(10, 2);

  expect(result).toBe(12);
});

test("test function kali", () => {
  const result = kali(10, 5);

  expect(result).toBe(50);
});

test("test function getUser", () => {
  expect(getUser()).toEqual({
    id: 1,
    name: "Andi",
    age: 20,
    address: "Bandung",
  });
  expect(getUser()).toBeTruthy();
  expect(getUser()).toBeDefined();
});
