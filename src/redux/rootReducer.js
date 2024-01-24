import { combineReducers } from "redux";
import { onBoardingreducer } from "./reducers/onBoardingreducer";
import { DateReducer } from "./reducers/DateReducer";
export default combineReducers({
    onBoardingreducer,
    DateReducer
})