import { LOGIN_REQUEST } from "../constants";

export function loginRequest(item){
    return{
        type:LOGIN_REQUEST,
        data:item
    }
}