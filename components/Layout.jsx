import Navbar from "./Navbar";
import Script from "next/script";

export default function Layout({ children }) {
  return (
    <>
      <Script src="/js/bootstrap.bundle.min.js" />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
