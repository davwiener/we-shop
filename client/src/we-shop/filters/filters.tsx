import React from "react";
import Filter from "./filter/filter";
const filters: { text: string; type: string }[] = [
  { text: "סוג", type: "freeText" },
  { text: "מוצר", type: "freeText" },
  { text: "מחיר", type: "range" },
  { text: "תאריך סיוםף", type: "datePicker" },
];
function Filters() {
  return (
    <div>
      {filters.map((f: { text: string; type: string }) => (
        <div>
          <Filter filter={f}></Filter>
        </div>
      ))}
    </div>
  );
}
export default Filters;
