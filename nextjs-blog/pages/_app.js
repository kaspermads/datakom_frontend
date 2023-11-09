import { AuthProvider } from "../components/AuthContext";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNavigation from "../components/Layout/MainNavigatin";
import { useRouter } from "next/router";
//hei hallo had

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const shoeNav = router.pathname !== "/" && router.pathname !== "/home/login" && router.pathname !== "/home/register-test";

  return (
    <AuthProvider>
      <MainNavigation>
        <Component {...pageProps} />;
      </MainNavigation>
    </AuthProvider>
  );
}
