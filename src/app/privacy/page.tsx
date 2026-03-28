'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-indigo-600" />,
      title: 'Information We Collect',
      content: 'We collect information that you provide directly to us, such as when you create an account, enroll in a course, or communicate with us. This may include your name, email address, phone number, and payment information.'
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to send you technical notices, updates, and support messages.'
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-600" />,
      title: 'Data Security',
      content: 'We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.'
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      title: 'Your Choices',
      content: 'You may update or correct your account information at any time by logging into your account or contacting us. You can also opt-out of receiving promotional communications from us.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-32 pb-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              We value your privacy and are committed to protecting your personal data.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12 space-y-12">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-indigo-50 rounded-xl">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {section.content}
                  </p>
                </motion.div>
              ))}
              
              <div className="pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  Last Updated: March 20, 2026. If you have any questions about this Privacy Policy, please contact us at privacy@rajeshwaritech.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
