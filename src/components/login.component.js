import axios from 'axios';
import React, {useState} from 'react';

export default function Login({setIsLogin}) {
    const [user, SetUser] = useState({
        name: '',
        password: '',
        check: ''
    });

    const [err, setErr] = useState('');

    const onChangeInput = e =>{
        const {name, value} = e.target;
        SetUser({...user, [name]:value});
        setErr('');
    };

    const registerSubmit = async e =>{
        e.preventDefault();
        try {
            var passCheck = user.password.localeCompare(user.check);
            if (passCheck === 0)
            {
                const res = await axios.post('/users/register', {
                    username: user.name,
                    password: user.password
                });
                SetUser({name: '', password: '', check: ''});
                setErr(res.data.msg);
            }
            else {
                setErr("Passwords do not match");
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    const loginSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                username: user.name,
                password: user.password
            });
            SetUser({name: '', password: ''});
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    const [onLogin, setOnLogin] = useState(false);

    const registerStyle = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    };

    const loginStyle = {
        visibility: onLogin ? "hidden" : "visible",
        opacity: onLogin ? 0 : 1
    };

    return (
        <section className="login-page">
            <div className="login create-note" style={loginStyle}>
                <h2>Login</h2>
                    <form  onSubmit={loginSubmit}>
                        <input type="text" name="name" id="login-username" placeholder="Username" required value={user.username}
                        onChange={onChangeInput} />

                        <input type="password" name="password" id="login-password" placeholder="Password" 
                        required value={user.password} autoComplete="true" onChange={onChangeInput} />

                        <button type="submit">Login</button>
                        <p>
                            Don't have an account?
                            <span onClick={() => setOnLogin(true)}> Register Here</span>
                        </p>
                        
                        <h3>{err}</h3>
                    </form>
            </div>
            <div className="register create-note" style={registerStyle}>
                <h2>Register</h2>
                    <form onSubmit={registerSubmit}>
                        <input type="text" name="name" id="register-name" placeholder="Username" required value={user.name}
                        onChange={onChangeInput} />

                        <input type="password" name="password" id="register-password" placeholder="Password" 
                        required value={user.password} autoComplete="true" onChange={onChangeInput} />

                        <input type="password" name="check" id="passwordCheck" placeholder="Confirm Password" 
                        required value={user.check} autoComplete="true" onChange={onChangeInput} />

                        <button type="submit">Register</button>
                        <p>
                            Already have an account?
                            <span onClick={() => setOnLogin(false)}> Login</span>
                        </p>
                        
                        <h3>{err}</h3>
                    </form>
            </div>
        </section>
    );
}