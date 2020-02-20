export default (state = { filter: { type: "text", sort: "title" } }, action) => {
    switch (action.type) {
        case "TITLESORT":
            return { ...state, sort: "title" };
        case "DATESORT":
            return { ...state, sort: "date" };
        case "AUTHORSORT":
            return { ...state, sort: "author" };
        default:
            return state;
    }
}