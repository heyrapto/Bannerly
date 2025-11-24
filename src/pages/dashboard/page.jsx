import Navbar from "../../components/layout/Navbar"

const Dashboard = () => {
  return (
    <div>
      <Navbar btnText={"Editor"} href={"/editor"} isDashboard />
    </div>
  )
}

export default Dashboard