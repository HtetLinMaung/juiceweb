import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rest from "../../../utils/rest";

export default function Application() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  const fetchApplications = async () => {
    const [res, err] = await rest.get("/api/applications");
    if (!err) {
      setItems(res.data.data);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "9rem" }}>
      <h2 className="mb-5">Application</h2>
      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        {items.map((item, i) => (
          <button
            onClick={() => {
              router.push(`/juiceweb/application/${item._id}`);
            }}
            key={i}
            className="card btn"
            style={{
              width: 296,
              minHeight: 208,
              marginRight: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div
              className="card-body"
              style={{
                flexDirection: "column",
                width: "100%",
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 14, color: "grey" }} className="mb-1">
                {item.appname}
              </div>
              <div style={{ color: "grey" }}>{item.appendpoint}</div>
              <div
                className="d-flex"
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: "75%",
                }}
              >
                <svg
                  style={{ width: "1.5rem" }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="code"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="svg-inline--fa fa-code fa-w-18 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M234.8 511.7L196 500.4c-4.2-1.2-6.7-5.7-5.5-9.9L331.3 5.8c1.2-4.2 5.7-6.7 9.9-5.5L380 11.6c4.2 1.2 6.7 5.7 5.5 9.9L244.7 506.2c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1l27.2-29c3.1-3.3 2.8-8.5-.5-11.5L72.2 256l106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4L2.5 250.2c-3.4 3.2-3.4 8.5 0 11.7L140.3 391c3.2 3 8.2 2.8 11.3-.4zm284.1.4l137.7-129.1c3.4-3.2 3.4-8.5 0-11.7L435.7 121c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5L503.8 256l-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z"
                    className=""
                  ></path>
                </svg>
              </div>
            </div>
          </button>
        ))}
        <button
          onClick={() => {
            setTimeout(() => {
              router.push("/juiceweb/application/add");
            }, 500);
          }}
          className="card btn"
          style={{
            width: 296,
            minHeight: 208,
            marginRight: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            className="card-body center"
            style={{ flexDirection: "column", width: "100%" }}
          >
            <svg
              style={{ width: "1.5rem" }}
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="plus"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="svg-inline--fa fa-plus fa-w-12 fa-3x"
            >
              <path
                fill="currentColor"
                d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                className=""
              ></path>
            </svg>
            <div className="mt-4">Add Application</div>
          </div>
        </button>
      </div>
    </div>
  );
}
