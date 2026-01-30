"use client"
import { useState } from "react";
import { postInquiry } from "@/lib/api";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [detail, setDetail] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await postInquiry(formData);
      if (res.success) {
        setSuccess(true);
        setErrors({ name: '', email: '', phone: '', message: '' });
        setFormData({ name: '', email: '', phone: '', message: '' });
        window.location.href = '/thankyou';
      } else {
        setSuccess(false);
        setErrors(res.data || { name: '', email: '', phone: '', message: '' });
      }
      setDetail(res.detail || '');
    } catch (err) {
      setSuccess(false);
      const status = err?.status ? ` (Error ${err.status})` : '';
      setDetail(`Unable to send message${status}. Please try again.`);
      setErrors({ name: '', email: '', phone: '', message: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <hr className="section-divider" />
      
      <section id="contact" className="contact-section py-24 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          {/* Teal to secondary gradient layers */}
          <div className="absolute inset-0 opacity-90">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--teal)]/40 via-[var(--teal)]/25 to-[var(--secondary)]/35"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--teal)]/35 via-[var(--secondary)]/20 to-[var(--secondary)]/30" style={{
              animation: 'gradientShift 12s ease-in-out infinite'
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--teal)]/30 via-[var(--secondary)]/25 to-[var(--secondary)]/25" style={{
              animation: 'gradientShift 16s ease-in-out infinite reverse'
            }}></div>
          </div>
          
          {/* CSS variable floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-[var(--teal)]/25 blur-3xl animate-professionalFloat"></div>
          <div className="absolute top-3/4 right-1/4 w-36 h-36 rounded-full bg-[var(--secondary)]/20 blur-3xl animate-professionalFloat-delayed"></div>
          <div className="absolute bottom-1/4 left-1/3 w-44 h-44 rounded-full bg-[var(--teal)]/18 blur-3xl animate-professionalFloat-slow"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-[var(--secondary)]/15 blur-2xl animate-professionalFloat"></div>
          <div className="absolute top-1/3 left-1/2 w-28 h-28 rounded-full bg-[var(--teal)]/12 blur-2xl animate-professionalFloat-delayed"></div>
          <div className="absolute bottom-1/3 right-1/2 w-24 h-24 rounded-full bg-[var(--secondary)]/10 blur-xl animate-professionalFloat-slow"></div>
          
          {/* Additional accent and primary orbs */}
          <div className="absolute top-1/6 left-1/6 w-40 h-40 rounded-full bg-[var(--accent)]/20 blur-3xl animate-professionalFloat-slow"></div>
          <div className="absolute top-2/3 right-1/6 w-52 h-52 rounded-full bg-[var(--primary)]/18 blur-3xl animate-professionalFloat"></div>
          <div className="absolute bottom-1/6 left-2/3 w-36 h-36 rounded-full bg-[var(--accent)]/15 blur-2xl animate-professionalFloat-delayed"></div>
          <div className="absolute top-1/2 left-1/6 w-44 h-44 rounded-full bg-[var(--primary)]/12 blur-2xl animate-professionalFloat-slow"></div>
          <div className="absolute bottom-2/3 right-1/3 w-32 h-32 rounded-full bg-[var(--accent)]/10 blur-xl animate-professionalFloat"></div>
          
          {/* More visible orbs */}
          <div className="absolute top-1/5 right-1/5 w-60 h-60 rounded-full bg-[var(--primary)]/15 blur-3xl animate-professionalFloat-delayed"></div>
          <div className="absolute bottom-1/5 left-1/5 w-56 h-56 rounded-full bg-[var(--accent)]/18 blur-3xl animate-professionalFloat-slow"></div>
          <div className="absolute top-3/5 left-1/4 w-38 h-38 rounded-full bg-[var(--teal)]/20 blur-2xl animate-professionalFloat"></div>
          <div className="absolute bottom-3/5 right-1/4 w-42 h-42 rounded-full bg-[var(--secondary)]/16 blur-2xl animate-professionalFloat-delayed"></div>
          <div className="absolute top-1/4 right-1/2 w-34 h-34 rounded-full bg-[var(--primary)]/14 blur-xl animate-professionalFloat-slow"></div>
          <div className="absolute bottom-1/4 left-1/2 w-46 h-46 rounded-full bg-[var(--accent)]/12 blur-xl animate-professionalFloat"></div>
          
          {/* CSS variable accent particles */}
          <div className="absolute top-1/6 right-1/3 w-3 h-3 rounded-full bg-[var(--teal)] animate-pulse-professional"></div>
          <div className="absolute top-2/3 left-1/6 w-2 h-2 rounded-full bg-[var(--secondary)] animate-pulse-professional-delayed"></div>
          <div className="absolute bottom-1/6 right-1/6 w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse-professional-slow"></div>
          <div className="absolute top-1/2 left-1/6 w-3 h-3 rounded-full bg-[var(--secondary)] animate-pulse-professional"></div>
          
          {/* CSS variable light streaks */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--teal)]/60 to-transparent animate-professionalStreak"></div>
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/50 to-transparent animate-professionalStreak-delayed"></div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--teal)]/40 to-transparent animate-professionalStreak-slow"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/50 to-transparent animate-professionalStreak"></div>
          </div>
          
          {/* CSS variable scanning lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--teal)]/30 to-transparent animate-professionalScan"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/25 to-transparent animate-professionalScan-delayed"></div>
          </div>
          
          
          {/* CSS variable grid pattern */}
          <div className="absolute inset-0 opacity-8" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 224, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 224, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'professionalGridMove 30s linear infinite'
          }}></div>
          
          {/* CSS variable data streams */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--teal)]/20 to-transparent animate-dataStream"></div>
            <div className="absolute top-2/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/15 to-transparent animate-dataStream-delayed"></div>
            <div className="absolute top-3/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--teal)]/15 to-transparent animate-dataStream-slow"></div>
            <div className="absolute top-4/5 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/15 to-transparent animate-dataStream"></div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
              Contact Us
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s build something amazing together. From concept to launch, we handle everything so you can focus on what you do best.
            </p>
          </div>
          
          <div className="modern-card p-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-4" style={{ position: 'relative', zIndex: 2 }}>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className={`terminal-input ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className={`terminal-input ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                      className={`terminal-input ${errors.phone ? 'error' : ''}`}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                  
                  <div className="input-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      rows={4}
                      className={`terminal-input ${errors.message ? 'error' : ''}`}
                    ></textarea>
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>
                  
                  {!success && detail && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm">
                      {detail}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || success}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white'
                    }}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 
