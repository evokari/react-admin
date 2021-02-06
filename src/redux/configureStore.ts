import { createStore } from "redux";
import { setUserReducer } from "./reducers/setUserReducer";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const configureStore = () => {
  return createStore(setUserReducer)
}
