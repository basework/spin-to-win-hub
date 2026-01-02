import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import UrgencyBanner from '@/components/UrgencyBanner';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import SpinWheelPopup from '@/components/SpinWheelPopup';
import GDPRConsent from '@/components/GDPRConsent';

const Index = () => {
  const [wheelOpen, setWheelOpen] = useState(false);

  useEffect(() => {
    // Check if user has already interacted with the wheel
    const hasSpun = localStorage.getItem('hasSpunWheel');
    if (hasSpun) return;

    // Trigger popup after 5 seconds or on scroll
    const timer = setTimeout(() => {
      setWheelOpen(true);
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 300 && !hasSpun) {
        setWheelOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenWheel = () => {
    setWheelOpen(true);
  };

  const handleCloseWheel = (open: boolean) => {
    setWheelOpen(open);
    if (!open) {
      localStorage.setItem('hasSpunWheel', 'true');
    }
  };

  return (
    <>
      <Helmet>
        <title>SpinWin - Spin. to Win Exclusive Prizes & Discounts!</title>
        <meta name="description" content="Spin the wheel for a chance to win exclusive discounts up to 50% off, free shipping, and more prizes! Join 10,000+ lucky winners today." />
        <meta name="keywords" content="spin to win, discount wheel, free prizes, exclusive offers, flash sale" />
        <link rel="canonical" href="https://spinwin.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SpinWin - Win Exclusive Prizes!" />
        <meta property="og:description" content="Spin the wheel for discounts up to 50% off!" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SpinWin",
            "description": "Spin to win exclusive prizes and discounts",
            "url": "https://spinwin.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://spinwin.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <UrgencyBanner />
        
        <main>
          <Hero onOpenWheel={handleOpenWheel} />
          <FeaturesSection />
          <TestimonialsSection />
          <CTASection onOpenWheel={handleOpenWheel} />
        </main>

        <Footer />

        <SpinWheelPopup open={wheelOpen} onOpenChange={handleCloseWheel} />
        <GDPRConsent />
      </div>
    </>
  );
};

export default Index;
