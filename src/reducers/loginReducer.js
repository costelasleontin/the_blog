
//login reducer export
export default (loginstate = 0, action) => {
    switch (action.type) {
        case "LOGIN":
            return 1;
        case "LOGOUT":
            return 0;
        default:
            return loginstate;
    }
}