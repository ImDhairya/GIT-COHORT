import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import apiClient from "../service/apiClient.js";

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [laoding, setLoading] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("JFEIJEFIEF");
    setLoading(true);
    setError("");

    try {
      const data = await apiClient.signup(username, email, password);

      if (data.success) {
        navigate("/login");
      } else {
        setError(data.message || "Signup field");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h1>Good morning</h1>
      <div className="card">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="input">
              <input
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div className="input">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="text"
                placeholder="Enter Password"
              />
            </div>
            <button type="submit">Click me</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
