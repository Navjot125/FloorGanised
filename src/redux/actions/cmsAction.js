import { CONTACT_US } from "../constants";

export function cmsRequest(item){
    return{
        type:CONTACT_US,
        data:item
    }
}