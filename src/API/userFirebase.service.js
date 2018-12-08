import { fire } from './firebase';

export const getCurrentUser = async () => {
  const currentUser = await fire.auth().currentUser;
  return currentUser;
};