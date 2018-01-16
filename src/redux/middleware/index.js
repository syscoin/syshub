import { applyMiddleware } from 'redux';

//Custom Middleware
import SysGetStats from './SysGetStats';

export default applyMiddleware(SysGetStats);
