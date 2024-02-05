import { combineReducers } from "redux";
import { onBoardingreducer } from "./reducers/onBoardingreducer";
import { DateReducer } from "./reducers/DateReducer";
import { loaderReducer } from "./reducers/Loader";
export default combineReducers({
    onBoardingreducer,
    DateReducer,
    loaderReducer
})