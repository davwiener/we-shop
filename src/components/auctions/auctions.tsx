import React, { useEffect, useLayoutEffect, useState } from "react";

import queryString from "query-string";
import "./Auctions.scss";
import { useSelector, useDispatch } from "react-redux";
import { WeShopState } from "../../redux/store";
import { QueryType } from "../../redux/types/search-types";
import * as auctionsActions from "../../redux/actions/auctions";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuctionType } from "../../redux/types/search-types";
import Auction from "../CommonComponents/Auction/Auction";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
import { AuctionFilters } from "./AuctionsFilters/AuctionFilters";
function Auctions(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentQuery, setCurrentQuery]: [any, any] = useState({});
  const searchState = useSelector((state: WeShopState) => {
    //
    return state.auctions;
  });
  useEffect(() => {
    const query = queryString.parse(props.location.search);
    if (_.isEmpty(query)) {
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
    if (!searchState.loaded) {
      return;
    }
    history.push(`?${queryString.stringify(searchState.query)}`);
  }, [searchState, history]);

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
                <Auction
                  auction={auc}
                  key={`auctions-page-auction-${auc.id}`}
                  id={"auctions-page"}
                ></Auction>
              ))}
            </InfiniteScroll>
          </div>
        )}
      </div>
      <div className="auctions-filters">
        <AuctionFilters
          filtersStateValues={searchState.filters}
        ></AuctionFilters>
      </div>
    </div>
  );
}
export default Auctions;
