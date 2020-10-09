import React, { useEffect, useState } from "react";
import Filters from "../filters-component/filters";

import "./auctions.scss";
import { useSelector, useDispatch } from "react-redux";
import { DateFilter } from "../../filters/date-filter";
import { RangeFilter } from "../../filters/range-filter";
import { FreeTextFilter } from "../../filters/free-text-filter";
import { WeShopState } from "../../redux/store";
import { QueryType } from "../../redux/types/search-types";
import * as auctionsActions from "../../redux/actions/auctions-actions";
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
    let query: QueryType = { page: 1 };
    dispatch(auctionsActions.addFilterAndSearchAction(query));
  }, []);
  const [dateFilter] = useState(
    new DateFilter("date", {
      startDate: new Date(),
      endDate: new Date(),
    })
  );
  const [rangeFilter] = useState(
    new RangeFilter("price", { min: 0, max: 1000 })
  );
  const [kindFilter] = useState(new FreeTextFilter("model", ""));
  const [nameFilter] = useState(new FreeTextFilter("name", ""));
  const [filters] = useState({
    [dateFilter.filterName]: dateFilter,
    [rangeFilter.filterName]: rangeFilter,
    [kindFilter.filterName]: kindFilter,
    [nameFilter.filterName]: nameFilter,
  });
  const fetchMoreData = () => {
    dispatch(
      auctionsActions.addFilterAndSearchAction({
        page: searchState.filters.page + 1,
      })
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
              hasMore={searchState.hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {searchState.auctions.map((auc: AuctionType) => (
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
