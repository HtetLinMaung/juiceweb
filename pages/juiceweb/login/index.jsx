import Link from "next/link";
import { useRouter } from "next/router";
import { useData } from "../../../hooks/custom-hooks";
import iamrest from "../../../utils/iamrest";
import rest from "../../../utils/rest";

const initState = {
  appid: "juice",
  userid: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const [state, setState] = useData(initState);

  const login = async () => {
    const [res, err] = await iamrest.post("/auth/login", { ...state });
    if (!err) {
      localStorage.setItem("iamtoken", res.data.token);
      const [res2, err2] = await rest.get(
        `/api/auth/get-app-token?token=${res.data.token}`
      );
      if (!err2) {
        localStorage.setItem("token", res2.data.token);
        router.push("/juiceweb/application");
      }
    }
  };

  return (
    <div
      className="center"
      style={{
        height: "100vh",
      }}
    >
      <div className="card signup-card">
        <div className="card-body">
          <h1 className="mb-5" style={{ textAlign: "center" }}>
            Login
          </h1>

          <div className="mb-3">
            <div className="mb-2" style={{ fontSize: 13 }}>
              Email
            </div>
            <input
              type="text"
              name="username"
              className="form-control"
              value={state.userid}
              onChange={(e) => setState({ userid: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2" style={{ fontSize: 13 }}>
              Password
            </div>
            <input
              name="password"
              type="password"
              className="form-control"
              value={state.password}
              onChange={(e) => setState({ password: e.target.value })}
            />
          </div>
          <button
            onClick={login}
            style={{ width: "100%" }}
            className="btn btn-primary mb-3"
          >
            Login
          </button>
          <div style={{ textAlign: "center", fontSize: 12 }}>
            Don&rsquo;t have an account?{" "}
            <Link href="/juiceweb/signup">
              <a>Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
