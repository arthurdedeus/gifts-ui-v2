import React from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

import { Button } from '@/components/Button';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s ease-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

interface QRCodeModalProps {
  qrCodeUrl: string;
  brCode: string;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ qrCodeUrl, brCode, onClose }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(brCode);
    toast.success('Link copiado para a área de transferência');
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Image width={200} height={200} src={qrCodeUrl} alt="QR Code" />
        <p>Escaneie o QR Code pelo aplicativo do seu banco para pagar</p>
        <Button onClick={handleCopyLink} style={{ marginBottom: '5px' }} text="Copiar link" />
        <Button onClick={onClose} text="Fechar" />
      </ModalContent>
    </ModalBackdrop>
  );
};
