import { dateFilter } from "../../../filters/dateFilter";
import { dropdownFilter } from "../../../filters/dropdownFilter";
import { freeTextFilter } from "../../../filters/freeTextFilter";
import { rangeFilter } from "../../../filters/rangeFilter";

const sort = new dropdownFilter('sortBy', '', {
    price_levels: 'price',
    name: 'name',
    end_date: 'date'
  })
  const date = new dateFilter("date", {
    startDate: new Date(),
    endDate:  new Date(),
  });
  const range = new rangeFilter("price", { min: 0, max: 1000 });
  const kind = new freeTextFilter("model", "");
  const name = new freeTextFilter("name", "");
  export const auctionFilters = {
    [sort.filterName]: sort,
    [date.filterName]: date,
    [range.filterName]: range,
    [kind.filterName]: kind,
    [name.filterName]: name,
  };
  