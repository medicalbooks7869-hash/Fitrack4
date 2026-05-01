import { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Calendar,
  User,
  MessageSquare,
  Stethoscope,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const services = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Radiology',
  'General Consultation',
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Medical Center Drive, Health City, HC 12345',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '(555) 123-4567',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@medicarehospital.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: '24/7 Emergency Services',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-hospital-light relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-hospital-blue/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Calendar className="w-4 h-4 text-hospital-blue" />
            <span className="text-sm font-semibold text-hospital-blue uppercase tracking-wider">
              Book Appointment
            </span>
          </div>
          <h2
            className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Schedule Your{' '}
            <span className="text-hospital-blue">Visit Today</span>
          </h2>
          <p
            className={`text-lg text-gray-600 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Book an appointment with our expert medical team. We're here to
            provide you with the best healthcare experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div
            className={`lg:col-span-1 space-y-6 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-hospital transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-hospital-light rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-hospital-blue transition-colors duration-300">
                      <Icon className="w-6 h-6 text-hospital-blue group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm h-48">
              <div className="w-full h-full bg-gradient-to-br from-hospital-light to-hospital-blue/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-hospital-blue mx-auto mb-2" />
                  <p className="text-sm text-gray-600">View on Google Maps</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <div
            className={`lg:col-span-2 transition-all duration-600 ease-heal ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-hospital">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-gray-600">
                    We'll contact you shortly to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Service
                      </label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                        <Select required>
                          <SelectTrigger className="pl-10 h-12">
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service.toLowerCase()}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="date"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Select required>
                          <SelectTrigger className="pl-10 h-12">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Textarea
                        placeholder="Tell us about your symptoms or concerns..."
                        className="pl-10 min-h-[120px]"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full bg-hospital-blue hover:bg-hospital-dark text-white font-semibold h-14 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-hospital"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
