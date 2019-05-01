import _ from 'underscore';

const hooks = {
  onLoginSuccess: []
};

const addTaskToHook = (hookName, task) => {
  if (_.isFunction(task)) {
    hooks[hookName].push(task);
  }
};

const runTasks = event => {
  const taskList = hooks[event];
  taskList.map(async task => {
    if (_.isFunction(task)) {
      try {
        await task();
        return true;
      } catch (err) {
        return false;
      }
    }
  });
};

export { addTaskToHook };

export default runTasks;
