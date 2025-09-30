import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Layout.css";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {/* <main>{children}</main> */}

      <main
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: "3.5rem", // Account for fixed navbar
        }}
      >
        <div className="main-content">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
