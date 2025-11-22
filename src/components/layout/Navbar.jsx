import Button from "../shared/Button";

const Navbar = () => {
  return (
    <nav className="bg-transparent fixed w-full md:px-[100px] px-6 py-3">
      <div className="flex justify-between items-center md:max-w-[1440px] mx-auto max-w-full">
      <h1 className="text-neutral-600 inline-flex items-center text-center">Sand Studio <br /> & Co</h1>
      <Button size="sm">
        Shop now
      </Button>
      </div>
    </nav>
  )
}

export default Navbar;