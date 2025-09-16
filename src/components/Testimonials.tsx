'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      course: 'Core Java + Competitive Programming',
      rating: 5,
      text: 'RajeshwariTech transformed my career completely. The Java course was comprehensive and the instructors were phenomenal. I landed my dream job at Google within 3 months of completion!',
      avatar: 'PS',
      company: 'Google'
    },
    {
      id: 2,
      name: 'Arjun Patel',
      role: 'Full Stack Developer at Amazon',
      course: 'Python Full Stack Development',
      rating: 5,
      text: 'The Python course exceeded my expectations. The hands-on projects and real-world applications helped me build a strong portfolio. Now I\'m working at Amazon as a Full Stack Developer.',
      avatar: 'AP',
      company: 'Amazon'
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      role: 'SDET at Microsoft',
      course: 'Full Stack SDET - Java',
      rating: 5,
      text: 'The SDET course was incredibly detailed and practical. The instructors provided excellent mentorship and the placement support was outstanding. Highly recommended for anyone looking to enter QA automation.',
      avatar: 'SR',
      company: 'Microsoft'
    },
    {
      id: 4,
      name: 'Rahul Kumar',
      role: 'Frontend Developer at Netflix',
      course: 'Frontend Development - ReactJS',
      rating: 5,
      text: 'The React course was well-structured and the live coding sessions were amazing. The instructors helped me understand complex concepts easily. I\'m now working at Netflix!',
      avatar: 'RK',
      company: 'Netflix'
    },
    {
      id: 5,
      name: 'Deepika Singh',
      role: 'DevOps Engineer at Uber',
      course: 'DevOps Mastery',
      rating: 5,
      text: 'The DevOps course covered everything from basics to advanced concepts. The hands-on labs and real-world projects prepared me perfectly for my role at Uber.',
      avatar: 'DS',
      company: 'Uber'
    },
    {
      id: 6,
      name: 'Vikram Joshi',
      role: 'Backend Developer at Spotify',
      course: 'Backend Development - Java',
      rating: 5,
      text: 'Excellent course with industry-relevant content. The Spring Boot and microservices modules were particularly helpful. The placement assistance was top-notch!',
      avatar: 'VJ',
      company: 'Spotify'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our successful graduates have to say about their learning journey with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-indigo-100">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-indigo-600 font-medium">{testimonial.course}</p>
                </div>
              </div>

              {/* Company Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {testimonial.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stats */}
        <motion.div 
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h3>
            <p className="text-gray-600">Our students are working at top companies worldwide</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">5000+</div>
              <div className="text-gray-600 text-sm">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">₹15L+</div>
              <div className="text-gray-600 text-sm">Average Package</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
