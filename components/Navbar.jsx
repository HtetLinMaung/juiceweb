import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useData } from "../hooks/custom-hooks";

const initState = {
  token: "",
};

export default function Navbar() {
  const router = useRouter();
  const [state, setState] = useData(initState);

  const handleSignOut = () => {
    localStorage.clear();
    router.push("/juiceweb/login");
    setState({ ...initState });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token &&
      !router.route.includes("/juiceweb/signup") &&
      !router.route.includes("/juiceweb")
    ) {
      router.push("/juiceweb/login");
    } else {
      setState({ token: localStorage.getItem("token") });
    }
  }, [router.route]);

  return (
    <div className="d-flex">
      <nav
        className="py-3"
        style={{
          position: "fixed",
          flex: 1,
          right: 0,
          left: router.route == "/juiceweb" ? 0 : "7rem",
        }}
      >
        <div className="container">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div style={{ fontSize: "1.5rem" }}>Juice</div>
            <div className="d-flex">
              {state.token ? (
                <div className="dropdown">
                  <a
                    className="top__nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      style={{ width: "2.5rem", margin: 0 }}
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fad"
                      data-icon="user-circle"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      className="svg-inline--fa fa-user-circle fa-w-16 fa-3x"
                    >
                      <g className="fa-group">
                        <path
                          style={{ color: "#9ad6df" }}
                          fill="currentColor"
                          d="M248,8C111,8,0,119,0,256S111,504,248,504,496,393,496,256,385,8,248,8Zm0,96a88,88,0,1,1-88,88A88,88,0,0,1,248,104Zm0,344a191.61,191.61,0,0,1-146.5-68.2C120.3,344.4,157.1,320,200,320a24.76,24.76,0,0,1,7.1,1.1,124.67,124.67,0,0,0,81.8,0A24.76,24.76,0,0,1,296,320c42.9,0,79.7,24.4,98.5,59.8A191.61,191.61,0,0,1,248,448Z"
                        ></path>
                        <path
                          style={{ color: "#3aaabf" }}
                          fill="currentColor"
                          d="M248,280a88,88,0,1,0-88-88A88,88,0,0,0,248,280Zm48,40a24.76,24.76,0,0,0-7.1,1.1,124.67,124.67,0,0,1-81.8,0A24.76,24.76,0,0,0,200,320c-42.9,0-79.7,24.4-98.5,59.8,68.07,80.91,188.84,91.32,269.75,23.25A192,192,0,0,0,394.5,379.8C375.7,344.4,338.9,320,296,320Z"
                        ></path>
                      </g>
                    </svg>
                  </a>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" onClick={handleSignOut}>
                        Sign Out
                      </a>
                    </li>
                    {/* <li>
               <a className="dropdown-item" href="#">
                 Another action
               </a>
             </li>
             <li>
               <a className="dropdown-item" href="#">
                 Something else here
               </a>
             </li> */}
                  </ul>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => router.push("/juiceweb/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
