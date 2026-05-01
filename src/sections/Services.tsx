import { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Brain, 
  Bone, 
  Baby, 
  Sparkles, 
  Scan,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const services: Service[] = [
  {
    id: 'cardiology',
    icon: Heart,
    title: 'Cardiology',
    description: 'Advanced cardiac care with state-of-the-art diagnostics and treatment options. Our cardiology department offers comprehensive heart health services.',
    features: ['ECG & Echocardiography', 'Cardiac Catheterization', 'Heart Rhythm Management', 'Preventive Cardiology'],
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'neurology',
    icon: Brain,
    title: 'Neurology',
    description: 'Expert neurological services for conditions affecting the brain and nervous system. We provide advanced diagnostics and personalized treatment plans.',
    features: ['EEG & EMG Testing', 'Stroke Care', 'Headache Clinic', 'Movement Disorders'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 'orthopedics',
    icon: Bone,
    title: 'Orthopedics',
    description: 'Comprehensive orthopedic care for bones, joints, and musculoskeletal health. From sports injuries to joint replacement, we have you covered.',
    features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Physical Therapy'],
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'pediatrics',
    icon: Baby,
    title: 'Pediatrics',
    description: 'Gentle, specialized healthcare for infants, children, and adolescents. Our pediatric team creates a comfortable environment for young patients.',
    features: ['Well-Child Visits', 'Vaccinations', 'Developmental Screening', 'Pediatric Emergency'],
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'dermatology',
    icon: Sparkles,
    title: 'Dermatology',
    description: 'Advanced skin care treatments and cosmetic dermatology services. We treat all skin conditions with the latest techniques and technologies.',
    features: ['Skin Cancer Screening', 'Acne Treatment', 'Cosmetic Procedures', 'Laser Therapy'],
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'radiology',
    icon: Scan,
    title: 'Radiology',
    description: 'Cutting-edge imaging services for accurate diagnosis and treatment planning. Our radiology department uses the latest imaging technology.',
    features: ['MRI & CT Scans', 'X-Ray & Ultrasound', 'Mammography', 'Interventional Radiology'],
    color: 'from-teal-500 to-cyan-600',
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState<string>(services[0].id);
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

  const activeServiceData = services.find((s) => s.id === activeService);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-hospital-blue rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-hospital-orange rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-hospital-light rounded-full mb-4 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-hospital-blue" />
            <span className="text-sm font-semibold text-hospital-blue uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Comprehensive Healthcare{' '}
            <span className="text-hospital-blue">Solutions</span>
          </h2>
          <p
            className={`text-lg text-gray-600 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            We offer a wide range of medical services designed to meet all your
            healthcare needs under one roof.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Service Tabs */}
          <div className="lg:col-span-1 space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === service.id;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ease-heal text-left group ${
                    isActive
                      ? 'bg-hospital-blue text-white shadow-hospital'
                      : 'bg-white text-gray-700 hover:bg-hospital-light border border-gray-100'
                  } ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 80}ms` }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br ' + service.color + ' group-hover:scale-110'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive ? 'text-white' : 'text-white'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg">
                      {service.title}
                    </h3>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Service Content */}
          <div className="lg:col-span-2">
            {activeServiceData && (
              <div
                className="bg-white rounded-2xl p-8 shadow-hospital border border-gray-100 h-full animate-fade-in"
                key={activeServiceData.id}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeServiceData.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <activeServiceData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                      {activeServiceData.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {activeServiceData.description}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activeServiceData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-hospital-light rounded-xl"
                    >
                      <div className="w-8 h-8 bg-hospital-blue rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-hospital-blue font-semibold hover:text-hospital-orange transition-colors duration-300 group"
                  >
                    Book a Consultation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
