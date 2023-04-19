// import from '@atproto/'
import {
  AtpAgent,
  AtpSessionData,
  AtpSessionEvent,
  BskyAgent,
} from '@atproto/api';

interface signInRequest {
  handle: string;
  password: string;
}

interface getPostListRequest {
  token: string;
  page: number;
}
export default class BskyAPI {
  private agent: BskyAgent;
  constructor(service: string) {
    this.agent = new BskyAgent({
      service: service,
      persistSession: (evt: AtpSessionEvent, session?: AtpSessionData) => {
        console.log('aptSessionEvent:', evt, 'aptSessionData:', session);
      },
    });
  }
  public async signIn(data: signInRequest) {
    console.log('signIn:', data);
    const response = await this.agent.login({
      identifier: data.handle,
      password: data.password,
    });
    console.log('signIn Response:', response);
  }
  public async getServerStatus() {
    console.log('getServerStatus');

    return 'ok';
  }
  public async getTimeline() {
    const response = await this.agent.getTimeline();
    return response;
  }
}
const signIn = async (data: signInRequest) => {
  console.log(data);
};
const getServerStatus = async () => {
  console.log('getServerStatus');

  return 'ok';
};

const getPostList = async () => {
  console.log('getPostList');
};

export { signIn, getServerStatus };
