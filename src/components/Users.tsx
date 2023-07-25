import { useState, useEffect } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { config } from "../const"
import { UserList, UserBase } from "../models/user-params"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const User = (props: { user: UserBase }) => {
  const { id, user_name, profile, created_at = new Date() } = props.user;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{user_name}</TableCell>
      <TableCell>{profile}</TableCell>
      <TableCell>{created_at.toString()}</TableCell>
    </TableRow>
  )
};

const Users = () => {
  const [users, setUsers] = useState<UserBase[]>([]);

  useEffect(() => {
    const options = {
      url: config.API_ORIGIN + "/users",
      method: "GET",
    };

    axios(options)
      .then((res: AxiosResponse<UserList>) => {
        const { data, status } = res;
        console.log('statusCode: ' + status);
        console.dir(data);
        setUsers(data.users);
      }).catch((e: AxiosError<{ error: string }>) => {
        console.error(e.message);
      });
  }, []);
  
  const tableBody = users.map(user => <User user={user} key={user.id} />);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>user_name</TableCell>
            <TableCell>profile</TableCell>
            <TableCell>created_at</TableCell>
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
  Users,
}