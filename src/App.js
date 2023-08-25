import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import GlobalStyle from "./global/global_css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Rotas/>
  </BrowserRouter>
  );
}

export default App;
