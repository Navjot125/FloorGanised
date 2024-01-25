import { LOGIN_REQUEST, LOG_OUT_REQUEST } from "../constants";

export function loginRequest(item){
    return{
        type:LOGIN_REQUEST,
        data:item
    }
}

export function logOutRequest(item){
    return{
        type:LOG_OUT_REQUEST,
        data:item
    }
}