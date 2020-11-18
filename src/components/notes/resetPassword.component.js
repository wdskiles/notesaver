import React, { useState } from 'react';
//import {useHistory} from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const [userPassword, SetUserPassword] = useState();
    const [newPassword, SetNewPassword] = useState();
    const [newPasswordCheck, SetNewPasswordCheck] = useState();
    const [username, SetUserName] = useState();

    const [err, setErr] = useState('');
    //const history = useHistory();

    const onChangeInputUserName = e =>{
        const {value} = e.target;
        SetUserName(value);
        setErr('');
    };

    const onChangeInputCurrentPassword = e =>{
        const {value} = e.target;
        SetUserPassword(value);
        setErr('');
    };

    const onChangeInputNewPassword = e =>{
        const {value} = e.target;
        SetNewPassword(value);
        setErr('');
    };

    const onChangeInputNewPasswordCheck = e =>{
        const {value} = e.target;
        SetNewPasswordCheck(value);
        setErr('');
    };

    const resetSubmit = async e =>{
        e.preventDefault();
        const token = localStorage.getItem('tokenStore');
        const data = {userPassword, newPassword, username};
        try {
            var passCheck = newPassword.localeCompare(newPasswordCheck);
            if (passCheck == 0) {
                const res = await axios.put(`/users/reset-password/`, data, {
                    headers:{Authorization: token}
                });
                setErr(res.data.msg);
            }
            else {
                setErr("New password fields do not match. Please try again.")
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg);
        }
    }
 
    return (
        <section className="login-page">
            <div className="reset create-note">
                <h2>Reset Password</h2>
                    <p>Please enter your username here.</p>
                    <form onSubmit={resetSubmit}>
                        <input type="text" id="username" name="username" placeholder="Username"
                        required onChange={onChangeInputUserName} />
                        <p><br></br>Please enter your current password here.</p>
                        <input type="password" name="password" id="password" placeholder="Current Password" 
                        required autoComplete="true" onChange={onChangeInputCurrentPassword} />
                        <p><br></br>Please enter your new password here.</p>
                        <input type="password" name="newPassword" id="newPassword" placeholder="New Password" 
                        required autoComplete="true" onChange={onChangeInputNewPassword} />

                        <p><br></br>Please confirm your password here.</p>
                        <input type="password" name="newPasswordCheck" id="newPasswordCheck" placeholder="Confirm New Password" 
                        required autoComplete="true" onChange={onChangeInputNewPasswordCheck} />

                        <button type="submit">Reset Password</button>
                        <h3>{err}</h3>
                    </form>
            </div>
        </section>
    );
}