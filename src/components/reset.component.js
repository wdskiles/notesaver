import axios from 'axios';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function Reset() {
    const [userPassword, SetUserPassword] = useState({
        password: ''
    });

    const [newPassword, SetNewPassword] = useState({
        password: ''
    });

    const [err, setErr] = useState('');
    const history = useHistory();

    const onChangeInputCurrentPassword = e =>{
        const {name, value} = e.target;
        SetUserPassword({...userPassword, [name]:value});
        setErr('');
    };

    const onChangeInputNewPassword = e =>{
        const {name, value} = e.target;
        SetNewPassword({...newPassword, [name]:value});
        setErr('');
    };

    const resetSubmit = async e =>{
        e.preventDefault();
        try {
            const res = await axios.post('/users/reset-password', {
                password: userPassword.password
            });
            SetUserPassword({password: ''});
            SetNewPassword({password: ''});
            setErr(res.data.msg);
            history.push('/');
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    }

    return (
        <section className="login-page">
            <div className="register create-note">
                <h2>Reset Password</h2>
                    <p>Please enter your new password here.</p>
                    <form onSubmit={resetSubmit}>
                        <input type="password" name="password" id="password" placeholder="Current Password" 
                        required value={userPassword.password} autoComplete="true" onChange={onChangeInputCurrentPassword} />

                        <input type="password" name="newPassword" id="reset-password" placeholder="New Password" 
                        required value={newPassword.password} autoComplete="true" onChange={onChangeInputNewPassword} />

                        <button type="submit">Reset Password</button>
                        <h3>{err}</h3>
                    </form>
            </div>
        </section>
    );
}