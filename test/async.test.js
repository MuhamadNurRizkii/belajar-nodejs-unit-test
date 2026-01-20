import { sayHelloAsync } from "../src/async.js";
import { getUserAsync } from "../src/math.js";

test("test async function", async () => {
  await expect(sayHelloAsync("rizzki")).resolves.toBe("Hello rizzki");
  await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});

test("test function getUserAsync", async () => {
  const result = await getUserAsync();

  expect(result).not.toBeNull();
  expect(result).toEqual({ name: "Andi", age: 30, address: "Surabaya" });
});
