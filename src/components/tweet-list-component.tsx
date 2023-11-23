import { useEffect, useState } from "react";
import { Tweet, TweetList } from "../models/tweet-params";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { axiosClient } from "../context/AxiosClient";

/**
 * ツイートコンポーネント
 */
const TweetComponent = (props: { tweet: Tweet }) => {
  const { id, message, user, created_at, favorites } = props.tweet;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{user?.id}</TableCell>
      <TableCell>{user?.user_name}</TableCell>
      <TableCell>{message}</TableCell>
      <TableCell>{created_at.toString()}</TableCell>
      <TableCell>{JSON.stringify(favorites)}</TableCell>
    </TableRow>
  )
};

/**
 * ツイート一覧コンポーネント
 */
export const TweetListComponent = () => {

  // ツイート一覧データ管理
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const abortController  = new AbortController();

    axiosClient<TweetList>({
      url: 'tweets',
      method: 'get',
      signal: abortController.signal,
    })
    .then(res => setTweets(res.data.tweets))
    .catch(e => console.error(e.stack));

    return () => abortController.abort()
  }, []);

  /** ツイート一覧 データ表示部生成 */
  const tableBody = tweets.map(tweet => (
    <TweetComponent tweet={tweet} key={tweet.id} />
  ));

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>user_id</TableCell>
            <TableCell>user_name</TableCell>
            <TableCell>message</TableCell>
            <TableCell>created_at</TableCell>
            <TableCell>favorites</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
