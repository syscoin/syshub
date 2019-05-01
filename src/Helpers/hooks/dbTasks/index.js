import { addTaskToHook } from '../';

import { sayHi } from './versionUpdate';

const registerDbTasksHooks = dbProvider => {
  addTaskToHook('onLoginSuccess', () => sayHi(dbProvider));
};

export default registerDbTasksHooks;
