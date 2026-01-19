test("String", () => {
  const name = "Muhamad Nur Rizki";

  expect(name).toBe("Muhamad Nur Rizki");
  expect(name).toEqual("Muhamad Nur Rizki");
  expect(name).toMatch(/Riz/);
});
