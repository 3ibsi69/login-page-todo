function Login(){
    return(
        <div className="container">
            <h1>Login</h1>
            <div className="inputs">
                <input id="email" type="email" placeholder="Email" />
                <input id="password" type="password" placeholder="Password" />
                <button  id="btn">Login</button>
            </div>
            <hr />
            <p>
                You don't have an account? <a href="/signup">Sign Up</a>
            </p>
            </div>
    )
}

export default Login;