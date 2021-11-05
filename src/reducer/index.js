import { combineReducers } from "redux";
import controlReducer from "./controlReducer";
import timeReducer from "./timeReducer";

const rootReducer = combineReducers({timeReducer, controlReducer})

export default rootReducer;
