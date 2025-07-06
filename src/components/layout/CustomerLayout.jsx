'use client';
import React, { useEffect } from 'react';
import TopHeader from '@/components/layout/topHeader';
import Menu from '@/components/layout/Menu';
import Footer from '@/components/layout/Footer';
import DropSpinner from '@/components/admin/spinner/DropSpinner';
import Breadcrumb from '@/components/common/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import ToastMessage from '../common/ToastMessage';
import { getProfileService } from '@/services/profileService';
import { getCartService } from '@/services/cartService';

function CustomerLayout({ children }) {
  const { loading } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileService());
    dispatch(getCartService());
  }, [dispatch]);
  return (
    <>
      {loading && <DropSpinner />}
      <ToastMessage />
      <header className="text-white p-1">
        <TopHeader />
        <Menu />
      </header>
      <div className="max-w-7xl mx-auto">
        <Breadcrumb />
      </div>
      {children}
      <Footer />
    </>
  );
}

export default CustomerLayout;
