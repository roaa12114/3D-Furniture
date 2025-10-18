import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ModelViewer from './components/ModelViewer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart';
import Receipt from './components/Receipt';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"element={<Main/>}/>
          <Route path="/login"element={<Login/>}/>
          <Route path="/signup"element={<Signup/>}/>
          <Route path="/model-viewer/:id"element={<ModelViewer/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/receipt/:id" element={<Receipt />} />


          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
