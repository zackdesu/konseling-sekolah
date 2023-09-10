import { useEffect } from "react";
import { refreshAcc } from "../api/api";
import { useNavigate } from "react-router-dom";

const Redirectuser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    refreshAcc().catch((err: IAPIError) => {
      console.error(err.response.data.message);
      navigate("/home");
    });
  }, [navigate]);

  return null;
};

export default Redirectuser;
