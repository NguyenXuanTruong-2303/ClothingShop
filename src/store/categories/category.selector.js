import { createSelector } from "reselect";

//Hàm selectCategoryReducer là một selector đơn giản lấy ra 
//slice categories từ state của Redux. Selector này sẽ được sử dụng làm input cho các selector khác.
const selectCategoryReducer = (state) => state.categories;


// hàm được truyền vào createSelector nhận vào categoriesSlice (là kết quả của selectCategoryReducer)
// và trả về categoriesSlice.categories, tức là lấy ra mảng categories từ slice categories.
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);


// Tương tự như trên
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// Tóm lại:
// Đoạn code tạo ra 3 selector:
// selectCategoryReducer: Lấy ra slice categories từ state.
// selectCategories: Lấy ra danh sách categories từ slice categories.
// selectCategoriesMap: Tạo một map từ danh sách categories, với key là title (chữ thường) và value là danh sách items.
// Sử dụng createSelector để memoize các selector, giúp tối ưu hiệu suất.

// Tại sao cần tối ưu hóa đoạn code này:
// Tránh tính toán lại không cần thiết: Nếu không sử dụng createSelector, mỗi lần component render, các hàm selectCategories 
// và selectCategoriesMap sẽ được gọi lại và thực hiện các phép tính, kể cả khi dữ liệu đầu vào không thay đổi. Điều này làm 
// giảm hiệu suất ứng dụng.
// Cải thiện khả năng đọc code: Việc tách các logic tính toán ra các selector riêng biệt giúp code dễ đọc, dễ bảo trì hơn.