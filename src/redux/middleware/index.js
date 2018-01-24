import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import sysStatsMiddleware from './sysStatsMiddleware';

export default applyMiddleware(thunk, sysStatsMiddleware);
