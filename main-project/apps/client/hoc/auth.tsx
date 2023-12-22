'use client'
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/store";
import useAuthenticator from "../hooks/use-authenticator";
import { setIsAuth, setUser } from "../store/slices/user.slice";
import { useEffect } from "react";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const isAuth = useAppSelector((s) => s.user.isAuthenticated);
    const { mutation } = useAuthenticator();

    useEffect(() => {
      const authenticateUser = async () => {
        try {
          await mutation.mutateAsync();

        } catch (error) {
          router.push("/");
        }
      };

      if (!isAuth) {
        authenticateUser();
      }
    }, [isAuth, mutation, router]);

    if (isAuth) {
      return <Component {...props} />;
    }

    // You might want to return a loading state or placeholder here
    return null;
  };

  return Auth;
};

export default withAuth;
