import React, { useEffect, useState, useCallback, useRef } from "react";
import Filters from "../filters-component/filters";

import "./products.scss";
import { useSelector, useDispatch } from "react-redux";
import { ProductsState } from "../../redux/types/search-types";
import { DateFilter } from "../../filters/date-filter";
import { RangeFilter } from "../../filters/range-filter";
import { FreeTextFilter } from "../../filters/free-text-filter";
import { WeShopState } from "../../redux/store";
import * as productsActions from "../../redux/actions/products-actions";
import { FilterClass } from "../../filters/filter";
import { addFilter } from "../../redux/action-types";
function Products() {
  const dispatch = useDispatch();
  const searchState = useSelector((state: WeShopState) => {
    return state.search;
  });
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    let query = {};
    Object.keys(searchState.filters).forEach((stateFilter) => {
      if (stateFilter === "page") {
        query = { ...query, page: searchState.filters.page };
      } else {
        const searchFilter = filters[stateFilter].parseToQuery();
        query = { ...query, ...searchFilter };
      }
    });
    dispatch(productsActions.search(query));
  }, [searchState.filters]);
  const [dateFilter] = useState(
    new DateFilter("date", {
      startDate: new Date(),
      endDate: new Date(),
    })
  );
  const [rangeFilter] = useState(
    new RangeFilter("price", { min: 0, max: 1000 })
  );
  const [kindFilter] = useState(new FreeTextFilter("kind", ""));
  const [nameFilter] = useState(new FreeTextFilter("productName", ""));
  const [filters] = useState({
    [dateFilter.filterName]: dateFilter,
    [rangeFilter.filterName]: rangeFilter,
    [kindFilter.filterName]: kindFilter,
    [nameFilter.filterName]: nameFilter,
  });
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (!searchState.loaded) {
        return;
      }
      if (observer.current) {
        // @ts-ignore: Object is possibly 'null'.
        observer.current.disconnect();
      }
      // @ts-ignore: Object is possibly 'null'.
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(
            productsActions.addFilterAction(
              "page",
              searchState.filters.page + 1
            )
          );
        }
      });
      // @ts-ignore: Object is possibly 'null'.
      if (node) observer?.current?.observe(node);
    },
    [searchState.loaded, hasMore]
  );
  return (
    <div className="products-container">
      <div className="products">
        <span>Products</span>
        {searchState.products &&
          searchState.products.map((product: any, index: number) => {
            if (searchState.products.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={product}>
                  {product}
                </div>
              );
            } else {
              return <div key={product}>{product}</div>;
            }
          })}
        <div>{!searchState.loaded && "Loading..."}</div>
        {/* <div>{error && 'Error'}</div> */}
      </div>
      <div className="filters">
        <Filters filters={Object.values(filters)}></Filters>
        <div></div>
      </div>
    </div>
  );
}
export default Products;
