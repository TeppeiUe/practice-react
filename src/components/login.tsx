import { useState } from "react"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleClick = () => {
    console.dir(formData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <form>
      <input
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}/>
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}/>
      <input type="button" onClick={handleClick} value="ログイン"/>
    </form>
  )
}

export {
  Login,
}
