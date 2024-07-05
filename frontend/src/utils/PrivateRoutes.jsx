import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useRecoilValue(userAtom);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
