"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../store/store";
import useAuthenticator from "../hooks/use-authenticator";
import { setIsAuth, setUser } from "../store/slices/user.slice";
import { useEffect } from "react";
import useReflection from "@/hooks/useReflection";

const withAuth = (Component: React.FC) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const isAuth = useAppSelector((s) => s.user.isAuthenticated);
    const { mutation } = useAuthenticator();
    const { reflector } = useReflection();

    useEffect(() => {
      const authenticateUser = async () => {
        reflector({type: 'loading', payload: null, isLoading: true})
        try {
          await mutation.mutateAsync();
        } catch (error) {
          router.push("/");
        }
        reflector({type: 'loading', payload: null, isLoading: false})
      };

      if (!isAuth) {
        authenticateUser();
      }
    }, [isAuth]);

    if (isAuth) {
      return <Component {...props} />;
    }

    // You might want to return a loading state or placeholder here
    return null;
  };

  return Auth;
};

export default withAuth;
