import { useAppSelector } from "@hooks/useAppStore";
import { User } from "@lib/types/user";
import { createContext, PropsWithChildren, useContext } from "react";

type AuthProviderProps = PropsWithChildren;

type AuthProviderState = {
  user: User;
  token: string;
  isSignedIn?: boolean;
  isAdmin?: boolean;
};

const AuthProviderContext = createContext<AuthProviderState | undefined>(
  undefined
);

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const { user, token } = useAppSelector((state) => state.auth);

  const value = {
    user: user as User,
    token: token as string,
    isSignedIn: user !== null && token !== null,
    isAdmin: user?.role.name === "admin",
  };

  return (
    <AuthProviderContext.Provider value={value} {...props}>
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);

  if (!context) {
    throw new Error("useAuth must be within the AuthProvider");
  }

  return context;
};
