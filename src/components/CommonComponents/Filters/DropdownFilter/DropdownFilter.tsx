import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { dropdownFilter } from "../../../../filters/dropdownFilter";


function DropdownFilter(props: { filter: dropdownFilter, updateFilter: (value: Record<string, string>) => void}) {
const [value, setValue] = useState(props.filter.value);
  const updateFilter = (val: string) => {
    props.filter.setValue(val);
    props.updateFilter(props.filter.parseToQuery())
  };
  useEffect(() => {
    setValue(props.filter.getValue());
  }, [props.filter.value, props.filter])
  
return (
    <FormControl >
            <Select
                value={value}
                onChange={(event) => {
                    const name = event.target.value as string;
                    updateFilter(name);
                    }}
                displayEmpty
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                inputProps={{ 'aria-label': 'Without label' }}
                >
                {Object.keys(props.filter.options).map((sortFilterKey: string) => {
                    return <MenuItem key={`auction-filter-${sortFilterKey}`} value={sortFilterKey}>
                      {props.filter.options[sortFilterKey]}
                      </MenuItem>
                })}     
            </Select>
            <FormHelperText>Sort by</FormHelperText>
        </FormControl>
    )
}
export default DropdownFilter;
