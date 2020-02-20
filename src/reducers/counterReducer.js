export default (state={counter:0},action)=>{
    switch (action.type){
        case "ADD":
            return { counter:state.counter+1};
        case "SUBTRACT":
            return {counter:state.counter-1}
        case "RESET":
            return {counter:0};
        default:
            return state;
    }
}

