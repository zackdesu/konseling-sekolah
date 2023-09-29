import { useEffect, useState } from "react";
import { refreshAcc } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

const Redirectuser = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const path = useLocation().pathname;

  useEffect(() => {
    if (path === "/home" || path === "/login" || path === "/register") return;
    refreshAcc<IAPIToken>()
      .then((res) => setToken(res.token))
      .catch((err: IAPIError) => {
        console.error(err.response.data.message);
        navigate("/home");
      });
  }, [path, navigate]);

  return token;
};

export default Redirectuser;
