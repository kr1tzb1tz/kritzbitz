"use client"

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background pt-[var(--nav-height)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="modern-card p-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h1 className="section-title mb-6">THANK YOU!</h1>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Your message has been received. We&apos;ll reach out to you as soon as possible.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-background transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--teal) 0%, var(--secondary) 100%)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, var(--secondary) 0%, var(--teal) 100%)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, var(--teal) 0%, var(--secondary) 100%)';
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 