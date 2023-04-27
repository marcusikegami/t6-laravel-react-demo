import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        setErrors({});
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setToken(data.token);
                setUser(data.user);
            })  // There is no need to redirect the user to a specific page because the useStateContext function will redirect the user to the dashboard page
            .catch(error => {
                console.error(error);
                const response = error.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    setErrors({email: [response.data.message]});
                }
            });


    }
    return (
        <div id="login-window">
            <div id="login-form">
                <form onSubmit={onSubmit}>
                <h1 className="title">Login into your account</h1>
        
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
        
                <input ref={emailRef} type="email" placeholder="Email"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
                <button className="btn btn-block">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;