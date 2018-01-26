import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import nullMiddleware from './nullMiddleware';

export default applyMiddleware(thunk, nullMiddleware);
