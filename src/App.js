import { useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";

function App() {
  const { isOpen } = useSelector((state) => state.modal);
  
  return (
    <main>
      <Navbar />
      <CartContainer />
      {isOpen && <Modal />}
    </main>
  );
}
export default App;
