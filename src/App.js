import { BrowserRouter,Routes,Route   } from "react-router-dom";
import ShowInfo from "./Components/ShowInfo"; 
import NavBar from "./Components/NavBar";


function App() {
  return (



    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <NavBar>
          
        </NavBar>
        } > </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
