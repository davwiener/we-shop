import React, { useEffect, useState } from "react";
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
function Products() {
  const dispatch = useDispatch();
  const stateFilters = useSelector((state: WeShopState) => {
    return state.search.filters;
  });
  useEffect(() => {
    let query = {};
    Object.keys(stateFilters).forEach((stateFilter) => {
      const searchFilter = filters[stateFilter].parseToQuery();
      query = { ...query, ...searchFilter };
    });
    dispatch(productsActions.search(query));
  }, [stateFilters]);
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
  const filtersMap = {};
  const products = useSelector((state: ProductsState) => {
    return state.products;
  });
  return (
    <div className="products-container">
      <div className="products">
        <span>Products</span>
      </div>
      <div className="filters">
        <Filters filters={Object.values(filters)}></Filters>
        <div></div>
      </div>
    </div>
  );
}
export default Products;
