import { Fragment } from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../../component/category-preview/category-preview.component";
import {
  selectIsLoading,
  selectCategoriesMap,
} from "../../store/categories/category.selector";
import Spinner from "../../component/spinner/spinner.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
