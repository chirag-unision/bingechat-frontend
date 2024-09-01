import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "./Button";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className={`bg-primary flex flex-row gap-2 py-2 justify-end px-1`}>
        {!isAuthenticated ?
          <>
            <Link to='/login'>
              <PrimaryButton>Login</PrimaryButton>
            </Link>
            <Link to='/register'>
              <SecondaryButton className={"bg-white"}>SignUp</SecondaryButton>
            </Link>
          </>
          :
          <>  
              <PrimaryButton
                  onClick={()=>{
                    document.getElementById("accountdialog").showModal();
                  }}
              > Logged in as <b>{localStorage.getItem("username")}</b>!!</PrimaryButton>
              <Link to="/logout"><SecondaryButton className={"bg-red"}
               >Logout</SecondaryButton></Link>
          </>
        }
      </div>
    )
}
export default Navbar