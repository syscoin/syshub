const nullMiddleware = () => next => action => {
  const result = next(action);
  return result;
};

export default nullMiddleware;
