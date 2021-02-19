import {useState} from "react";
import {useAuth} from "../contexts/auth";
import {useRouter} from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContextType = useAuth();
  const router = useRouter();

  async function handleLogin() {
    let any = await authContextType.login(email, password);
    await router.push("/");
  }

  return (
    <div>
      {email}
      <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}


export default Login