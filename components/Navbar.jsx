import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="py-3" style={{ position: "fixed", width: "100vw" }}>
      <div className="container">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div style={{ fontSize: "1.5rem" }}>Juice</div>
          <div className="d-flex">
            <button
              className="btn btn-primary"
              onClick={() => router.push("/juiceweb/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
