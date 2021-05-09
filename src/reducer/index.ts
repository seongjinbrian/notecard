import {combineReducers} from 'redux';
import note from './note'

const rootReducer = combineReducers({
    note,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;