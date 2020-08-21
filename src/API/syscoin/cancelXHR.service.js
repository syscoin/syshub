import { HTTPAsync } from '../../redux/helpers';

// cancel the request (the message parameter is optional)
export const cancelAllXHR =  async actionType => {
  await HTTPAsync.cancelSourceXHR(actionType);
}
