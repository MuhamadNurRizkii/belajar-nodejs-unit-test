import { sumAll } from "../src/sum.js";

const table = [
  [[10, 10, 10], 30],
  [[10, 20, 30], 60],
  [[10, 30], 40],
];

const data = [
  [{ name: "Budi", address: "Jakarta" }, "Budi"],
  [{ name: "Andi", address: "Bandung" }, "Andi"],
];

const dataProduct = [
  { data: { name: "mangga", price: 10000 }, expected: 10000 },
  { data: { name: "apel", price: 15000 }, expected: 15000 },
  { data: { name: "semangka", price: 12000 }, expected: 12000 },
];

test.each(table)("sumAll(%s) should result %i", (numbers, expected) => {
  expect(sumAll(numbers)).toBe(expected);
});

test.each(data)("Berharap %s berisi nama %s", (data, expected) => {
  expect(data).toHaveProperty("name", expected);
});

test.only.each(dataProduct)(
  "Berharap data $data berisi harga $expected",
  ({ data, expected }) => {
    expect(data.price).toBe(expected);
  },
);
