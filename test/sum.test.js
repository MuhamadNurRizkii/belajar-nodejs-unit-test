import { sum } from "../src/sum";

test("Tes sum function", () => {
  const result = sum(1, 2);

  expect(result).toBe(3);
});

test("Tes sum function 1 di tambah dengan string", () => {
  const result = sum(1, "2");

  expect(result).toBe("12");
});
