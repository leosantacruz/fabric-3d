import Modal from '@/components/popup';
import { useState } from 'react';

const SidebarFooter = ({ step, setStep }: { step: number; setStep: any }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="sidebarFooter">
      <div className="btn default">Télécharger le résumé</div>
    </div>
  );
};

export default SidebarFooter;
