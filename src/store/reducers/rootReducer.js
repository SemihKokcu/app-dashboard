import {combineReducers} from 'redux';
import { ProductReducer } from './ProductReducer';
import { CategoryReducer } from './CategoryReducer';
import { ProjectReducer } from './ProjectReducer';
import { CommentReducer } from './CommentsReducer';
import { HeaderReducer } from './HeaderReducer';

import aboutUsReducer from './AboutUsReducer';

const rootReducers = combineReducers({
    products:ProductReducer,
    categories:CategoryReducer,
    project:ProjectReducer,
    comments:CommentReducer,
    headers:HeaderReducer,
    aboutUs:aboutUsReducer
});

export default rootReducers;