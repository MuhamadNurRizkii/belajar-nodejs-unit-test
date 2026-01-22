import { getAllProducts, getProductById } from "../src/database";
import { ProductService } from "../src/product-services.js";

jest.mock("../src/database.js", () => {
  return {
    __esModule: true,
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
  };
});

test("mock modules getProductById", () => {
  getProductById.mockImplementation((id) => {
    return {
      id: id,
      name: "Product1",
    };
  });

  const product = ProductService.findById(1);

  expect(product).toEqual({ id: 1, name: "Product1" });
});

test("mock modules getAllProducts", () => {
  getAllProducts.mockImplementation(() => {
    return [
      {
        id: 1,
        name: "Product 1",
      },
      {
        id: 2,
        name: "Product 2",
      },
    ];
  });

  expect(ProductService.findAll()).toContainEqual({ id: 1, name: "Product 1" });
  expect(ProductService.findAll()).toHaveLength(2);
});
