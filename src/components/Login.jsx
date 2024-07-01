import { useState } from "react";
import logIn from "../assets/LogImg.jpg"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css"

const Login=({setAuth})=>{
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleLogin = (e) =>{
        e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setAuth(true);
    let userAuth = true;
      localStorage.setItem("userAuth", JSON.stringify(userAuth));
   
    setError(false);
    navigate("/", { replace: true });
    
  })
  .catch((error) => {
    setError(true);
  });
    }
    return (
        <div className="login">
            <div className="loginBox container" style={{}}>
                <div style={{backgroundColor:"rgb(250,0,0)"}}><img src={logIn}/></div>
                <div>
                    <h1>Welcome Back :)</h1>
                    <small>Log in to view the portal.</small>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Email" onChange={e =>setEmail(e.target.value)}/>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder="Password" onChange={e =>setPassword(e.target.value)}/>
                        <button type="submit">Login</button>
                       {error && <span>Wrong email or password!</span>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;