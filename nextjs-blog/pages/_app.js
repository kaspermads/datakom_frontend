import { AuthProvider } from "../components/AuthContext";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "../components/Layout/MainNavigatin";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNav = router.pathname !== "/" && 
                  router.pathname !== "/home/login" && 
                  router.pathname !== "/home/register-test";
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <AuthProvider>
      <MainNavigation showNav={showNav}>
        <Component {...pageProps} />
      </MainNavigation>
    </AuthProvider>
  );
}
