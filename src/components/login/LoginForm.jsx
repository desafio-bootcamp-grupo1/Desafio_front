import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/features/auth/auth.slice";
import { useState } from "react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector(s => s.auth.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(res)) {
       navigate("/");
    } else {
      // error en respuesta
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
      {error && <p style={{color:"blue"}}>{String(error)}</p>}
    </form>
  );
}
