import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Instagram, MapPin, Clock, Star, 
  ChevronRight, ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Toaster, toast } from 'sonner';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Sparkles className="text-primary w-6 h-6" />
          <span className="text-2xl font-serif font-bold tracking-tight">Palette Nails <span className="text-primary">GH</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => window.open('tel:0548011112')} className="rounded-full px-6">
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <Button onClick={() => window.open('tel:0548011112')} className="w-full rounded-full">
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/hero-salon-interior-fbba4738-1780265046118.webp" 
          alt="Luxury Nail Salon Interior" 
          className="w-full h-full object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Badge className="bg-primary text-white border-none mb-6 px-4 py-1 text-sm rounded-full">
            Top Rated Nail Salon in Accra
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Elevate Your <span className="text-primary italic">Nail Game</span> at Palette Nails
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed">
            Experience the art of professional nail care in Accra. From stunning Gel-X sets to relaxing pedicures, we bring your vision to life with precision and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => window.open('tel:0548011112')} className="rounded-full px-8 h-14 text-lg font-semibold group">
              Book Appointment <Phone className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="rounded-full px-8 h-14 text-lg font-semibold bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              View Services
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
              ))}
            </div>
            <p className="text-sm font-medium">4.9/5 Rating from 240+ Happy Clients</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Gel-X Extensions',
      description: 'The ultimate soft gel extension system for natural looking, long-lasting nails.',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/nail-art-1-gel-x-980a783d-1780265045047.webp',
      price: 'Starting from GH₵ 250'
    },
    {
      title: 'Luxury Pedicure',
      description: 'Pamper your feet with our specialized spa pedicure for relaxation and skin rejuvenation.',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/pedicure-service-c934e171-1780265046076.webp',
      price: 'Starting from GH₵ 180'
    },
    {
      title: 'Builder Gel (BIAB)',
      description: 'Strong, durable gel overlay that helps your natural nails grow while staying flawless.',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/builder-gel-application-14810c6e-1780265045197.webp',
      price: 'Starting from GH₵ 200'
    },
    {
      title: 'Custom Press-Ons',
      description: 'Professional quality, reusable press-on nails tailored to your style and size.',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/press-on-nails-collection-8c9eebc7-1780265045214.webp',
      price: 'Starting from GH₵ 150'
    }
  ];

  return (
    <section id="services" className="py-24 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">Our Expertise</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Signature Nail Services</h2>
          <p className="text-muted-foreground">We specialize in modern nail techniques that prioritize nail health without compromising on style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-none group bg-card">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white">{service.price}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Button 
                    variant="link" 
                    onClick={() => window.open('tel:0548011112')}
                    className="p-0 text-primary h-auto group-hover:gap-2 transition-all"
                  >
                    Book Service <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/nail-art-1-gel-x-980a783d-1780265045047.webp', title: 'Minimalist Gel-X' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/acrylic-orange-nails-b140e575-1780265045991.webp', title: 'Vibrant Orange Acrylic' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/builder-gel-application-14810c6e-1780265045197.webp', title: 'Clean BIAB Application' },
    { url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/press-on-nails-collection-8c9eebc7-1780265045214.webp', title: 'Custom Set Designs' },
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <Badge variant="outline" className="mb-4 text-primary border-primary">Portfolio</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Creations</h2>
            <p className="text-muted-foreground">Follow @nailed_by__xornam on Instagram for daily inspiration and recent nail transformations.</p>
          </div>
          <Button variant="outline" onClick={() => window.open('https://instagram.com/nailed_by__xornam')} className="rounded-full flex items-center gap-2">
            <Instagram className="w-5 h-5" /> Follow Us
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-medium text-lg">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6a37b1a-800b-401a-a2e4-ea25c4f1861e/builder-gel-application-14810c6e-1780265045197.webp" 
                alt="Professional Nail Technician" 
                className="rounded-3xl shadow-2xl relative z-10 w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-[240px]">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Star className="fill-current w-5 h-5" />
                  <span className="font-bold">4.9/5 Rating</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Recognized for attention to detail and creative artistry.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary">About Palette Nails</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Expertise with a Personal Touch</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded by Xornam, Palette Nails GH is more than just a salon; it's a creative space dedicated to the art of nail design. We believe your nails are a canvas, and we are here to help you express your personality through flawless application and stunning aesthetics.
            </p>
            
            <div className="space-y-4 mb-10">
              {[
                'Certified Nail Technicians',
                'Premium Global Products (GC Nails & more)',
                'Hygienic & Sterile Environment',
                'Customized Styling Consultations'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button onClick={() => window.open('tel:0548011112')} size="lg" className="rounded-full px-10">
              Meet Our Team
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you! We will contact you shortly to confirm your booking.');
    setFormData({ name: '', phone: '', service: '' });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <Badge variant="outline" className="mb-4 text-primary border-primary">Visit Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready for your Nail Day?</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-xl h-fit">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Our Location</h4>
                  <p className="text-muted-foreground">Farmers Haus, Agbogba - Ashongman Rd, Accra, Ghana</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-xl h-fit">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Call for Booking</h4>
                  <p className="text-muted-foreground">054 801 1112</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 p-3 rounded-xl h-fit">
                  <Clock className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Opening Hours</h4>
                  <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-primary font-medium text-sm">Friday Special: Opens 9:00 AM</p>
                </div>
              </div>

              <div className="pt-6">
                <Button variant="outline" onClick={() => window.open('https://instagram.com/nailed_by__xornam')} className="w-full flex items-center justify-center gap-2 h-14 rounded-xl border-2">
                  <Instagram className="w-5 h-5" /> Chat on Instagram
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-muted">
            <h3 className="text-2xl font-bold mb-6">Quick Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="054 801 1112"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Desired Service</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select a service</option>
                  <option value="gel-x">Gel-X Extensions</option>
                  <option value="pedicure">Luxury Pedicure</option>
                  <option value="builder">Builder Gel</option>
                  <option value="presson">Press-On Nails</option>
                </select>
              </div>
              <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold">
                Send Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary w-8 h-8" />
            <span className="text-3xl font-serif font-bold tracking-tight">Palette Nails <span className="text-primary">GH</span></span>
          </div>
          
          <div className="flex gap-6">
            <a href="https://instagram.com/nailed_by__xornam" className="hover:text-primary transition-colors"><Instagram size={24} /></a>
            <a href="tel:0548011112" className="hover:text-primary transition-colors"><Phone size={24} /></a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-gray-400">
          <div className="md:col-span-2">
            <h5 className="text-white text-lg font-bold mb-4">About Us</h5>
            <p className="leading-relaxed max-w-sm">
              Palette Nails GH is dedicated to providing high-quality nail care services in Accra. 
              Our focus is on precision, hygiene, and creative nail art that empowers our clients.
            </p>
          </div>
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Contact Info</h5>
            <ul className="space-y-2">
              <li>Farmers Haus, Agbogba</li>
              <li>Ashongman Rd, Accra</li>
              <li>054 801 1112</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Palette Nails GH. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Contact />
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;