import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { NEXT_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // register
  const register = async (user) => {
    console.log(user);
  };

  // login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // logout
  const logout = async () => {
    console.log('logout');
  };

  // check is login
  const checkUserLoggedIn = async (user) => {
    console.log('check');
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
