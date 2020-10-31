import React, {useEffect, useState} from "react";
import { rangeFilter } from "../../../../filters/rangeFilter";
import InputRange, { Range } from "react-input-range";
import "react-input-range/lib/css/index.css";
function RangeFilter(props: { filter: rangeFilter, 
  updateFilter: (value: Record<string, string>) => void}) {
  const [value, setValue] = useState(props.filter.getValue());
  const updateFilter = (val: Range ) => {
    props.filter.setValue(val);
    props.updateFilter(props.filter.parseToQuery())
  }
  useEffect(() => {
    setValue(props.filter.getValue());
  }, [props.filter.value, props.filter])
    return (
        <div className="filter-container">
            <InputRange
                maxValue={10000}
                minValue={0}
                value={value}
                onChange={(value: Range | number) => {
                setValue(value);
                }}
                onChangeComplete={(value: Range | number) => {
                updateFilter(value as Range);
                }}
            />
          </div>
    )
}
export default RangeFilter
