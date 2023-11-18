import { useState, useEffect } from "react"
import { UserBase } from "../models/user-params"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  UserCommunicationService
} from "../services/user-communication-service";

const UserComponent = (props: { user: UserBase }) => {
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

export const UserListComponent = () => {
  const [users, setUsers] = useState<UserBase[]>([]);

  useEffect(() => {
    const userCommunicationService = new UserCommunicationService();
    userCommunicationService.index()
    .then(res => setUsers(res.users))
    .catch(() => {/** cancel the request */});

    // cancel the request
    return () => userCommunicationService.abort()
  }, []);

  const tableBody = users.map(user => (
    <UserComponent user={user} key={user.id} />
  ));

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
