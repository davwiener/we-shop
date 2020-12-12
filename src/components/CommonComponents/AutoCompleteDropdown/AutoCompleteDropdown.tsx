import React, { useState } from "react";
import { MenuItem, Input } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import "./AutoCompleteDropdown.scss"
const AutoCompleteDropDown = (props: {
    children: any,
    hasMore: boolean
    options: any[],
    fetchMoreData: (page: number, searchWord: string) => void,
    onChange: (name: string, id: number) => void
}) => {
    const [page, setPage] = useState(1);
    const [searchWord, setSearchWord] = useState('');
    const fetchMoreData = () => {
        props.fetchMoreData(page, searchWord)
    };
    debugger;
    return (
        <div id="scrollableDivcc" className="content">
            <div>
                <Input
                    autoFocus
                    type="text"
                    value={searchWord}
                    onChange={(e) => {
                        setSearchWord(e.target.value)
                        if (e.target.value.length > 1) {
                            setPage(1)
                            return fetchMoreData()
                        }
                    }}
                />
            </div>
            <InfiniteScroll
                className="infinite-scroll"
                dataLength={props.options.length}
                next={() => {
                    setPage(page + 1);
                    return fetchMoreData()
                }}
                hasMore={props.hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableDivcc"
            > {props.options.map((option: { name: string, id: number }, index: number) => (
                <MenuItem
                    key={index}
                    value={option.id}
                    onClick={() => props.onChange(option.name, option.id)}
                >
                    {option.name}
                </MenuItem>
            ))}
            </InfiniteScroll>
        </div>
    )
}

export default AutoCompleteDropDown