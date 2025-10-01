import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnalyticsTracker page="/" />
      <Header />
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <NewsletterSubscription />
      <Footer />
    </main>
  );
}