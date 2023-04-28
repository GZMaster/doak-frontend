import { useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import PropTypes from "prop-types";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    // Make API call to signup endpoint
    const res = await fetch(
      "https://doakbackend.cyclic.app/api/v1/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.status === "success") {
      // if (res.body?.token !== null) {
      //   localStorage.setItem("token", res.body.token);
      // }

      console.log(res);

      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    // Make API call to login endpoint
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    // Make API call to logout endpoint
    const response = await fetch("/api/logout", { method: "POST" });

    if (response.ok) {
      setIsLoggedIn(false);
    }
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider value={{ isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
