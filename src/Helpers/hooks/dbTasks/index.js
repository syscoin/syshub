import { addTaskToHook } from '../';

import { dbUpgrade } from './versionUpdate';

const registerDbTasksHooks = paramObj => {
  addTaskToHook('onLoginSuccess', () => dbUpgrade(paramObj));
};

export default registerDbTasksHooks;
