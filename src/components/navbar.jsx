import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton, ThemeButton } from "./Button";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className={`bg-transparent flex flex-row gap-2 justify-between p-6 z-20`}>
          <Link to="/">
          <div className="text-white">
            <span className='text-4xl font-semibold'>Mazelo</span>
            {/* <span>.com</span> */}
          </div></Link>
        {!isAuthenticated ?
          <>
            <div className="flex text-white">
              <Link to='/login'>
                <PrimaryButton className={"w-full md:w-40 mx-2"}>Login</PrimaryButton>
              </Link>
              <Link to='/register'>
                <ThemeButton className={"w-full md:w-40 mx-2"}>SignUp</ThemeButton>
              </Link>
            </div>
          </>
          :
          <>  <div className="flex text-white">
              <PrimaryButton
                className={"md:block hidden"}
              > Logged in as <span className="font-bold pl-1">{localStorage.getItem("username")}</span>!!</PrimaryButton>
              <Link to="/logout"><ThemeButton className={"w-full md:w-40 mx-2"}
               >Logout</ThemeButton></Link>
               </div>
          </>
        }
      </div>
    )
}
export default Navbar