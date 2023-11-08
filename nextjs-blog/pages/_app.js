import { AuthProvider }  from '../components/AuthContext';
import '../styles/global.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from '../components/navbar';
//hei hallo had


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </AuthProvider>
  );
}