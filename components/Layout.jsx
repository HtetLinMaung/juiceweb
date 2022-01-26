import Navbar from "./Navbar";
import Script from "next/script";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  console.log(router.route);

  return (
    <>
      <Script src="/js/bootstrap.bundle.min.js" />

      <div className="d-flex" style={{ height: "100vh" }}>
        {!router.route.includes("login") &&
        !router.route.includes("signup") &&
        router.route != "/juiceweb" ? (
          <div className="side-bar" style={{ paddingTop: "6.5rem" }}>
            <div
              className={
                router.route.includes("/juiceweb/home")
                  ? "side-bar-item active"
                  : "side-bar-item"
              }
              onClick={() => router.push("/juiceweb/home")}
            >
              <svg
                className="home-icon"
                style={{ width: "1.3rem" }}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="33"
                viewBox="0 0 30 33"
              >
                <g
                  id="Icon_feather-home"
                  data-name="Icon feather-home"
                  transform="translate(-3 -1.5)"
                >
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M4.5,13.5,18,3,31.5,13.5V30a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3Z"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                  />
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M13.5,33V18h9V33"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                  />
                </g>
              </svg>
            </div>
            <div
              className={
                router.route.includes("/juiceweb/application")
                  ? "side-bar-item active"
                  : "side-bar-item"
              }
              onClick={() => router.push("/juiceweb/application")}
            >
              <svg
                className="app-icon"
                style={{ width: "1.3rem" }}
                xmlns="http://www.w3.org/2000/svg"
                width="27.007"
                height="27.002"
                viewBox="0 0 27.007 27.002"
              >
                <g
                  id="Icon_ionic-ios-apps"
                  data-name="Icon ionic-ios-apps"
                  transform="translate(-4.493 -4.496)"
                >
                  <path
                    id="Path_3"
                    data-name="Path 3"
                    d="M30.572,9.675l-10.5-4.788a5.689,5.689,0,0,0-4.141,0L5.428,9.675c-1.237.562-1.237,1.484,0,2.046l10.406,4.746a5.978,5.978,0,0,0,4.331,0l10.406-4.746C31.809,11.159,31.809,10.238,30.572,9.675Z"
                  />
                  <g id="Group_1" data-name="Group 1">
                    <path
                      id="Path_4"
                      data-name="Path 4"
                      d="M15.834,26.381l-7.017-3.2a1.141,1.141,0,0,0-.935,0L5.428,24.3c-1.238.563-1.238,1.484,0,2.046l10.406,4.746a5.978,5.978,0,0,0,4.331,0l10.406-4.746c1.237-.562,1.237-1.484,0-2.046l-2.454-1.118a1.141,1.141,0,0,0-.935,0l-7.017,3.2A5.978,5.978,0,0,1,15.834,26.381Z"
                    />
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M30.572,16.987l-2.229-1.012a1.125,1.125,0,0,0-.928,0l-7.594,3.438a6.207,6.207,0,0,1-3.649,0L8.578,15.975a1.125,1.125,0,0,0-.928,0L5.421,16.987c-1.238.563-1.238,1.484,0,2.046L15.827,23.78a5.978,5.978,0,0,0,4.331,0l10.406-4.746C31.809,18.471,31.809,17.55,30.572,16.987Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        ) : (
          ""
        )}
        <div style={{ flex: 1 }}>
          {!router.route.includes("login") &&
          !router.route.includes("signup") ? (
            <Navbar />
          ) : (
            ""
          )}
          <main
            style={{
              paddingLeft:
                router.route.includes("login") ||
                router.route.includes("signup") ||
                router.route == "/juiceweb"
                  ? 0
                  : "7rem",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
