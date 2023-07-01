import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "../const";
import { TweetBase, TweetList } from "../models/tweet-params";

const Tweet = (props: { tweet: TweetBase }) => {
  const { id, message, user, created_at, favorites } = props.tweet;
  return (
    <tr>
      <td>{id}</td>
      <td>{user?.id}</td>
      <td>{user?.user_name}</td>
      <td>{message}</td>
      <td>{created_at.toString()}</td>
      <td>{JSON.stringify(favorites)}</td>
    </tr>
  )
};


const Tweets = () => {
  const [tweets, setTweets] = useState<TweetBase[]>([]);

  useEffect(() => {
    const options = {
      url: config.API_ORIGIN + "/tweets",
      method: "GET",
    };

    axios(options)
      .then((res: AxiosResponse<TweetList>) => {
        const { data, status } = res;
        console.log('statusCode: ' + status);
        console.dir(data);
        setTweets(data.tweets);
      }).catch((e: AxiosError<{ error: string }>) => {
        console.error(e.message);
      });
  }, []);

  const tableBody = tweets.map(tweet => (
    <Tweet tweet={tweet} key={tweet.id} />
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>user_id</th>
          <th>user_name</th>
          <th>message</th>
          <th>created_at</th>
          <th>favorites</th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  )

}

export {
  Tweets,
}
