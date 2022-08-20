import './App.css';
import {Route,  Routes} from 'react-router-dom';
import { NavBar } from "./components/navBar"
import { AddProduct } from "./components/addProduct"
import { Preview } from "./components/ProductsPreview"
import { Chat } from './components/chat';

//The parent component
function App() {

  return(<div>
          <NavBar />
          <Routes>       
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>)
}

export default App;
