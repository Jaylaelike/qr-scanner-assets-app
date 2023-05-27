// import { BrowserRouter as Route, Router } from "react-router-dom";
import { BrowserRouter ,Route} from 'react-router-dom'
import Home from "./pages/Home";
import FetchDetial from "./pages/FetchDetail";

function App() {
  return (

    <BrowserRouter>
      <Route path="/" component={Home} />
      <Route path="/FetchDetial/:id" component={FetchDetial} />
    </BrowserRouter>
  );
}

export default App;
