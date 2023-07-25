import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { config } from "../const";
import { TweetBase, TweetList } from "../models/tweet-params";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const Tweet = (props: { tweet: TweetBase }) => {
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

export {
  Tweets,
}
