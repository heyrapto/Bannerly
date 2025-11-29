import { Analytics } from "@vercel/analytics/react";
import OnBoarding from "./pages/landing/OnBoarding";

const App = () => {
  return(
    <>
    <OnBoarding />
    <Analytics />
    </>
  )
}

export default App;