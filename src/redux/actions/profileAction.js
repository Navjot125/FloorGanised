import { DELETE_ACCOUNT, UPDATE_PASSWORD } from "../constants";

export function updatePasswordRequest(item){
    return{
        type:UPDATE_PASSWORD,
        data:item
    }
}   

export function deleteAccount(item){
    return{
        type:DELETE_ACCOUNT,
        data:item
    }
}