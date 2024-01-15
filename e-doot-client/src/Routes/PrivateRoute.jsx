import { Navigate, useLocation } from "react-router";
import { Oval } from "react-loader-spinner";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return  <div className="flex justify-center items-center h-screen">
        <Oval
          height={50}
          width={50}
          color=" #FF444A"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#FF444A"
          strokeWidth={4}
          strokeWidthSecondary={2}
        />
      </div>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;