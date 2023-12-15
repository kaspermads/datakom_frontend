// Importing libraries
import { AuthProvider } from "../components/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/global.css";
import MainNavigation from "../components/Layout/MainNavigatin";
import { useRouter } from "next/router";
import { useEffect } from "react";


//showing the navigation if the path is not "/" and "/home/login" and "/home/register-test"
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNav = router.pathname !== "/" && 
                  router.pathname !== "/home/login" && 
                  router.pathname !== "/home/register-test";
  useEffect(() => { // Using useEffect to load the bootstrap
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


//27:  Using AuthProvider to provide the authentication
//28:  Setting the dark mode
//29:  Setting the navigation
//30:  Setting the component
  return (
    <AuthProvider>
      <div className = "dark-mode"> 
      <MainNavigation showNav={showNav}>
        <Component {...pageProps} /> 
      </MainNavigation> 
      </div>
    </AuthProvider>
  );
}
