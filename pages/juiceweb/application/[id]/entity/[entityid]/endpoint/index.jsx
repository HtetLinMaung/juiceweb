import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rest from "../../../../../../../utils/rest";
import moment from "moment";
import { useData } from "../../../../../../../hooks/custom-hooks";
import ColoredButton from "../../../../../../../components/ColoredButton";
import config from "../../../../../../../app.config.json";
import Link from "next/link";

const initState = {
  search: "",
};

export default function EndPoint() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [state, setState] = useData(initState);
  const [appname, setAppname] = useState("");

  const fetchEndpoints = async () => {
    if (router.query.entityid && router.query.id) {
      const [res, err] = await rest.get(
        `/api/endpoints?entityid=${router.query.entityid}&search=${state.search}`
      );
      if (!err) {
        setItems(res.data.data);
        setAppname(localStorage.getItem("appname"));
        // const [res2, err2] = await rest.get(
        //   `/api/endpoints?appid=${router.query.id}&name=auth/token/get-app-token`
        // );
        // if (!err2) {
        //   setItems([...res2.data.data, ...res.data.data]);
        // }
      }
    }
  };

  useEffect(() => {
    fetchEndpoints();
  }, [router.query.entityid, state.search]);

  const updateEndpoint = async (id, disabled) => {
    const [res, err] = await rest.put(`/api/endpoints/${id}`, {
      disabled,
    });
    if (!err) {
      fetchEndpoints();
    }
  };

  const requestHandler = (id) => {
    localStorage.setItem("click", "yes");
    router.push(
      `/juiceweb/application/${router.query.id}/entity/${router.query.entityid}/endpoint/${id}`
    );
  };

  return (
    <div className="container" style={{ paddingTop: "6rem" }}>
      <div className="mb-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/juiceweb/application">
                <a>Application</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href={`/juiceweb/application/${router.query.id}`}>
                <a>{appname || router.query.id}</a>
              </Link>
            </li>
            <li className="breadcrumb-item ">
              <Link href={`/juiceweb/application/${router.query.id}/entity`}>
                <a>Entity</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                href={`/juiceweb/application/${router.query.id}/entity/${router.query.entityid}`}
              >
                <a>{router.query.entityid}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              EndPoint
            </li>
          </ol>
        </nav>
      </div>
      {/* <h2 className="mb-5">EndPoint</h2> */}
      <div className="row mb-3">
        <div className="col-md-3">
          <div
            className="input-group raised"
            style={{
              borderRadius: 10,
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="basic-addon1"
              value={state.search}
              onChange={(e) => setState({ search: e.target.value })}
              style={{ border: 0 }}
            />
            <span
              className="input-group-text"
              id="basic-addon1"
              style={{
                background: "rgb(255, 255, 255)",
                borderRadius: "0px 10px 10px 0px",
                border: 0,
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-search fa-w-16 fa-3x"
                style={{ width: "1rem" }}
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  style={{ color: "grey" }}
                ></path>
              </svg>
            </span>
          </div>
          {/* <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={state.search}
            onChange={(e) => setState({ search: e.target.value })}
          /> */}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table __table" style={{ marginBottom: 0 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Method</th>
              <th>Name</th>
              <th>Key</th>
              <th>Url</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td
                  onClick={() =>
                    router.push(
                      `/juiceweb/application/${router.query.id}/entity/${router.query.entityid}/endpoint/${item._id}`
                    )
                  }
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: item.disabled ? "red" : "black",
                  }}
                >
                  {item._id}
                </td>
                <td>
                  <ColoredButton
                    item={item}
                    clickHandler={() => requestHandler(item._id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.key}</td>
                <td>{`${config.server_domain}${item.url}`}</td>
                <td>
                  {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  {item.disabled ? (
                    <button
                      onClick={() => updateEndpoint(item._id, false)}
                      className="btn btn-primary"
                      style={{ width: "7rem", marginRight: "1rem" }}
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      onClick={() => updateEndpoint(item._id, true)}
                      className="btn btn-danger"
                      style={{ width: "7rem", marginRight: "1rem" }}
                    >
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
