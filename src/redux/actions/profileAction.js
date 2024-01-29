import { DELETE_ACCOUNT, GET_PROFILE, UPDATE_PASSWORD, UPDATE_PROFILE } from "../constants";

export function getProfile(){
    return{
        type:GET_PROFILE,
    }
}   
export function updatePasswordRequest(item){
    return{
        type:UPDATE_PASSWORD,
        data:item
    }
}   
export function updateProfileRequest(item){
    return{
        type:UPDATE_PROFILE,
        data:item
    }
}   

export function deleteAccount(item){
    return{
        type:DELETE_ACCOUNT,
        data:item
    }
}