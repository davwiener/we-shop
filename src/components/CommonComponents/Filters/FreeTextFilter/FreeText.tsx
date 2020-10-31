import { TextField } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { freeTextFilter } from "../../../../filters/freeTextFilter";


function FreeTextFilter(props: {filter: freeTextFilter,
     updateFilter: (value: Record<string, string>) => void}) {
    const [value, setValue] = useState(props.filter.value);
    const updateFilter = (val: string) => {
        props.filter.setValue(val);
        props.updateFilter(props.filter.parseToQuery())
    };
    useEffect(() => {;
        setValue(props.filter.getValue());
    }, [props.filter.value, props.filter])
    return (
            <div className="filter-container">
                <TextField 
                    id={`outlined-basic-${props.filter.filterName}`} label={props.filter.filterName} variant="outlined" 
                    value={value}
                    onChange={(e: any) => {
                        setValue(e.target.value)
                    }}
                    onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                        updateFilter(value);
                    }
                    }}
                    onKeyUp={(e: any) => {
                    if (e.key === "Enter") {
                        updateFilter(value);
                    }
                    }}
                ></TextField>
                </div>
            )
            }
export default FreeTextFilter;
