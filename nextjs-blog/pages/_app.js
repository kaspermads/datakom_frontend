import { AuthProvider }  from '../components/AuthContext';
import '../styles/global.css';
import "bootstrap/dist/css/bootstrap.min.css";
import  Layout  from '../components/navbar';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const showNavbar = router.pathname !== '/home/login' && router.pathname !== '/home/register' && router.pathname !== '/';
  return (
    <AuthProvider>
      <Layout  showNavbar={showNavbar}>
        <Component {...pageProps} />;
      </Layout>
    </AuthProvider>
  );
}