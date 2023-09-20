import { useEffect, useState } from "react";
import { refreshAcc } from "../api/api";
import { useNavigate } from "react-router-dom";

const Redirectuser = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    refreshAcc<IAPIToken>()
      .then((res) => setToken(res.token))
      .catch((err: IAPIError) => {
        console.error(err.response.data.message);
        navigate("/home");
      });
  }, [navigate]);

  return token;
};

export default Redirectuser;
