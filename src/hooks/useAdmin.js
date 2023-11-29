import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider.js";


const useAdmin = () => {
    return useContext(AuthContext);
};

export default useAdmin;