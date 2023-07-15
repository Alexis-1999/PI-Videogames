import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "../reducer/index"

// Configuración de la Store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))