// import from '@atproto/'
import { AtpAgent } from '@atproto/api';
interface signInRequest {
  handle: string;
  password: string;
}

const signIn = async (data: signInRequest) => {
  console.log(data);
};
const getServerStatus = async () => {
  console.log('getServerStatus');

  return 'ok';
};

export { signIn, getServerStatus };
