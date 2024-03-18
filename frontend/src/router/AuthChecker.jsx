import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthChecker({ children }) {
  const nav = useNavigate();

  useEffect(() => {
    const userToken = sessionStorage.getItem("accessToken");
    const authentication = userToken ? true : false;

    if (!authentication) {
      nav("/login");
    }
  }, [nav]);

  return <>{children}</>;
}

export default AuthChecker;
