
//counter reducer export
export default (counterstate = 0,action)=>{
    switch (action.type){
        case "ADD":
            return counterstate+1;
        case "SUBTRACT":
            return counterstate-1;
        case "RESET":
            return 0;
        default:
            return counterstate;
    }
}

