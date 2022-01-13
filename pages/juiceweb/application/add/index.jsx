import { useRouter } from "next/router";
import { useState } from "react";
import rest from "../../../../utils/rest";

export default function AddApplication() {
  const router = useRouter();
  const [appname, setAppname] = useState("");

  const createApp = async () => {
    if (appname) {
      const [res, err] = await rest.post("/api/applications", { appname });
      if (!err) {
        router.push(`/juiceweb/application/${res.data.data._id}`);
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "9rem" }}>
      <div className="row">
        <div className="col-md-5">
          <div className="mb-5">
            <svg
              onClick={() => router.push("/juiceweb/application")}
              style={{ width: "1.5rem", color: "grey" }}
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="times"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="svg-inline--fa fa-times fa-w-10 fa-3x"
            >
              <path
                fill="currentColor"
                d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                className=""
              ></path>
            </svg>
          </div>
          <h2 className="mb-5">Create New Application</h2>
          <input
            type="text"
            className="form-control mb-5"
            placeholder="What is your application name?"
            value={appname}
            onChange={(e) => setAppname(e.target.value)}
          />
          <button
            onClick={createApp}
            className="btn btn-primary mt-5"
            style={{ width: "50%" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
