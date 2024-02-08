import { useState } from "react";
import "./App.css";
import SaveSegment from "./components/SaveSegment";
import SegmentForm from "./components/SegmentForm";
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="main-div">
      <SaveSegment toggleModal={toggleModal} />
      <Modal isOpen={isModalOpen} closeModal={toggleModal}/>
    </div>
  );
}

export default App;
