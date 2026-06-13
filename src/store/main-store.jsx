import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Analytics from "../pages/Analytics";
import ProblemAnalysis from "../pages/ProblemAnalysis";
import Compare from "../pages/Compare";
import { createContext } from "react";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "problem_analysis",
        element: <ProblemAnalysis />,
      },
      {
        path: "compare",
        element: <Compare />,
      },
    ],
  },
]);

