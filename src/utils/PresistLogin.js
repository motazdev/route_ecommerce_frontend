import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useRefreshToken from "../hooks/useRefreshToken.js";
import { Loading } from "../pages/Loading.jsx";

const PresistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const { auth, presist } = useAuth();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log("authh press : ", auth);
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    // if (!auth?.accessToken) {
    //     verifyRefreshToken();
    // }
    !auth?.accessTokken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  // if(!presist) {
  //     <Outlet />
  // } else {
  //   if(isLoading) {
  //       <p>loading...</p>
  // } else {
  //     <Outlet />
  // }
  return <>{<Outlet />}</>;
};

export default PresistLogin;
