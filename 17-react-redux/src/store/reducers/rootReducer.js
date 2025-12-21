import { INCREMENT_COUNTER } from '../actions/action-types';

const initialState = {
    counter: 0
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + action.payload
            };
        default:
            break;
    }
    return state;
}

export default rootReducer;