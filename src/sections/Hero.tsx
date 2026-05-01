import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  image: string;
  heading1: string;
  heading2: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/hero-1.jpg',
    heading1: 'Best Care For Your',
    heading2: 'Good Health',
    description: 'Comprehensive healthcare services with cutting-edge technology and compassionate medical professionals dedicated to your wellbeing.',
    ctaPrimary: 'Book Appointment',
    ctaSecondary: 'Learn More',
  },
  {
    id: 2,
    image: '/hero-2.jpg',
    heading1: 'Exceptional Care',
    heading2: 'Close to You',
    description: 'Our network of skilled physicians and modern facilities ensures you receive the highest quality medical care right in your community.',
    ctaPrimary: 'Meet Our Doctors',
    ctaSecondary: 'Our Services',
  },
  {
    id: 3,
    image: '/hero-3.jpg',
    heading1: 'Your Health Is Our',
    heading2: 'Top Priority',
    description: 'From preventive care to specialized treatments, we provide personalized medical services tailored to your unique health needs.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'Contact Us',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [isAnimating]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-reveal ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <div className="absolute inset-0 animate-ken-burns">
            <img
              src={slide.image}
              alt={slide.heading1}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-hospital-dark/80 via-hospital-dark/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${index === currentSlide ? 'block' : 'hidden'}`}
              >
                {/* Heading */}
                <div className="overflow-hidden mb-4">
                  <h1
                    className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-800 ease-reveal ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                  >
                    {slide.heading1}
                  </h1>
                </div>
                <div className="overflow-hidden mb-6">
                  <h1
                    className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-hospital-orange leading-tight transition-all duration-800 ease-reveal ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: '500ms' }}
                  >
                    {slide.heading2}
                  </h1>
                </div>

                {/* Description */}
                <p
                  className={`text-lg text-white/90 mb-8 max-w-lg transition-all duration-600 ease-heal ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '700ms' }}
                >
                  {slide.description}
                </p>

                {/* CTAs */}
                <div
                  className={`flex flex-wrap gap-4 transition-all duration-500 ease-elastic ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: '900ms' }}
                >
                  <Button
                    onClick={() => scrollToSection('#contact')}
                    className="bg-hospital-orange hover:bg-hospital-orange/90 text-white font-semibold px-8 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-glow animate-pulse-glow"
                  >
                    {slide.ctaPrimary}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => scrollToSection('#services')}
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-hospital-blue font-semibold px-8 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105"
                  >
                    {slide.ctaSecondary}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 1200);
              }
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-10 bg-hospital-orange'
                : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-hospital-orange/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
