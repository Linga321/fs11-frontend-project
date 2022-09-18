import {
  addCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "../redux/reducers/categoryReducer";
import createTestStore from "./store";
import { category, editCategory } from "./utils/categoryTestData";

let store = createTestStore();

describe("test category reducer", () => {
  test("add category to store", async () => {
    store.dispatch(addCategory(category));
    expect(store.getState().categoryReducer.categoryList).toBeDefined();
  });
  test("update category in store", async () => {
    store.dispatch(updateCategory(editCategory));
    const updateCategoryResult = store
      .getState()
      .categoryReducer.categoryList.find(
        (categoryList) => categoryList.name === editCategory.name
      );
    expect(updateCategoryResult).toBeDefined();
  });
  test("delete category in store", async () => {
    store.dispatch(deleteCategory({ id: category.id }));
    const deletedCategoryResult = store
      .getState()
      .categoryReducer.categoryList.find(
        (categoryList) => categoryList.name === editCategory.name
      );
    expect(deletedCategoryResult).toBeUndefined();
  });
  test("Call API to fetch category", async () => {
    await store.dispatch(fetchCategory());
    const fetchCategoryResult = store.getState().categoryReducer.categoryList;
    expect(fetchCategoryResult.length).toBeGreaterThan(1);
  });
});
