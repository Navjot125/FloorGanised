import { DELETE_ACCOUNT, LOGIN_REQUEST, LOG_OUT_REQUEST, RESET_PASSWORD, SEND_OTP, VERIFY_OTP } from "../constants";

export function loginRequest(item){
    return{
        type:LOGIN_REQUEST,
        data:item
    }
}
export function sendOtp(item){
    return{
        type:SEND_OTP,
        data:item
    }
}
export function verifyOtp(item){
    return{
        type:VERIFY_OTP,
        data:item
    }
}
export function resetPassword(item){
    return{
        type:RESET_PASSWORD,
        data:item
    }
}

export function logOutRequest(){
    return{
        type:LOG_OUT_REQUEST
    }
}