/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import LeadPopup from './components/LeadPopup';
import BookingModal from './components/BookingModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-secondary font-sans text-ink selection:bg-primary/30 selection:text-primary-dark">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories />
        <Process />
        <Gallery />
      </main>
      <Footer />
      <Chatbot />
      <LeadPopup />
      <BookingModal />
    </div>
  );
}
