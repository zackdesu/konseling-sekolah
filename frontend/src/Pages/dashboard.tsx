import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { infoAcc } from "../api/api";
import Redirectuser from "../utils/redirecthome";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = Redirectuser();
  const [user, setUser] = useState<IProfile>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    infoAcc<IProfile>(token)
      .then((res) => {
        if (!res.isAdmin) navigate("/");
        setUser(res);
      })
      .catch((err: IAPIError) => toast.error(err.response.data.message));
  }, [navigate, user, token]);

  if (!user || !user.isAdmin) return;

  return (
    <div className="py-20">
      <h2>Dashboard</h2>
      <Link to={"/settings/admin/counselor"}>Pilih konselor</Link>
    </div>
  );
};

export default Dashboard;
