// Sticky bottom bar controller
document.addEventListener('DOMContentLoaded', () => {
  const sbar = document.getElementById('sbar') || document.querySelector('.sbar');
  const heroSection = document.querySelector('.bhero');

  if (sbar && heroSection) {
    const handleScroll = () => {
      const heroRect = heroSection.getBoundingClientRect();
      if (heroRect.bottom < 80) {
        sbar.classList.add('show');
        document.body.classList.add('has-sbar');
      } else {
        sbar.classList.remove('show');
        document.body.classList.remove('has-sbar');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Track events for analytics
  function trackEvent(eventName, eventData = {}) {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || 'direct',
      ...eventData
    };
    console.log('[Analytics]:', payload);
  }

  // Initial page view event
  trackEvent('page_view', { book: "The Women of the Crown", channel: "Royal Crown" });

  // Track checkout button clicks
  document.querySelectorAll('a[href*="whop.com/checkout"]').forEach(btn => {
    btn.addEventListener('click', function() {
      const href = this.getAttribute('href');
      let plan = 'unknown';
      if (href.includes('plan_9xVY1rgk9i0gf')) plan = 'combo_24_99';
      else if (href.includes('plan_hRf92Ms7G6flG')) plan = 'ebook_16_99';
      else if (href.includes('plan_of3x0W1rA9uFp')) plan = 'audiobook_16_99';

      trackEvent('checkout_click', {
        plan: plan,
        checkoutUrl: href,
        buttonText: this.innerText.replace(/\s+/g, ' ').trim()
      });
    });
  });
});
