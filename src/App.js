import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import GlobalStyle from "./global/global_css"
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <ToastContainer/>
      <Rotas/>
    </BrowserRouter>
  );
}

export default App;
