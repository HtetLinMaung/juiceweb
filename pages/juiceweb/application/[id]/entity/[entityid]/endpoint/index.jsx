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
    <div className="container" style={{ paddingTop: "9rem" }}>
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
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={state.search}
            onChange={(e) => setState({ search: e.target.value })}
          />
        </div>
      </div>

      <div className="card p-3">
        <table className="table" style={{ marginBottom: 0 }}>
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
