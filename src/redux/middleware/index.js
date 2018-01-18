import { applyMiddleware } from 'redux';

import sysStatsMiddleware from './sysStatsMiddleware';

export default applyMiddleware(sysStatsMiddleware);
