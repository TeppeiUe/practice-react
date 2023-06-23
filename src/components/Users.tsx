import { useState, useEffect } from "react"
import axios, { AxiosResponse, AxiosError } from "axios"
import { config } from "../const"
import { UserList, UserBase } from "../models/user-params"

const User = (props: { user: UserBase }) => {
  const { id, user_name, profile, created_at = new Date() } = props.user;
  return (
    <tr>
      <td>{id}</td>
      <td>{user_name}</td>
      <td>{profile}</td>
      <td>{created_at.toString()}</td>
    </tr>
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
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>user_name</th>
          <th>profile</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  )
}

export {
  Users,
}