document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const links = document.querySelectorAll('.navbar a');
  const logo = document.querySelector('.logo'); // Changed from logo1 to logo

  // Toggle navbar
  if (hamburger && navbar) {
      hamburger.addEventListener('click', () => {
          navbar.classList.toggle('show');
          hamburger.textContent = navbar.classList.contains('show') ? '✕' : '☰';
          if (logo) {
              logo.classList.toggle('hide-logo');
          }
      });
  }

  // Close mobile menu when clicking on a link
  links.forEach(link => {
      link.addEventListener('click', () => {
          if (navbar.classList.contains('show')) {
              navbar.classList.remove('show');
              hamburger.textContent = '☰';
              if (logo) {
                  logo.classList.remove('hide-logo');
              }
          }
      });
  });

  // Highlight active link on scroll
  window.addEventListener('scroll', () => {
      let fromTop = window.scrollY + 100; // Adjusted offset for your header
      
      links.forEach(link => {
          const sectionId = link.getAttribute('href');
          if (sectionId.startsWith('#')) {
              const section = document.querySelector(sectionId);
              if (section) {
                  if (section.offsetTop <= fromTop && 
                      section.offsetTop + section.offsetHeight > fromTop) {
                      links.forEach(l => l.classList.remove('active'));
                      link.classList.add('active');
                  }
              }
          }
      });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.test');
  const prevBtn = document.querySelector('.fa-arrow-left'); // Changed to class selector
  const nextBtn = document.querySelector('.fa-arrow-right'); // Changed to class selector
  const dotsContainer = document.querySelector('.dots'); // Changed to class selector

  let current = 0;
  let autoSlideInterval;

  function showTestimonial(index) {
      testimonials.forEach((test, i) => {
          test.classList.toggle('active', i === index);
      });
      
      // Update dots if they exist
      if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('span');
          dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === index);
          });
      }
      
      current = index;
  }

  function createDots() {
      if (dotsContainer) {
          dotsContainer.innerHTML = ''; // Clear existing dots
          testimonials.forEach((_, i) => {
              const dot = document.createElement('span');
              dot.addEventListener('click', () => {
                  resetAutoSlide();
                  showTestimonial(i);
              });
              dotsContainer.appendChild(dot);
          });
      }
  }

  function nextTestimonial() {
      showTestimonial((current + 1) % testimonials.length);
  }

  function prevTestimonialFunc() {
      showTestimonial((current - 1 + testimonials.length) % testimonials.length);
  }

  function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextTestimonial, 5000);
  }

  // Initialize testimonial slider if elements exist
  if (testimonials.length > 0) {
      createDots();
      showTestimonial(0);
      autoSlideInterval = setInterval(nextTestimonial, 5000);

      // Pause on hover
      const testimonialSection = document.querySelector('.card6b');
      if (testimonialSection) {
          testimonialSection.addEventListener('mouseenter', () => {
              clearInterval(autoSlideInterval);
          });
          
          testimonialSection.addEventListener('mouseleave', () => {
              resetAutoSlide();
          });
      }
  }

  // Add event listeners for arrows if they exist
  if (prevBtn) {
      prevBtn.addEventListener('click', () => {
          prevTestimonialFunc();
          resetAutoSlide();
      });
  }

  if (nextBtn) {
      nextBtn.addEventListener('click', () => {
          nextTestimonial();
          resetAutoSlide();
      });
  }

  // Heartbeat animation for login button
  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn) {
      function heartbeat() {
          loginBtn.style.transform = 'scale(1.1)';
          setTimeout(() => {
              loginBtn.style.transform = 'scale(1)';
          }, 300);
      }
      setInterval(heartbeat, 2000);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
});