import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../store/Store";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { loadingFalse, nullErrors } from "../utils/utils";
const ForgotPassword = () => {
    const navigate = useNavigate();
    const { error, dispatch, loading } = useContext(ProductsContext);
    const [email, setEmail] = useState("");
    let [showEmailFrom, setShowEmailForm] = useState(true)
    let [updatePassword, setUpdatePassword] = useState({ password: "", cpassword: "" })

    const verifyEmail = async (e) => {
        e.preventDefault();
        nullErrors(dispatch)
        dispatch({ type: "DATA_LOADING", payload: { loading: true } });
        let res = await fetch('/accounts/forgotpassword', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email })
        })
        let response = await res.json()
        console.log(response)
        if (res.status === 200) {
            loadingFalse(dispatch)
            setShowEmailForm(false)
        } else {
            const { error } = response
            dispatch({ type: "SET_ERROR", payload: { error } });
            loadingFalse(dispatch)
        }
    };
    let resetPassword = async (e) => {
        e.preventDefault()
        let { password, cpassword } = updatePassword
        if (password === cpassword) {
            let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=?])[A-Za-z0-9!@#$%^&*()_\-+=?]{8,16}$/;
            if (passwordRegex.test(password)) {
                dispatch({ type: "DATA_LOADING", payload: { loading: true } })
                console.log(email)
                let res = await fetch(`/accounts/forgotpassword/${email}`,
                 { method: "PATCH",
                  headers: { "Content-Type": "application/json"},
                   body: JSON.stringify({ password }) } )
                let response = await res.json()
                console.log(response)
                if (res.status === 200) {
                    nullErrors(dispatch)
                    loadingFalse(dispatch)
                    navigate('/accounts/login')
                }
                else {
                    let { error } = response
                    dispatch({ type: "SET_ERROR", payload: { error } })
                }
            }
            else {
                dispatch({
                    type: "SET_ERROR", payload: {
                        error: "Password must be between 8 and 16 characters long and contain at least one uppercase letter and one special character.",
                    },
                });
            }
        }
        else {
            dispatch({ type: "SET_ERROR", payload: { error: "Passwod doesn't Match" } });
        }
    }
    useEffect(() => {
        nullErrors(dispatch)
        loadingFalse(dispatch)
    }, [])
    return (
        <div className="container">
            <div className="forgot-password-container">
                <div className="forgot-password">
                    <h2>Forgot Password</h2>
                    {error && <Error error={error} />}
                    {showEmailFrom ? <form onSubmit={verifyEmail}>
                        <div className="form-group">
                            <label htmlFor="user-email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="user-email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="reset-password-btn" type="submit">
                            {loading ? "Processing..." : "Verify Email"}
                        </button>
                    </form> : <form onSubmit={resetPassword}>
                        <div className="form-group">
                            <label htmlFor="user-email">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="user-password"
                                placeholder="Enter Password"
                                required
                                value={updatePassword.password}
                                onChange={(e) => { setUpdatePassword({ ...updatePassword, password: e.target.value }) }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="user-email">Re Enter Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="user-password"
                                placeholder="Enter Password Again"
                                required
                                value={updatePassword.cpassword}
                                onChange={(e) => { setUpdatePassword({ ...updatePassword, cpassword: e.target.value }) }}
                            />
                        </div>
                        <button type="submit">{loading ? "Processing" : "Reset Password"}</button>
                    </form>}

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
