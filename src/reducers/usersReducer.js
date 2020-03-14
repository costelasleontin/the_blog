// default store state for users 
const defaultUsersState={ isEmpty: true, users: [] };

//filter reducer export
export default (usersstate = defaultUsersState, action) => {
    switch (action.type) {
        case "ADDALLUSERS":
            return { isEmpty: false, users:[...action.allUsers] };
        case "ADDPOST":
            return { isEmpty: false, users: [...usersstate.users, action.user] };
        case "DELETEPOST":
            if (Number(action.id)) {
                if (usersstate.users.length === 0) {
                    return { isEmpty: true, users: [...usersstate.users].filter(user => user.id !== action.id) };
                } else {
                    return { isEmpty: false, users: [...usersstate.users].filter(user => user.id !== action.id) };
                }
            }
            break;
        default:
            return usersstate;
    }
}