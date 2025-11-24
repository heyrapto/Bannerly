import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-transparent fixed w-full md:px-[100px] px-6 py-3 backdrop-blur-md z-50">
      <div className="flex justify-between items-center md:max-w-[1440px] mx-auto max-w-full">
        <h1 className="text-neutral-600 text-[1.5rem] inline-flex items-center text-center">Bannerly.</h1>
        <Button size="sm" onClick={() => navigate('/editor')}>
          Get Started
        </Button>
      </div>
    </nav>
  )
}

export default Navbar;