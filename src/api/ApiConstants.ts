export const ApiConstants ={
    USERS:{
        FIND_ALL: "/users",
        DELETE: (userId: number)=>{
            return "/users/" +userId;
        },
        ADD_USER: "/track/add-user",
    },
    GITHISTORY:{
        ADD: (userId : number)=>{
            return "/git-history/" + userId;
        }

    },
  
    LOGIN: "/auth/login",


};