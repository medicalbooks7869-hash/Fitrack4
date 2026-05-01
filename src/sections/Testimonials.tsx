import { useEffect, useRef, useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Matthews',
    role: 'Heart Surgery Patient',
    content: 'The care I received was exceptional. The doctors took time to explain everything and made me feel comfortable throughout my treatment. The follow-up care was outstanding, and I felt truly supported during my recovery.',
    rating: 5,
    avatar: 'JM',
  },
  {
    id: 2,
    name: 'Mary Thompson',
    role: 'Regular Patient',
    content: 'From the moment I walked in, I knew I was in good hands. The staff is professional, caring, and truly dedicated to patient wellbeing. I have been coming here for years and have always received excellent care.',
    rating: 5,
    avatar: 'MT',
  },
  {
    id: 3,
    name: 'Robert Anderson',
    role: 'Orthopedic Patient',
    content: 'After my surgery, the follow-up care was outstanding. They monitored my recovery closely and were always available for questions. The physical therapy team helped me get back on my feet faster than expected.',
    rating: 5,
    avatar: 'RA',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-hospital-light relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #006098 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ease-heal ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              <img
                src="/why-choose-us.jpg"
                alt="Happy Patients"
                className="rounded-2xl shadow-hospital-lg w-full h-auto object-cover"
              />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-hospital-lg">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-hospital-blue rounded-full flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-gray-900">
                      4.9
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on 2,000+ reviews
                </p>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-hospital-orange/20 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Content Side */}
          <div>
            {/* Section Header */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <MessageSquare className="w-4 h-4 text-hospital-blue" />
              <span className="text-sm font-semibold text-hospital-blue uppercase tracking-wider">
                Testimonials
              </span>
            </div>

            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              What Our{' '}
              <span className="text-hospital-blue">Patients Say</span>
            </h2>

            {/* Testimonial Slider */}
            <div
              className={`relative transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 w-12 h-12 bg-hospital-orange/10 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-hospital-orange" />
              </div>

              {/* Testimonial Content */}
              <div className="bg-white rounded-2xl p-8 shadow-hospital relative overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-500 ${
                      index === currentIndex
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 absolute inset-0 translate-x-8'
                    }`}
                  >
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-hospital-blue rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-hospital-blue'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-hospital-blue hover:text-white hover:border-hospital-blue transition-all duration-300 flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:bg-hospital-blue hover:text-white hover:border-hospital-blue transition-all duration-300 flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
