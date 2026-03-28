'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Courses', href: '/courses' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const courses = [
    { name: 'Java Programming', href: '/courses/core-java-advanced' },
    { name: 'Python Full Stack', href: '/courses/python-fullstack' },
    { name: 'Data Structures & Algorithms', href: '/courses/data-structures-algorithms' },
    { name: 'Full Stack SDET (Java)', href: '/courses/sdet-java' },
    { name: 'ReactJS Development', href: '/courses/frontend-react' },
    { name: 'DevOps Mastery', href: '/courses/devops-mastery' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-indigo-950 text-white border-t border-indigo-900">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <Link href="/" className="flex flex-col group">
              <span className="text-3xl font-black tracking-tighter text-white group-hover:text-indigo-400 transition-colors">
                RajeshwariTech
              </span>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mt-2">
                Infinite Learning
              </span>
            </Link>
            
            <p className="text-indigo-100/70 text-sm leading-relaxed font-medium">
              Empowering the next generation of tech professionals with industry-leading courses, 
              expert mentorship, and comprehensive placement support.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-indigo-200/80 hover:text-white transition-all cursor-pointer text-sm font-bold group">
                <div className="w-8 h-8 bg-indigo-900/50 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@rajeshwaritech.com</span>
              </div>
              <div className="flex items-center space-x-3 text-indigo-200/80 hover:text-white transition-all cursor-pointer text-sm font-bold group">
                <div className="w-8 h-8 bg-indigo-900/50 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400 mb-10">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-indigo-100/70 hover:text-white hover:translate-x-1 transition-all text-sm font-bold flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-10">Popular Courses</h3>
            <ul className="space-y-4">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link 
                    href={course.href}
                    className="text-indigo-100/70 hover:text-white hover:translate-x-1 transition-all text-sm font-bold flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-10">Connect With Us</h3>
            <p className="text-indigo-100/70 text-sm mb-8 leading-relaxed font-medium">
              Follow our social channels for the latest tech insights, tutorial drops, and course updates.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-300 hover:text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-600/20 transition-all border border-indigo-800"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-24 pt-10 border-t border-indigo-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-indigo-400/60 text-[10px] font-black uppercase tracking-[0.3em]">
            © {currentYear} RajeshwariTech. Made with ❤️ for Developers.
          </div>
          
          <div className="flex items-center space-x-8 text-[10px] font-black uppercase tracking-widest text-indigo-400/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
