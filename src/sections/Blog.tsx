import { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, User, BookOpen } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Tips for Maintaining a Healthy Heart',
    excerpt: 'Discover simple lifestyle changes that can significantly improve your cardiovascular health and reduce the risk of heart disease.',
    category: 'Cardiology',
    date: 'March 15, 2024',
    author: 'Dr. Sarah Johnson',
    image: '/blog-1.jpg',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Understanding Childhood Vaccinations',
    excerpt: 'A comprehensive guide for parents about the importance of vaccinations and the recommended immunization schedule for children.',
    category: 'Pediatrics',
    date: 'March 10, 2024',
    author: 'Dr. Emily Rodriguez',
    image: '/blog-2.jpg',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'The Importance of Regular Health Checkups',
    excerpt: 'Learn why preventive care and annual health screenings are essential for detecting potential health issues early.',
    category: 'General Health',
    date: 'March 5, 2024',
    author: 'Dr. Michael Chen',
    image: '/blog-3.jpg',
    readTime: '4 min read',
  },
];

const Blog = () => {
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
      id="blog"
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-hospital-light rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-hospital-light rounded-full mb-4 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <BookOpen className="w-4 h-4 text-hospital-blue" />
              <span className="text-sm font-semibold text-hospital-blue uppercase tracking-wider">
                Latest News
              </span>
            </div>
            <h2
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Health Tips &{' '}
              <span className="text-hospital-blue">Medical Insights</span>
            </h2>
            <p
              className={`text-lg text-gray-600 mt-4 max-w-xl transition-all duration-600 ease-heal ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Stay informed with the latest health news and medical advice from
              our experts.
            </p>
          </div>

          <a
            href="#blog"
            className={`inline-flex items-center gap-2 text-hospital-blue font-semibold hover:text-hospital-orange transition-colors duration-300 group mt-6 lg:mt-0 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-hospital-lg transition-all duration-500 ease-heal hover:-translate-y-3 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-hospital-blue text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-hospital-blue transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <a
                    href="#blog"
                    className="inline-flex items-center gap-1 text-hospital-blue font-semibold text-sm hover:text-hospital-orange transition-colors duration-300 group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
