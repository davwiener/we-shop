import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};
function Products() {
  const dispatch = useDispatch();
  const searchState = useSelector((state: WeShopState) => {
    //
    return state.search;
  });

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
  const fetchMoreData = () => {
    dispatch(
      productsActions.addFilterAction("page", searchState.filters.page + 1)
    );
  };
  return (
    <div className="products-container">
      <div className="products">
        <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={searchState.products.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {searchState.products.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <div className="filters">
          <Filters filters={Object.values(filters)}></Filters>
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default Products;
