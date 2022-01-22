import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useData } from "../../../../../hooks/custom-hooks";
import rest from "../../../../../utils/rest";
import Link from "next/link";

const initState = {
  _id: "",
  secret: "",
  appname: "",
  tokenexpiresin: "",
  storageid: "",
  storagekey: "",
};

export default function Setting() {
  const router = useRouter();
  const [state, setState] = useData({ ...initState });

  const fetchApp = async () => {
    if (router.query.id) {
      const [res, err] = await rest.get(`/api/applications/${router.query.id}`);
      if (!err) {
        setState(res.data.data);
      }
    }
  };

  const updateApp = async () => {
    const [res, err] = await rest.put(
      `/api/applications/${router.query.id}`,
      state
    );
    if (!err) {
      fetchApp();
    }
  };

  const deleteApp = async () => {
    const [res, err] = await rest.delete(
      `/api/applications/${router.query.id}`
    );
    if (!err) {
    }
  };

  useEffect(() => {
    fetchApp();
  }, [router.query.id]);

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
                <a>{state.appname || router.query.id}</a>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Setting
            </li>
          </ol>
        </nav>
      </div>
      {/* <h2 className="mb-5">Setting</h2> */}

      <div className="row mb-5">
        <div className="col-md-4">
          <button
            onClick={updateApp}
            className="btn btn-success"
            style={{ width: "8rem", marginRight: "2rem" }}
          >
            Save
          </button>
          <button
            onClick={() => {
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
              });

              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteApp().then(() => {
                    swalWithBootstrapButtons
                      .fire("Deleted!", "Your app has been deleted.", "success")
                      .then(() => {
                        router.push(`/juiceweb/application`);
                      });
                  });
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    "Cancelled",
                    "Your app is safe :)",
                    "error"
                  );
                }
              });
            }}
            className="btn btn-danger"
            style={{ width: "8rem" }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-1">ID</div>
        <div className="col-md-3">{router.query.id}</div>
      </div>

      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-1">Storage ID</div>
        <div className="col-md-3">{state.storageid}</div>
      </div>

      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-1">Storage key</div>
        <div className="col-md-3">{state.storagekey}</div>
      </div>

      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-1">App Name</div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            value={state.appname}
            onChange={(e) => setState({ appname: e.target.value })}
          />
        </div>
      </div>

      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-1">Secret</div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            value={state.secret}
            onChange={(e) => setState({ secret: e.target.value })}
          />
        </div>
      </div>

      <div className="row mb-5" style={{ alignItems: "center" }}>
        <div className="col-md-1">Token Duration</div>
        <div className="col-md-1">
          <input
            type="text"
            className="form-control"
            value={state.tokenexpiresin}
            onChange={(e) => setState({ tokenexpiresin: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
