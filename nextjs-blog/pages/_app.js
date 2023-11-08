import { AuthProvider }  from '../components/AuthContext';
import '../styles/global.css';
import "bootstrap/dist/css/bootstrap.min.css";
//hei hallo had


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}