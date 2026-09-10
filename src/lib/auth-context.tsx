import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  language: string;
  level: string;
  createdAt: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (data: { email: string; password: string; name: string; language: string }) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AUTH_KEY = "langfly_auth_user";
const USERS_KEY = "langfly_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(AUTH_KEY) : null;
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user, ready]);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { error: "No account found with that email." };
    const passwords = getPasswords();
    if (passwords[found.id] !== password) return { error: "Incorrect password." };
    setUser(found);
    return {};
  };

  const signup = async (data: { email: string; password: string; name: string; language: string }) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { error: "An account with this email already exists." };
    }
    const id = `u_${Date.now()}`;
    const user: User = {
      id,
      email: data.email,
      name: data.name,
      language: data.language,
      level: "A1",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    setUsers(users);
    const passwords = getPasswords();
    passwords[id] = data.password;
    setPasswords(passwords);
    setUser(user);
    return {};
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function getUsers(): User[] {
  const raw = typeof window !== "undefined" ? localStorage.getItem(USERS_KEY) : null;
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function setUsers(users: User[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

function getPasswords(): Record<string, string> {
  const raw = typeof window !== "undefined" ? localStorage.getItem("langfly_passwords") : null;
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function setPasswords(passwords: Record<string, string>) {
  if (typeof window !== "undefined") {
    localStorage.setItem("langfly_passwords", JSON.stringify(passwords));
  }
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
