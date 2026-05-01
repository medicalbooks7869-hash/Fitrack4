import { useEffect, useRef, useState } from 'react';
import { Calendar, UserCheck, Users, ThumbsUp } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Calendar,
    value: 25,
    suffix: '+',
    label: 'Years of Experience',
  },
  {
    icon: UserCheck,
    value: 50,
    suffix: '+',
    label: 'Expert Doctors',
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Patients Served',
  },
  {
    icon: ThumbsUp,
    value: 99,
    suffix: '%',
    label: 'Patient Satisfaction',
  },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

const StatCard = ({ stat, index, isVisible }: { stat: Stat; index: number; isVisible: boolean }) => {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 2000 + index * 300, isVisible);

  return (
    <div
      className={`text-center group transition-all duration-600 ease-heal ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${200 + index * 150}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4 group-hover:bg-white/20 transition-colors duration-300 group-hover:scale-110">
        <Icon className="w-8 h-8 text-hospital-orange" />
      </div>
      <div className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
        {stat.value >= 10000 ? `${(count / 1000).toFixed(0)}K` : count}
        {stat.suffix}
      </div>
      <p className="text-white/80 text-sm sm:text-base">{stat.label}</p>
    </div>
  );
};

const Statistics = () => {
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-hospital-blue to-hospital-dark relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-hospital-orange/10 via-transparent to-hospital-orange/10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
