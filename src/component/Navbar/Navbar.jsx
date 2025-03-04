import { useContext, useEffect } from "react";
import "flowbite";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/notelogo.png";
import { authContext } from "../../Context/AuthContext";
import Swal from 'sweetalert2'


export default function Navbar() {
  const { Token, setToken } = useContext(authContext)
  const navigate = useNavigate()
  useEffect(() => {
    import("flowbite");
  }, []);

  function logOut() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        setToken(null)
        localStorage.removeItem('userToken')
        navigate('/login')
      }
    });
   
  }

  return (
    <nav className="bg-white ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={'/'}>
          <img src={logo} className="h-14" alt="Flowbite Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >

          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>


        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">


            {Token ? <>
              <li className="mb-1 lg:mb-0">
                <NavLink to="" className="lg:block   text-stone-700    p-1">
                  Notes
                </NavLink>
              </li>

              <li className="mb-1 lg:mb-0">
                <span onClick={() => logOut()}  className="lg:block cursor-pointer text-stone-700 p-1 ">
                  Sign Out
                </span>
              </li>
            </> : <>

              <li className="mb-1 lg:mb-0">
                <NavLink to="/login" className="lg:block   text-stone-700   p-1">
                  Login
                </NavLink>
              </li>
              <li className="mb-1 lg:mb-0">
                <NavLink to="/register" className="lg:block   text-stone-700   p-1">
                  Register
                </NavLink>
              </li>
            </>}

          </ul>
        </div>
      </div>
    </nav>
  );
}
