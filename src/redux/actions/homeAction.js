import { GET_JOBS } from "../constants";

export function getJobs(item){
    return{
        type:GET_JOBS,
        data:item
    }
}   