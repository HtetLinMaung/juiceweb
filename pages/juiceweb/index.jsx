import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4" style={{ paddingTop: "14rem" }}>
          <h1 style={{ fontSize: "4rem" }}>Ready Made Codeless API</h1>
          <p>
            Save Time & Money to setup your powerful and secure backend API
            without any backend
          </p>
          <div className="d-flex">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/juiceweb/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
