import { ChangeEvent, FormEvent, useState } from 'react';

import styled from 'styled-components';

import { Button } from './Button';
import { QRCodeModal } from './QRCodeModal';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FormState {
  email: string;
  first_name: string;
  last_name: string;
  message: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 5px 10px;
`;

const InputGroup = styled.div`
  display: flex;
  width: 325px;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  font-weight: 300;
  width: 143px;
`;

const TextInput = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  resize: none;
  width: 319px;
  overflow: hidden;
`;

export const CheckoutForm = () => {
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState<boolean>(false);
  const [qrCodeUrl, setQRCodeUrl] = useState<string>('');
  const [brCode, setBrCode] = useState<string>('');
  const formInitialValues = {
    email: '',
    first_name: '',
    last_name: '',
    message: '',
  };
  const [formState, setFormState] = useState<FormState>(formInitialValues);
  const { storedValue, removeValue, totalPrice } = useLocalStorage('cart')

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'inherit'; // Reset height to ensure shrinking on delete
    e.target.style.height = `${e.target.scrollHeight}px`; // Expand to fit content
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      email: formState.email,
      first_name: formState.first_name,
      last_name: formState.last_name,
      message: formState.message,
      total: totalPrice,
      items: storedValue.items,
    };

    await fetch('/api/checkouts', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    removeValue();
    setFormState(formInitialValues);
  };


  const closeModal = () => {
    setIsQRCodeModalOpen(false);
    setFormState(formInitialValues);
    localStorage.removeItem('cart');
    window.location.reload();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '0px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <InputGroup>
          <InputContainer>
            <label>Nome</label>
            <Input
              type="text"
              name="first_name"
              required={true}
              value={formState.first_name}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <label>Sobrenome</label>
            <Input
              type="text"
              name="last_name"
              value={formState.last_name}
              onChange={handleChange}
            />
          </InputContainer>
        </InputGroup>
        <InputContainer>
          <label>Email</label>
          <Input
            type="email"
            required={true}
            name="email"
            value={formState.email}
            onChange={handleChange}
            style={{
              width: 319,
            }}
          />
        </InputContainer>
        <InputGroup style={{ flexDirection: 'column' }}>
          <InputContainer>
            <label>Mensagem</label>
            <TextInput
              name="message"
              required={true}
              value={formState.message}
              onChange={handleChange}
              onInput={handleInput}
            />
          </InputContainer>
          <Button style={{ marginTop: '5px' }} type="submit" text="Gerar QR Code" />
        </InputGroup>
      </form>
      {isQRCodeModalOpen && (
        <QRCodeModal qrCodeUrl={qrCodeUrl} brCode={brCode} onClose={closeModal} />
      )}
    </>
  );
};
