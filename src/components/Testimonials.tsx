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
    <section className="py-24 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full mb-6 border border-indigo-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Alumni Success</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-8 text-indigo-950 tracking-tight">
            What Our{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-xl text-indigo-800/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Don&apos;t just take our word for it. Here&apos;s what our successful graduates have to say about their learning journey with us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-indigo-50/50 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 border border-indigo-50 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute top-6 right-8 text-indigo-100 group-hover:text-indigo-200 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current shadow-yellow-200" />
                ))}
              </div>

              <blockquote className="text-indigo-900 mb-8 leading-relaxed font-medium italic text-lg line-clamp-4">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
                  {testimonial.avatar}
                </div>
                
                <div>
                  <h4 className="font-bold text-indigo-950 text-lg leading-tight">{testimonial.name}</h4>
                  <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider text-[10px] mt-1">{testimonial.role}</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-10">
                <span className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                  {testimonial.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 bg-white rounded-[3rem] p-12 shadow-2xl shadow-indigo-100/50 border border-indigo-50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-indigo-950 mb-2 tracking-tight">Success Stories</h3>
            <p className="text-indigo-700 font-bold uppercase tracking-widest text-xs">Our students are working at top global companies</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="text-4xl font-black text-indigo-600 mb-2 font-mono tracking-tighter">5000+</div>
              <div className="text-indigo-800/60 text-xs font-black uppercase tracking-widest">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2 font-mono tracking-tighter">95%</div>
              <div className="text-indigo-800/60 text-xs font-black uppercase tracking-widest">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2 font-mono tracking-tighter">50+</div>
              <div className="text-indigo-800/60 text-xs font-black uppercase tracking-widest">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-600 mb-2 font-mono tracking-tighter">₹15L+</div>
              <div className="text-indigo-800/60 text-xs font-black uppercase tracking-widest">Average Package</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
