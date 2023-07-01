import { useState } from "react"

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    user_name: '',
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
        type="text"
        name="user_name"
        placeholder="user_name"
        value={formData.user_name}
        onChange={handleChange}/>
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}/>
      <input type="button" onClick={handleClick} value="新規登録"/>
    </form>
  )
}

export {
  SignUp,
}
