import { TextField } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { dateFilter, DateValue } from "../../../../filters/dateFilter";

function DateFilter(props: { filter: dateFilter, 
  updateFilter: (value: Record<string, string>) => void}) {
  const [value, setValue] = useState(props.filter.getValue());
  const updateFilter = (val: DateValue) => {
    props.filter.setValue(val);
    props.updateFilter(props.filter.parseToQuery())
  }
  useEffect(() => {
    setValue(props.filter.getValue());
  }, [props.filter.value, props.filter])
    return (
        <div className="filter-container">
          <TextField
              onChange={(e: any) => {
                updateFilter({
                  startDate: e.target.value,
                  endDate: e.target.value,
                });
              }}
              id={`add-auction${props.filter.filterName}`}
              label="Auction End Date and Time"
              type="datetime-local"
              name="end_date"
              inputProps={{ min: new Date() }}
              InputLabelProps={{
                shrink: true,
              }}
              value={value}
            />
            </div>
            )
          }
export default DateFilter
