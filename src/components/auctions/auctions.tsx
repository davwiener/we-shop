import React, { useEffect, useState } from "react";
import Filters from "../filters-component/filters";

import "./auctions.scss";
import { useSelector, useDispatch } from "react-redux";
import { DateFilter } from "../../filters/date-filter";
import { RangeFilter } from "../../filters/range-filter";
import { FreeTextFilter } from "../../filters/free-text-filter";
import { WeShopState } from "../../redux/store";
import * as productsActions from "../../redux/actions/products-actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuctionType } from "../../redux/types/search-types";
import Auction from "../common-components/auction/auction";
function Auctions() {
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
    <div className="auctions-container">
      <div className="auctions">
        {searchState.auctions && searchState.auctions.length && (
          <div id="scrollableDiv" className="infinite-scroll-container">
            <InfiniteScroll
              className="infinite-scroll"
              dataLength={searchState.auctions.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {searchState.auctions[0].map((auc: AuctionType) => (
                <Auction auction={auc} id={"auctions-page"}></Auction>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
      <div className="filters">
        <Filters filters={Object.values(filters)}></Filters>
        <div></div>
      </div>
    </div>
  );
}
export default Auctions;
