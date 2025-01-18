import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const addUserToDatabase = async (user) => {
    const { data, error } = await supabase.from("users").upsert(
      {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        leetcode_username: user.user_metadata?.leetcode_username,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("Error adding user to database:", error);
    } else {
      console.log("User added to database:", data);
    }
  };

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return;
    }
    if (data && data.user) {
      await addUserToDatabase(data.user);
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Error logging in:", error);
      }
      getUser();
    };

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  function SignUpComponent() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [leetcodeUsername, setLeetcodeUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
      e.preventDefault();

      console.log("Signing up: " + email + " " + name);
      const { error } = await supabase.auth.signUp({

        email,
        password,
        options: {
          data: {
            name: name,
            leetcode_username: leetcodeUsername,
          },
        },
      });
      if (error) {
        console.error("Error signing up:", error);
      } else if (data?.user) {
        console.log("User signed up:", data.user);
        await addUserToDatabase(data.user);
        getUser();
      }
    };

    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Leetcode Username</label>
            <input
              type="text"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }

  return isLogin ? (
    <>
      <LoginComponent />{" "}
      <button onClick={() => setIsLogin(false)}> Sign up</button>
    </>
  ) : (
    <>
      <SignUpComponent />
      <button onClick={() => setIsLogin(true)}>
        Already have an account? Login
      </button>
    </>
  );
};

const App = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default App;
