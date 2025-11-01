import { Analytics } from "@vercel/analytics/react";
import OnBoarding from "./pages/OnBoarding";
import Navbar from "./components/shared/Navbar";
const App = () => {
  return(
    <>
    <OnBoarding />
    <Analytics />
    </>
  )
}

export default App;