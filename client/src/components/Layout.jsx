import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures the whole viewport is covered
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
          backgroundSize: "cover", // Ensures the image covers the entire area
          backgroundRepeat: "no-repeat", // Prevents image repetition
          backgroundPosition: "center", // Centers the image
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
