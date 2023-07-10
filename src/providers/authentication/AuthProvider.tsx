import { useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import PropTypes from "prop-types";
import { IUser } from "../../types/user";
import backendURL from "../../api";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        // Send a request to the authentication provider's token validation endpoint
        const res = await fetch(`${backendURL}/api/v1/users/validateToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await res.json();

        if (response.status === "success") {
          setIsLoggedIn(true); // Token is valid, user is logged in

          return true;
        } else {
          setIsLoggedIn(false); // Token is invalid, user is not logged in
          localStorage.removeItem("jwt"); // Remove the invalid token from storage

          return false;
        }
      } catch (error) {
        // console.error("Token validation error:", error);
        setIsLoggedIn(false); // Token is invalid, user is not logged in

        return false;
      }
    }

    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    // Make API call to signup endpoint
    const res = await fetch(`${backendURL}/api/v1/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, passwordConfirm }),
    });

    const response = await res.json();

    if (response.status === "success") {
      const { cookieOptions, token, user } = response.data;

      // Set cookie
      document.cookie = `jwt=${token}; ${cookieOptions}`;
      localStorage.setItem("jwt", token);

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
      `${backendURL}/api/v1/users/verifyEmail/${user._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      }
    );

    const response = await res.json();

    if (response.status === "success") {
      return true;
    } else {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    // Make API call to login endpoint
    const res = await fetch(`${backendURL}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const response = await res.json();

    if (response.status === "success") {
      const { cookieOptions, token, user } = response.data;

      // Set cookie
      document.cookie = `jwt=${token}; ${cookieOptions}`;
      localStorage.setItem("jwt", token);

      // Set local storage
      localStorage.setItem("user", JSON.stringify(user));

      return true;
    } else {
      return false;
    }
  };

  const logout = async () => {
    // Get token from local storage
    const token = localStorage.getItem("jwt");

    // Make API call to logout endpoint
    const response = await fetch(`${backendURL}/api/v1/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Remove token from local storage
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      setIsLoggedIn(false);

      return true;
    } else {
      return false;
    }
  };

  const forgotPassword = async (email: string) => {
    // Make API call to forgot password endpoint
    const res = await fetch(`${backendURL}/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

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
      `${backendURL}/api/v1/users/resetPassword/${restToken}`,
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
        checkTokenValidity,
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
