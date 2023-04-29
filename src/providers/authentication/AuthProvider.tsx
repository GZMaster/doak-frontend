import { useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import PropTypes from "prop-types";
import { IUser } from "../../types/user";

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
      // "http://localhost:3000/api/v1/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      const { cookieOptions, token, user } = response.data;

      // Set cookie
      document.cookie = `jwt=${token}; ${cookieOptions}`;

      // Set local storage
      localStorage.setItem("user", JSON.stringify(user));

      return true;
    } else {
      return false;
    }
  };

  const verify = async (otp: string) => {
    // get user from local storage
    const userString = localStorage.getItem("user");
    const user: IUser = userString && JSON.parse(userString);

    // Make API call to verify endpoint
    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/users/verifyEmail/${user._id}`,
      // "http://localhost:3000/api/v1/users/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      }
    );

    console.log(res);

    const response = await res.json();

    if (response.status === "success") {
      return true;
    } else {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    // Make API call to login endpoint
    const res = await fetch(
      "https://doakbackend.cyclic.app/api/v1/users/login",
      // "http://localhost:3000/api/v1/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      const { cookieOptions, token, user } = response.data;

      // Set cookie
      document.cookie = `jwt=${token}; ${cookieOptions}`;

      // Set local storage
      localStorage.setItem("user", JSON.stringify(user));

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

  const forgotPassword = async (email: string) => {
    // Make API call to forgot password endpoint
    const res = await fetch(
      "https://doakbackend.cyclic.app/api/v1/users/forgotPassword",
      // "http://localhost:3000/api/v1/users/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      const { resetToken } = response.data;

      // store reset token in local storage
      localStorage.setItem("resetToken", resetToken);

      return true;
    } else {
      return false;
    }
  };

  const resetPassword = async (
    password: string,
    passwordConfirm: string,
    restToken: string
  ) => {
    // Make API call to reset password endpoint
    const res = await fetch(
      `https://doakbackend.cyclic.app/api/v1/users/resetPassword/${restToken}`,
      // `http://localhost:3000/api/v1/users/resetPassword/${restToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, passwordConfirm }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      return true;
    } else {
      return false;
    }
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        signup,
        login,
        verify,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
