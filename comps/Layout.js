import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">
        { children }
        <Footer />
    </div>
    </>
  );
}
 
export default Layout;