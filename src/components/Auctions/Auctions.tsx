import React, { useEffect, useLayoutEffect, useState } from "react";
import queryString from "query-string";
import "./Auctions.scss";
import { useSelector, useDispatch } from "react-redux";
import { WeShopState } from "../../redux/store";
import { QueryType } from "../../redux/types/search-types";
import * as auctionsActions from "../../redux/actions/auctions";
import { AuctionType } from "../../redux/types/search-types";
import { useHistory } from "react-router-dom";
import * as _ from "lodash";
import AuctionCard from "./AuctionCard/AuctionCard";
import SidePanel from "../CommonComponents/SidePanel/SidePanel";
import AuctionCardImage from "./AuctionCard/AuctionCardImage";
import AuctionCardSummary from "./AuctionCard/AuctionCardSummary";
import { Divider } from "@material-ui/core";
import { AuctionFilters } from "./AuctionsFilters/AuctionFilters";

const Auctions = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentQuery, setCurrentQuery]: [any, any] = useState({});
  const searchState = useSelector((state: WeShopState) => {
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
    <div className="pageWrapper">
      <SidePanel>
        <div>Filters Panel</div>
      </SidePanel>
      {searchState.auctions && searchState.auctions.length && (
        <div className="content">
          {searchState.auctions.map((auc: AuctionType, index) => (
            <AuctionCard className="cardContent" key={index}>
              <AuctionCardImage
                url="https://i1.wp.com/www.shoorayner.com/wp-images/uploads/2017/02/scooter-1.jpg?resize=227%2C220"
                className="image"
              />
              <Divider />
              <AuctionCardSummary data={auc} className="description" />
            </AuctionCard>
          ))}
        </div>
      )}
    </div>
  );
};
export default Auctions;

/**
 * <div className="auctions-container">
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
 */
