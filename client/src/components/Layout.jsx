import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
          backgroundColor:"white",
          // backgroundColor: "#f1f8e9",
          // backgroundImage: "url('/images/background_3.jpg')",
          backgroundSize: "cover", 
          backgroundRepeat: "no-repeat", 
          backgroundPosition: "center", 
          paddingTop: "2rem",
        }}
      >
        <div style={{ marginBottom: "3rem" ,marginTop:"1.5rem"}}>{children}</div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
