import {combineReducers} from 'redux';
import { ProductReducer } from './ProductReducer';
import { CategoryReducer } from './CategoryReducer';
import { ProjectReducer } from './ProjectReducer';
import { CommentReducer } from './CommentsReducer';
import { HeaderReducer } from './HeaderReducer';

import aboutUsReducer from './AboutUsReducer';
import { UserReducer } from './UserReducer';
import { RoleReducer } from './RoleReducer';

const rootReducers = combineReducers({
    products:ProductReducer,
    categories:CategoryReducer,
    project:ProjectReducer,
    comments:CommentReducer,
    headers:HeaderReducer,
    aboutUs:aboutUsReducer,
    users: UserReducer,
    roles:RoleReducer
});

export default rootReducers;