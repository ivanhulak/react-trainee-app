import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home";
import { Todo } from "./components/Todo/Todo";
import { GitHub } from "./components/GitHub/GitHub";

export const App = () => {
   return (
      <BrowserRouter>
         <div className="">
            <Header />
            <Routes>
               <Route path="/" element={<Home />}>
                  <Route path="/home" element={<Home />} />
               </Route>
               <Route path="/todo-list" element={<Todo />} />
               <Route path="/github-api" element={<GitHub />} />
            </Routes>
         </div>
      </BrowserRouter>
   );
}