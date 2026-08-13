import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-gold-500 selection:text-navy-950">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4 }}
        className={`flex-grow pt-24 ${className}`}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};
