/** サーバーオリジン */
const baseURL = 'http://localhost:8080';

/** 共通ヘッダー */
const headers = { 'Content-Type': 'application/json' };

/** 認証API */
const authenticationApi = {
  session: {
    url: 'session',
    method: 'post',
    withCredentials: true,
  },
  create: {
    url: 'login',
    method: 'post',
    ...{ headers },
    withCredentials: true,
  },
  destroy: {
    url: 'logout',
    method: 'delete',
    withCredentials: true,
  },
};

/** ユーザAPI */
const userApi = {
  create: {
    url: 'user',
    method: 'post',
    withCredentials: true,
    ...{ headers },
  },
  show: {
    url: 'user/:user_id',
    method: 'get',
  },
  index: {
    url: 'users',
    method: 'get',
  },
  update: {
    url: 'user',
    method: 'put',
    withCredentials: true,
    ...{ headers },
  }
}

/** ツイートAPI */
const tweetApi = {
  create: {
    url: 'tweet',
    method: 'post',
    withCredentials: true,
    ...{ headers },
  },
  show: {
    url: 'tweet/:tweet_id',
    method: 'get',
  },
  index: {
    url: '/tweets',
    method: 'get',
  },
  destroy: {
    url: 'tweet/:tweet_id',
    method: 'delete',
    withCredentials: true,
    ...{ headers },
  }
}

/** フォローAPI */
const followApi = {
  create: {
    url: 'user/:user_id/following',
    method: 'post',
    withCredentials: true,
  },
  index: {
    url: 'user/:user_id/followings',
    method: 'get',
  },
  followers: {
    url: 'user/:user_id/followers',
    method: 'get',
  },
  destroy: {
    url: '/user/:user_id/following',
    method: 'delete',
    withCredentials: true,
  },
};

/** お気に入りAPI */
const favoriteApi = {
  create: {
    url: 'tweet/:tweet_id/favorite',
    method: 'post',
    withCredentials: true,
  },
  index: {
    url: 'tweet/:tweet_id/favorites',
    method: 'get',
  },
  destroy: {
    url: 'tweet/:tweet_id/favorite',
    method: 'delete',
    withCredentials: true,
  },
};

export {
  baseURL,
  authenticationApi,
  userApi,
  tweetApi,
  followApi,
  favoriteApi,
}
