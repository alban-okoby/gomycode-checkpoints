import { INCREMENT_COUNTER } from './action-types';

export const incrementCOunter = (payload) => ({
    type: INCREMENT_COUNTER,
    payload
});