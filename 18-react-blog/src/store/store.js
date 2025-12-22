import { createStore } from 'redux'
import rootReducer from '../store/reducers/rootReducers';

const store = createStore(rootReducer)
export default store;