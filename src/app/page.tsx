'use client'
import { useEffect, useState } from 'react';

import { CartDrawer } from '../components/CartDrawer';
import { GridContainer } from '../components/GridContainer';
import { Header } from '../components/Header';

export default function Home () {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      const isClickOnDrawer = target.closest('.cart-drawer');
      const isClickOnCartIcon = target.closest('.cart-icon');

      if (!isClickOnDrawer && !isClickOnCartIcon && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isDrawerOpen]);

  return (
    <>
      <Header handleCartIconClick={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <CartDrawer isOpen={isDrawerOpen} />
      <GridContainer setIsDrawerOpen={setIsDrawerOpen} />
    </>
  );
};
