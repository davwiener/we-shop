import React, { useEffect, useLayoutEffect, useState } from "react";
import Filters from "../FiltersComponent/Filters";
import queryString from "query-string";
import "./Auctions.scss";
import { useSelector, useDispatch } from "react-redux";
import { DateFilter } from "../../filters/dateFilter";
import { RangeFilter } from "../../filters/RangeFilter";
import { FreeTextFilter } from "../../filters/freeRextFilter";
import { WeShopState } from "../../redux/store";
import { QueryType } from "../../redux/types/search-types";
import * as auctionsActions from "../../redux/actions/auctions";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuctionType } from "../../redux/types/search-types";
import Auction from "../CommonComponents/Auction/Auction";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
function Auctions(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentQuery, setCurrentQuery]: [any, any] = useState({});
  const searchState = useSelector((state: WeShopState) => {
    //
    return state.auctions;
  });
  // const query = queryString.parse(props.location.search);
  // if (_.isEmpty(currentQuery)) {
  //   debugger;
  //   history.push("?page:1,rbp:25");
  // }
  useEffect(() => {
    debugger;
    const query = queryString.parse(props.location.search);
    if (_.isEmpty(query)) {
      debugger;
      history.push("?page=1&rbp=25");
    }
    if (_.isEqual(currentQuery, query)) {
      return;
    }
    if (!_.isEmpty(query)) {
      setCurrentQuery(query);
      dispatch(auctionsActions.searchAuction(query as QueryType));
    }
  }, [props.location, dispatch, currentQuery, history]);
  useLayoutEffect(() => {
    debugger;
    if (!searchState.loaded) {
      return;
    }
    history.push(`?${queryString.stringify(searchState.query)}`);
  }, [searchState, history]);

  const value = queryString.parse(props.location.search);
  const token = value.token;
  console.log("token", token);
  const dateFilter = new DateFilter("date", {
    startDate: new Date(),
    endDate: new Date(),
  });
  const rangeFilter = new RangeFilter("price", { min: 0, max: 1000 });
  const kindFilter = new FreeTextFilter("model", "");
  const nameFilter = new FreeTextFilter("name", "");
  const filters = {
    [dateFilter.filterName]: dateFilter,
    [rangeFilter.filterName]: rangeFilter,
    [kindFilter.filterName]: kindFilter,
    [nameFilter.filterName]: nameFilter,
  };
  const fetchMoreData = () => {
    dispatch(
      auctionsActions.updateSearchQuery({
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
