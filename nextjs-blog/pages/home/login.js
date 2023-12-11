import { useContext, useState } from "react";
import { AuthContext }  from "../../components/AuthContext";
import Router from "next/router";
import { LayoutLogin } from "../../components/LayoutLogin";


// Login funksjonen som brukes for å logge inn på siden.
const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Håndterer submit av login.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kaller på APIet for å logge inn. (Fra Django).
    // Perform the API call and check response
    try {
      const response = await fetch(
        "https://api.kaspergaupmadsen.no/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        login();
        // Redirect to the dashboard or homepage after login
        Router.push("/home/dashboard/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <LayoutLogin>
        <h1>Login</h1>
        {error && <p className="error">Error: {error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </LayoutLogin>
    </>
  );
};

export default Login;
