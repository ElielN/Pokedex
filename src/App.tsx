import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ModalContextProvider } from './context/ModalContext';
import './styles/global.scss';

function App() {
  return (
      <ModalContextProvider> 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </ModalContextProvider>
  );
}

export default App;
