import Link from "next/link";
import { useRouter } from "next/router";
import { useData } from "../../../hooks/custom-hooks";
import rest from "../../../utils/rest";

const initState = {
  userid: "",
  username: "",
  password: "",
};

export default function Signup() {
  const router = useRouter();
  const [state, setState] = useData(initState);

  const register = async () => {
    const [res, err] = await rest.post("/api/auth/register", { ...state });
    if (!err) {
      console.log(res);
      router.push("/juiceweb/login");
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
            Sign Up
          </h1>
          <div className="mb-3">
            <div className="mb-2" style={{ fontSize: 13 }}>
              What is your name?
            </div>
            <input
              type="text"
              className="form-control"
              value={state.username}
              onChange={(e) => setState({ username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <div className="mb-2" style={{ fontSize: 13 }}>
              Email
            </div>
            <input
              type="text"
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
              type="password"
              className="form-control"
              value={state.password}
              onChange={(e) => setState({ password: e.target.value })}
            />
          </div>
          <button
            onClick={register}
            style={{ width: "100%" }}
            className="btn btn-primary mb-3"
          >
            Create Account
          </button>
          <div style={{ textAlign: "center", fontSize: 12 }}>
            Already have an account?{" "}
            <Link href="/juiceweb/login">
              <a>Sign in</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
