import axios from 'axios';
import React, {useState} from 'react';

export default function Login({setIsLogin}) {
    const [user, SetUser] = useState({
        name: '',
        email: '',
        password: ''
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
            const res = await axios.post('/users/register', {
                username: user.name,
                email: user.email,
                password: user.password
            });
            SetUser({name: '', email: '', password: ''});
            setErr(res.data.msg);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    const loginSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post('/users/login', {
                email: user.email,
                password: user.password
            });
            SetUser({name: '', email: '', password: ''});
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    };

    const resetSubmit = async e =>{
        e.preventDefault();
    }

    const [onLogin, setOnLogin] = useState(false);
    const [onReset, setOnReset] = useState(false);
    const registerStyle = {
        visibility: onReset ? "hidden" : onLogin ? "visible" : "hidden",
        opacity: onReset ? 0 : onLogin ? 1 : 0
    };

    const loginStyle = {
        visibility: onReset ? "hidden" : onLogin ? "hidden" : "visible",
        opacity: onReset ? 0 : onLogin ? 0 : 1
    };

    const resetStyle = {
        visibility: onReset ? "visible" : "hidden",
        opacity: onReset ? 1 : 0
    };

    return (
        <section className="login-page">
            <div className="login create-note" style={loginStyle}>
                <h2>Login</h2>
                    <form  onSubmit={loginSubmit}>
                        <input type="email" name="email" id="login-email" placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                        <input type="password" name="password" id="login-password" placeholder="Password" 
                        required value={user.password} autoComplete="true" onChange={onChangeInput} />

                        <button type="submit">Login</button>
                        <p>
                            Don't have an account?
                            <span onClick={() => setOnLogin(true)}> Register Here</span>
                        </p>
                        <p>
                            Forgot your password or want to reset it?
                            <span onClick={() => setOnReset(true)}> Reset Here</span>
                        </p>
                        <h3>{err}</h3>
                    </form>
            </div>
            <div className="register create-note" style={registerStyle}>
                <h2>Register</h2>
                    <form onSubmit={registerSubmit}>
                        <input type="text" name="name" id="register-name" placeholder="Username" required value={user.name}
                        onChange={onChangeInput} />

                        <input type="email" name="email" id="register-email" placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                        <input type="password" name="password" id="register-password" placeholder="Password" 
                        required value={user.password} autoComplete="true" onChange={onChangeInput} />

                        <button type="submit">Register</button>
                        <p>
                            Already have an account?
                            <span onClick={() => setOnLogin(false)}> Login</span>
                        </p>
                        <p>
                            Already have an account but you forgot your password or want to reset it?
                            <span onClick={() => setOnReset(true)}> Reset Here</span>
                        </p>
                        <h3>{err}</h3>
                    </form>
            </div>
            <div className="login create-note" style={resetStyle}>
                <h2>Reset Password</h2>
                    <form  onSubmit={resetSubmit}>
                        <input type="email" name="email" id="reset-email" placeholder="Email" required value={user.email}
                        onChange={onChangeInput} />

                        <button type="submit">Send Reset Email</button>
                        <p>
                            Remember your password?
                            <span onClick={() => setOnReset(false)}> Login Here</span>
                        </p>
                        <h3>{err}</h3>
                    </form>
            </div>
        </section>
    );
}