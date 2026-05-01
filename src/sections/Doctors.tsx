import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Users } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  rating: number;
  patients: string;
  education: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    experience: '15 years',
    image: '/doctor-1.jpg',
    rating: 4.9,
    patients: '2,500+',
    education: 'Harvard Medical School',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    experience: '12 years',
    image: '/doctor-2.jpg',
    rating: 4.8,
    patients: '1,800+',
    education: 'Johns Hopkins University',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    experience: '10 years',
    image: '/doctor-3.jpg',
    rating: 5.0,
    patients: '3,200+',
    education: 'Stanford Medicine',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedic Surgeon',
    experience: '20 years',
    image: '/doctor-4.jpg',
    rating: 4.9,
    patients: '1,500+',
    education: 'Mayo Clinic College',
  },
];

const Doctors = () => {
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  const getVisibleDoctors = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % doctors.length;
      visible.push({ ...doctors[index], position: i });
    }
    return visible;
  };

  return (
    <section
      id="doctors"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-hospital-light rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-hospital-orange/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-hospital-light rounded-full mb-4 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Users className="w-4 h-4 text-hospital-blue" />
              <span className="text-sm font-semibold text-hospital-blue uppercase tracking-wider">
                Our Doctors
              </span>
            </div>
            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Meet Our Expert{' '}
              <span className="text-hospital-blue">Medical Team</span>
            </h2>
            <p
              className={`text-lg text-gray-600 mt-4 max-w-xl transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Our team of highly qualified physicians is dedicated to providing
              you with the best possible care.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div
            className={`flex gap-3 mt-6 lg:mt-0 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-2 border-hospital-blue text-hospital-blue hover:bg-hospital-blue hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-2 border-hospital-blue text-hospital-blue hover:bg-hospital-blue hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Doctors Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleDoctors().map((doctor, index) => (
              <div
                key={`${doctor.id}-${index}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-hospital-lg transition-all duration-500 ease-heal ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hospital-dark/80 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {doctor.rating}
                    </span>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-hospital-orange font-medium">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-hospital-blue" />
                      <span className="text-sm text-gray-600">
                        {doctor.experience}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-hospital-blue" />
                      <span className="text-sm text-gray-600">
                        {doctor.patients} patients
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {doctor.education}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {doctors.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default Doctors;
