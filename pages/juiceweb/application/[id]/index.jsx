import { useRouter } from "next/router";
import { useEffect } from "react";
import { useData } from "../../../../hooks/custom-hooks";
import rest from "../../../../utils/rest";

const initState = {
  _id: "",
  appname: "",
  appendpoint: "",
};

export default function ApplicationDetail() {
  const router = useRouter();
  const [state, setState] = useData(initState);

  const fetchApp = async () => {
    if (router.query.id) {
      const [res, err] = await rest.get(`/api/applications/${router.query.id}`);
      if (!err) {
        setState({
          ...res.data.data,
        });
      }
    }
  };

  useEffect(() => {
    fetchApp();
  }, [router.query.id]);

  return (
    <div className="container" style={{ paddingTop: "9rem" }}>
      <h2 className="mb-5">{state.appname}</h2>
      <div className="d-flex " style={{ flexWrap: "wrap" }}>
        <button
          onClick={() => {
            setTimeout(() => {
              router.push(`/juiceweb/application/${router.query.id}/entity`);
            }, 500);
          }}
          className="btn card"
          style={{ minWidth: 130, marginRight: "1rem" }}
        >
          <div className="card-body " style={{ width: "100%" }}>
            <div
              className="d-flex center"
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <svg
                  style={{ width: "1.5rem" }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="table"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-table fa-w-16 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM160 448H48c-8.837 0-16-7.163-16-16v-80h128v96zm0-128H32v-96h128v96zm0-128H32V96h128v96zm160 256H192v-96h128v96zm0-128H192v-96h128v96zm0-128H192V96h128v96zm160 160v80c0 8.837-7.163 16-16 16H352v-96h128zm0-32H352v-96h128v96zm0-128H352V96h128v96z"
                    className=""
                  ></path>
                </svg>
              </div>
              <div>Entity</div>
            </div>
          </div>
        </button>{" "}
        <button
          onClick={() => {
            setTimeout(() => {
              router.push(`/juiceweb/application/${router.query.id}/sequence`);
            }, 500);
          }}
          className="btn card"
          style={{ minWidth: 130, marginRight: "1rem" }}
        >
          <div className="card-body " style={{ width: "100%" }}>
            <div
              className="d-flex center"
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <svg
                  style={{ width: "1.5rem" }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="list-ol"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-list-ol fa-w-16 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M61.77 401l17.5-20.15a19.92 19.92 0 0 0 5.07-14.19v-3.31C84.34 356 80.5 352 73 352H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h22.84a154.82 154.82 0 0 0-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.3 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 0 1-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.73 6.13-3.2 11.72 2.62 15.94 7.71 4.69 20.39 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zM496 392H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM16 160h64a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H64V40a8 8 0 0 0-8-8H32a8 8 0 0 0-7.14 4.42l-8 16A8 8 0 0 0 24 64h8v64H16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8zm-3.9 160H80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H41.33c3.28-10.29 48.33-18.68 48.33-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.45 18.75-4.38 5.59-3 10.84 2.79 15.37l8.58 6.88c5.61 4.56 11 2.47 16.13-2.44a13.4 13.4 0 0 1 9.45-3.84c3.33 0 9.28 1.56 9.28 8.75C51 248.19 0 257.31 0 304.59v4C0 316 5.08 320 12.1 320z"
                    className=""
                  ></path>
                </svg>
              </div>
              <div>Sequence</div>
            </div>
          </div>
        </button>
        <button
          onClick={() => {
            setTimeout(() => {
              router.push(`/juiceweb/application/${router.query.id}/setting`);
            }, 500);
          }}
          className="btn card"
          style={{ minWidth: 130, marginRight: "1rem" }}
        >
          <div className="card-body " style={{ width: "100%" }}>
            <div
              className="d-flex center"
              style={{ justifyContent: "space-between" }}
            >
              <div>
                <svg
                  style={{ width: "1.5rem" }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="cog"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-cog fa-w-16 fa-3x"
                >
                  <path
                    fill="currentColor"
                    d="M452.515 237l31.843-18.382c9.426-5.441 13.996-16.542 11.177-27.054-11.404-42.531-33.842-80.547-64.058-110.797-7.68-7.688-19.575-9.246-28.985-3.811l-31.785 18.358a196.276 196.276 0 0 0-32.899-19.02V39.541a24.016 24.016 0 0 0-17.842-23.206c-41.761-11.107-86.117-11.121-127.93-.001-10.519 2.798-17.844 12.321-17.844 23.206v36.753a196.276 196.276 0 0 0-32.899 19.02l-31.785-18.358c-9.41-5.435-21.305-3.877-28.985 3.811-30.216 30.25-52.654 68.265-64.058 110.797-2.819 10.512 1.751 21.613 11.177 27.054L59.485 237a197.715 197.715 0 0 0 0 37.999l-31.843 18.382c-9.426 5.441-13.996 16.542-11.177 27.054 11.404 42.531 33.842 80.547 64.058 110.797 7.68 7.688 19.575 9.246 28.985 3.811l31.785-18.358a196.202 196.202 0 0 0 32.899 19.019v36.753a24.016 24.016 0 0 0 17.842 23.206c41.761 11.107 86.117 11.122 127.93.001 10.519-2.798 17.844-12.321 17.844-23.206v-36.753a196.34 196.34 0 0 0 32.899-19.019l31.785 18.358c9.41 5.435 21.305 3.877 28.985-3.811 30.216-30.25 52.654-68.266 64.058-110.797 2.819-10.512-1.751-21.613-11.177-27.054L452.515 275c1.22-12.65 1.22-25.35 0-38zm-52.679 63.019l43.819 25.289a200.138 200.138 0 0 1-33.849 58.528l-43.829-25.309c-31.984 27.397-36.659 30.077-76.168 44.029v50.599a200.917 200.917 0 0 1-67.618 0v-50.599c-39.504-13.95-44.196-16.642-76.168-44.029l-43.829 25.309a200.15 200.15 0 0 1-33.849-58.528l43.819-25.289c-7.63-41.299-7.634-46.719 0-88.038l-43.819-25.289c7.85-21.229 19.31-41.049 33.849-58.529l43.829 25.309c31.984-27.397 36.66-30.078 76.168-44.029V58.845a200.917 200.917 0 0 1 67.618 0v50.599c39.504 13.95 44.196 16.642 76.168 44.029l43.829-25.309a200.143 200.143 0 0 1 33.849 58.529l-43.819 25.289c7.631 41.3 7.634 46.718 0 88.037zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 144c-26.468 0-48-21.532-48-48 0-26.467 21.532-48 48-48s48 21.533 48 48c0 26.468-21.532 48-48 48z"
                    className=""
                  ></path>
                </svg>
              </div>
              <div>Setting</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
