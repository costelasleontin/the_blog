// default store state for filter 
const defaultFilterState={ type: "text", sort: "title" };

//filter reducer export
export default (filterstate = defaultFilterState, action) => {
    switch (action.type) {
        case "TITLESORT":
            return { ...filterstate, sort: "title" };
        case "DATESORT":
            return { ...filterstate, sort: "date" };
        case "AUTHORSORT":
            return { ...filterstate, sort: "author" };
        default:
            return filterstate;
    }
}