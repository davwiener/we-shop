import React, { useEffect, useState } from "react";
import Filters from "../filters-component/filters";
import queryString from "query-string";
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
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
function Auctions(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentQuery, setCurrentQuery] = useState({});
  const searchState = useSelector((state: WeShopState) => {
    //
    return state.search;
  });
  useEffect(() => {
    const query = queryString.parse(props.location.search);
    if (_.isEmpty(query) || _.isEqual(currentQuery, query)) {
      history.push(`Auctionss/?${queryString.stringify(searchState.query)}`);
    } else {
      dispatch(auctionsActions.updateSearchQuery(query as QueryType));
    }
  }, [searchState.query]);
  useEffect(() => {
    const query = queryString.parse(props.location.search);
    if (!_.isEmpty(query)) {
      setCurrentQuery(query);
      const page = Number(query.page);
      const newSearch = page === 1 || page === searchState.filters.page;
      dispatch(auctionsActions.searchAuction(query, newSearch));
    }
  }, [props.location]);
  const value = queryString.parse(props.location.search);
  const token = value.token;
  console.log("token", token);
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
