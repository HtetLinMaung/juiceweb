import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useData } from "../../../../../../../../hooks/custom-hooks";
import rest from "../../../../../../../../utils/rest";
import iamrest from "../../../../../../../../utils/iamrest";
import ColoredButton from "../../../../../../../../components/ColoredButton";
import config from "../../../../../../../../app.config.json";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const initState = {
  name: "",
  disabled: false,
  guardtoken: false,
  key: "",
  method: "get",
  url: "",
};

export default function EndPointDetail() {
  const router = useRouter();
  const [state, setState] = useData(initState);
  const [result, setResult] = useState("");
  const [body, setBody] = useState("");
  const [duration, setDuration] = useState(0);
  const [token, setToken] = useState("");

  const generateToken = async (userid, password) => {
    const [res, err] = await iamrest.post("/auth/login", {
      appid: router.query.id,
      userid,
      password,
    });

    if (!err) {
      const [res2, err2] = await rest.get(
        `/api/endpoints?appid=${router.query.id}&name=auth/token/get-app-token`
      );
      if (!err2) {
        const result = await axios.get(
          `${config.server_domain}${res2.data.data[0].url}?token=${res.data.token}`
        );
        setToken(result.data.token);
        localStorage.setItem(`${router.query.id}_token`, result.data.token);
      }
    }
  };

  const fetchEndpoint = async () => {
    if (router.query.endpointid) {
      setToken(localStorage.getItem(`${router.query.id}_token`) || "");
      const [res, err] = await rest.get(
        `/api/endpoints/${router.query.endpointid}`
      );
      if (!err) {
        let url = config.server_domain + res.data.data.url;
        if (url.includes("auth/token/get-app-token")) {
          url += "?token=";
        }
        setState({
          ...res.data.data,
          url,
        });
        setBody(res.data.request);
      }
    }
  };

  useEffect(() => {
    fetchEndpoint();
  }, [router.query.endpointid]);

  useEffect(() => {
    const click = localStorage.getItem("click");
    if (state.url && click == "yes") {
      requestHandler();
      localStorage.setItem("click", "no");
    }
  }, [state.url]);

  const updateEndpoint = async (body) => {
    const [res, err] = await rest.put(
      `/api/endpoints/${router.query.endpointid}`,
      body
    );
    if (!err) {
      fetchEndpoint();
    }
  };

  const requestHandler = () => {
    const jsoneditor = document.getElementById("body");

    let promise = null;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (state.method == "get") {
      promise = axios.get(state.url, options);
    } else if (state.method == "post") {
      try {
        const body = JSON.parse(jsoneditor.textContent);
        promise = axios.post(state.url, body, options);
      } catch (e) {
        console.log(e);
      }
    } else if (state.method == "put") {
      try {
        const body = JSON.parse(jsoneditor.textContent);
        promise = axios.put(state.url, body, options);
      } catch (e) {
        console.log(e);
      }
    } else if (state.method == "delete") {
      promise = axios.delete(state.url, options);
    }
    if (promise) {
      const starttime = moment();
      promise
        .then((res) => {
          setDuration(moment().diff(starttime));
          setResult(JSON.stringify(res, undefined, 2));
        })
        .catch((err) => {
          setDuration(moment().diff(starttime));
          setResult(JSON.stringify(err.response, undefined, 2));
        });
    }
  };

  return (
    <div className="container" style={{ paddingTop: "9rem" }}>
      <h2 className="mb-5">{state.name}</h2>
      <div className="d-flex mb-5">
        <button
          onClick={() => updateEndpoint({ key: state.key })}
          className="btn btn-primary"
          style={{ width: "8rem", marginRight: "1rem" }}
        >
          Update
        </button>

        {state.disabled ? (
          <button
            onClick={() => updateEndpoint({ disabled: false })}
            className="btn btn-primary"
            style={{ width: "8rem", marginRight: "1rem" }}
          >
            Enable
          </button>
        ) : (
          <button
            onClick={() => updateEndpoint({ disabled: true })}
            className="btn btn-danger"
            style={{ width: "8rem", marginRight: "1rem" }}
          >
            Disable
          </button>
        )}

        {!state.guardtoken ? (
          <button
            onClick={() => updateEndpoint({ guardtoken: true })}
            className="btn btn-success"
            style={{ width: "10rem", marginRight: "1rem" }}
          >
            Guard Token
          </button>
        ) : (
          <button
            onClick={() => updateEndpoint({ guardtoken: false })}
            className="btn btn-danger"
            style={{ width: "10rem", marginRight: "1rem" }}
          >
            UnGuard Token
          </button>
        )}

        {state.guardtoken ? (
          <button
            onClick={() => {
              Swal.fire({
                title: "IAM Login",

                html: `<div>
                <div style="text-align: left; margin-bottom: 0.5rem">User ID</div>
                <input id="iamuserid"  type="text" class="form-control" style="outline: none; box-shadow: none; margin-bottom: 1rem" />

                <div style="text-align: left; margin-bottom: 0.5rem">Password</div>
                <input id="iampassword"  type="password" class="form-control" style="outline: none; box-shadow: none; margin-bottom: 1rem" />
                  </div>`,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Login',
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
                cancelButtonAriaLabel: "Thumbs down",
              }).then((result) => {
                if (result.isConfirmed) {
                  const userid = document.getElementById("iamuserid").value;
                  const password = document.getElementById("iampassword").value;
                  generateToken(userid, password);
                }
              });
            }}
            className="btn btn-success"
            style={{ width: "10rem", marginRight: "1rem" }}
          >
            Generate Token
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="row mb-5">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Access Key"
            value={state.key}
            onChange={(e) => setState({ key: e.target.value })}
          />
        </div>
      </div>

      <hr />

      <div className="row my-5" style={{ alignItems: "center" }}>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            value={state.url}
            onChange={(e) => setState({ url: e.target.value })}
          />
        </div>
        <div className="col-md-1">
          <ColoredButton item={state} clickHandler={requestHandler} />
        </div>
      </div>

      {state.guardtoken ? (
        <div className="row my-5">
          <div className="col-md-5">
            <textarea
              style={{ minHeight: 139 }}
              placeholder="Authorization"
              className="form-control"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></textarea>
          </div>
        </div>
      ) : (
        ""
      )}

      <h5>Request</h5>
      <pre
        id="body"
        contentEditable="true"
        className="card"
        style={{
          backgroundColor: "#FFFFFF",
          height: 250,
          borderRadius: "1rem",
          padding: "1rem",
          outline: "none",
          overflow: "auto",
          marginBottom: "2rem",
          fontSize: "1.2rem",
        }}
      >
        {body}
      </pre>

      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h5>Response</h5>
        <div>{moment.duration(duration).asSeconds()} s</div>
      </div>

      <pre
        id="result"
        style={{
          backgroundColor: "black",
          height: 300,
          borderRadius: "1rem",
          padding: "1rem",
          overflowY: "auto",
          marginBottom: "2rem",
          color: "white",
          fontSize: "1.2rem",
        }}
      >
        <code> {result}</code>
      </pre>

      {/* <div className="custom-modal">
        <div className="card">
          <h1>Modal</h1>
        </div>
      </div> */}
    </div>
  );
}
