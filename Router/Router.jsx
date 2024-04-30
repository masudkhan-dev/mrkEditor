import { createBrowserRouter } from "react-router-dom";
import Main from "../src/Components/Home/Main";
import Home from "../src/Components/Home/Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default Router;
