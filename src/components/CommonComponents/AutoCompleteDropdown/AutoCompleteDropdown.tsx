import React, { useState } from "react";
import { MenuItem, Input } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import "./AutoCompleteDropdown.scss"
import TextField from "@material-ui/core/TextField/TextField";
const AutoCompleteDropDown = (props: {
    children: any,
    hasMore: boolean
    options: any[],
    name: string,
    id: string,
    searchWord: string
    fetchMoreData: (page: number, searchWord: string) => void,
    onChange: (name: string, id: number) => void
}) => {
    const [page, setPage] = useState(1);
    const fetchMoreData = (page: number, searchWord: string) => {
        setPage(page)
        props.fetchMoreData(page, searchWord);
    };
    const [showOptions, setShowOptions] = useState(false);
    const selectOption = (selectedOption: string, selectedId: number) => {
        props.onChange(selectedOption, selectedId);
        setShowOptions(false);
    }
    return (
        <div className="content" >
            <TextField
                autoFocus
                variant="outlined"
                size="small"
                label={props.name}
                type="text"
                margin="normal"
                fullWidth
                id={`${props.id}-auto-complete-input-id`}
                key={`${props.id}-auto-complete-input`}
                value={props.searchWord}
                onFocus={() => {
                    if (!props.options.length) {
                        props.fetchMoreData(1, '');
                    }
                    setShowOptions(true);
                }}
                onBlur={() => {
                    setShowOptions(false);
                }}
                onChange={(e) => {
                    return fetchMoreData(1, e.target.value);
                }}
            />
            {showOptions && <InfiniteScroll
                dataLength={props.options.length}
                next={() => {
                    return fetchMoreData(page + 1, props.searchWord)
                }}
                hasMore={props.hasMore}
                loader={<h4>Loading...</h4>}
                height={300}

            >
                <div className="auto-comolete-options">
                    {props.options.map((option: { name: string, id: number }, index: number) => (
                        <MenuItem
                            id={`auto-comolete-options-${option.id}`}
                            key={props.id + option.id.toString()}
                            value={option.id}
                            onMouseDown={() => selectOption(option.name, option.id)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </div>
            </InfiniteScroll>}
        </div>
    )
}

export default AutoCompleteDropDown