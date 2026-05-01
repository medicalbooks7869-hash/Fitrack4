import { useEffect, useRef, useState } from 'react';
import { Clock, Users, Stethoscope, HeartHandshake, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Emergency Services',
    description: 'Round-the-clock emergency care with rapid response times and dedicated emergency physicians.',
  },
  {
    icon: Users,
    title: 'Expert Medical Team',
    description: 'Board-certified physicians with decades of combined experience in their respective specialties.',
  },
  {
    icon: Stethoscope,
    title: 'Modern Equipment',
    description: 'State-of-the-art medical technology for accurate diagnosis and effective treatment.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Care',
    description: 'Treatment plans tailored to your unique health needs with compassionate attention.',
  },
];

const WhyChooseUs = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-hospital-light relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            {/* Section Header */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-hospital-blue" />
              <span className="text-sm font-semibold text-hospital-blue uppercase tracking-wider">
                Why Choose Us
              </span>
            </div>

            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              We Always Put{' '}
              <span className="text-hospital-blue">Patient Care</span> First
            </h2>

            <p
              className={`text-lg text-gray-600 mb-10 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Our commitment to excellence in healthcare delivery sets us apart.
              We combine advanced medical technology with compassionate care to
              provide the best possible outcomes for our patients.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`group bg-white rounded-xl p-6 shadow-sm hover:shadow-hospital transition-all duration-300 hover:-translate-y-2 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-hospital-light rounded-lg flex items-center justify-center mb-4 group-hover:bg-hospital-blue transition-colors duration-300">
                      <Icon className="w-6 h-6 text-hospital-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ease-heal ${
              isVisible
                ? 'opacity-100 translate-x-0 rotate-0'
                : 'opacity-0 translate-x-12 rotate-3'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-hospital-lg">
                <img
                  src="/why-choose-us.jpg"
                  alt="Medical Professionals"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-hospital-blue/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-hospital-lg max-w-[200px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-display font-bold text-2xl text-gray-900">
                    25+
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Years of Excellence in Healthcare
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-hospital-orange/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-hospital-blue/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
