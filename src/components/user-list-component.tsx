import { useState, useEffect } from "react"
import { UserBase, UserList } from "../models/user-params"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { axiosClient } from "../provider/AxiosClientProvider";

/**
 * ユーザコンポーネント
 */
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

/**
 * ユーザ一覧コンポーネント
 */
export const UserListComponent = () => {

  // ユーザ一覧データ管理
  const [users, setUsers] = useState<UserBase[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    axiosClient<UserList>({
      url: 'users',
      method: 'get',
      signal: abortController.signal,
    })
    .then(res => setUsers(res.data.users))
    .catch(e => console.error(e));

    return () => abortController.abort()
  }, []);

  /** ユーザ一覧 データ表示部生成 */
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
