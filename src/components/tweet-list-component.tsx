import { useEffect, useState } from "react";
import { Tweet } from "../models/tweet-params";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  TweetCommunicationService
} from "../services/tweet-communication-service";

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


export const TweetListComponent = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const tweetCommunicationService = new TweetCommunicationService();
    tweetCommunicationService.index()
    .then(res => setTweets(res.tweets))
    .catch(() => {/** cancel the request */});

    // cancel the request
    return () => tweetCommunicationService.abort()
  }, []);

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
