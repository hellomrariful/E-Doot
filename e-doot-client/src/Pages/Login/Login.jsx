import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loggedError, setLoggedError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, signUpWithGoogle, signUpWithGithub } = useContext(AuthContext);

  const handelLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    setLoggedError("");

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        const displayErrorToast = () => {
          toast.dismiss("error-toast");
          toast.success("Logged Successfully", {
            id: "error-toast",
            duration: 2000,
            style: {
              padding: "14px",
              color: "#524FF5",
            },
            iconTheme: {
              primary: "#A1F65E",
              secondary: "#FFFFFF",
            },
          });
        };
        displayErrorToast();

        setTimeout(() => {
          navigate(location?.state ? location.state : "/chat");
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setLoggedError(err.message);
      });
  };

  const handelGoogleLogIn = (e) => {
    e.preventDefault();
    signUpWithGoogle()
      .then((result) => {
        console.log(result);
        const displayErrorToast = () => {
          toast.dismiss("error-toast");
          toast.success("Logged Successfully", {
            id: "error-toast",
            duration: 2000,
            style: {
              padding: "14px",
              color: "#524FF5",
            },
            iconTheme: {
              primary: "#A1F65E",
              secondary: "#FFFFFF",
            },
          });
        };
        displayErrorToast();

        setTimeout(() => {
          navigate(location?.state ? location.state : "/chat");
        }, 1000);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };



  const handelGithubLogIn = (e) => {
    e.preventDefault();
    signUpWithGithub()
      .then((result) => {
        console.log(result);
        const displayErrorToast = () => {
          toast.dismiss("error-toast");
          toast.success("Logged Successfully", {
            id: "error-toast",
            duration: 2000,
            style: {
              padding: "14px",
              color: "#524FF5",
            },
            iconTheme: {
              primary: "#A1F65E",
              secondary: "#FFFFFF",
            },
          });
        };
        displayErrorToast();

        setTimeout(() => {
          navigate(location?.state ? location.state : "/chat");
        }, 1000);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <div className="flex w-60 items-center text-center mx-auto px-6">
        {/* <img src={tripify} alt="" /> */}
      </div>
      <div className="flex justify-center">
        <div className=" px-8 py-12 bg-[#F7FAFC] rounded-2xl drop-shadow-2xl">
          <div className="relative flex flex-col shadow-none">
            <h4 className="block text-center text-[22px]">Log in to Tasky</h4>
            <div>
              {loggedError && (
                <p className="border-2 p-3 mt-6 border-[#de4523] bg-[#ffebe8]  text-black rounded">
                  {loggedError}
                </p>
              )}
            </div>

            <form
              onSubmit={handelLogin}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-4 flex flex-col gap-6">
                <div className="relative h-11 w-full min-w-[200px]">
                  <input
                    name="email"
                    type="email"
                    placeholder=""
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#A1F65E] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#524FF5] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#A1F65E] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#A1F65E] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                  </label>
                </div>

                <div className="relative h-11 w-full min-w-[200px] flex items-center">
                  <input
                    type={show ? "text" : "password"}
                    required
                    name="password"
                    placeholder=""
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#A1F65E] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />

                  <div className="absolute right-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission
                        setShow(!show);
                      }}
                    >
                      {show ? <FaEyeSlash /> : <FaEye></FaEye>}
                    </button>
                  </div>

                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#524FF5] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#A1F65E] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#A1F65E] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                  </label>
                </div>
              </div>
              <div className="text-center">
                <label className=" cursor-pointer select-none font-light text-gray-700">
                  <p className="font-normal text-[#524FF5] antialiased">
                    <a
                      className="font-medium transition-colors hover:text-[#A1F65E]"
                      href="#"
                    >
                      &nbsp;Forgot password?
                    </a>
                  </p>
                </label>
              </div>
              <button
                className="mt-6 block w-full select-none rounded-lg
             bg-[#524FF5] py-3 px-6 text-center align-middle font-sans font-bold uppercase text-white shadow-md shadow-[#6b6f68] transition-all hover:shadow-md
               focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                data-ripple-light="true"
              >
                Login
              </button>
              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-medium text-[#524FF5] transition-colors hover:text-[#A1F65E]"
                >
                  {" "}
                  Register
                </Link>
              </p>
              <p className=" flex items-center mt-5">
                <p className="border-t-2 w-1/2"></p>
                <p className="px-2">Or</p>
                <p className="border-t-2 w-1/2"></p>
              </p>
            </form>
            <button
              onClick={handelGoogleLogIn}
              className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
            >
              <div className="py-2">
                <svg className="w-6 h-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign In with Google
              </span>
            </button>
            <button
              onClick={handelGithubLogIn}
              className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
            >
              <div className="py-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Sign In with Github
              </span>
            </button>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={true}></Toaster>
      </div>
    </div>
  );
};

export default Login;
