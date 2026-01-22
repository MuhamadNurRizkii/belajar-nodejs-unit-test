import { sayHello } from "../src/sayHello.js";

test("sayHello success", () => {
  expect(sayHello("Rizki")).toBe("Hello, Rizki");
});

test.failing("sayHello error", () => {
  sayHello(null);
});
