// Enhanced Portfolio Website JavaScript
// Featuring dark mode, typewriter effect, and enhanced animations

class EnhancedPortfolio {
  constructor() {
    this.init();
    this.setupThemeToggle();
    this.setupTypewriterEffect();
    this.setupEnhancedAnimations();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupProjectInteractions();
    this.setupContactInteractions();
    this.setupFunInteractions();
  }

  // Theme Toggle Functionality
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    const body = document.body;

    // Check for saved theme preference, system preference, or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    this.applyTheme(currentTheme);

    // Theme toggle handlers
    [themeToggle, themeToggleMobile].forEach(toggle => {
      if (toggle) {
        toggle.addEventListener('click', () => {
          const isDarkMode = body.classList.contains('dark');
          const newTheme = isDarkMode ? 'light' : 'dark';
          
          this.applyTheme(newTheme);
          localStorage.setItem('theme', newTheme);
          
          // Add a nice transition effect
          this.addThemeTransitionEffect();
          
          // Show fun notification
          this.showFunNotification(`Switched to ${newTheme} mode! ${newTheme === 'dark' ? '🌙' : '☀️'}`);
        });
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  applyTheme(theme) {
    const html = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      body.classList.add('dark');
      this.updateThemeIcons(true);
    } else {
      html.setAttribute('data-theme', 'light');
      body.classList.remove('dark');
      this.updateThemeIcons(false);
    }
  }

  updateThemeIcons(isDarkMode) {
    const lightIcons = document.querySelectorAll('#theme-toggle-light-icon, #theme-toggle-light-icon-mobile');
    const darkIcons = document.querySelectorAll('#theme-toggle-dark-icon, #theme-toggle-dark-icon-mobile');

    if (isDarkMode) {
      lightIcons.forEach(icon => icon.classList.add('hidden'));
      darkIcons.forEach(icon => icon.classList.remove('hidden'));
    } else {
      lightIcons.forEach(icon => icon.classList.remove('hidden'));
      darkIcons.forEach(icon => icon.classList.add('hidden'));
    }
  }

  addThemeTransitionEffect() {
    // Create a subtle ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(ripple);

    // Animate the ripple
    requestAnimationFrame(() => {
      ripple.style.width = '200vh';
      ripple.style.height = '200vh';
      ripple.style.opacity = '0';
    });

    // Clean up
    setTimeout(() => {
      if (document.body.contains(ripple)) {
        document.body.removeChild(ripple);
      }
    }, 600);
  }

  // Typewriter Effect
  setupTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const texts = [
      "Computer Science student passionate about AI and software development.",
      "Building meaningful solutions through clean code and innovative thinking.",
      "Turning coffee into code, one algorithm at a time. ☕",
      "Always learning, always growing, always coding. 🚀"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentText = '';

    const typeSpeed = 50;
    const deleteSpeed = 30;
    const pauseTime = 2000;

    function type() {
      const fullText = texts[textIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;
      }

      typewriterElement.textContent = currentText;

      let timeout = typeSpeed;

      if (isDeleting) {
        timeout = deleteSpeed;
      }

      if (!isDeleting && charIndex === fullText.length) {
        timeout = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(type, timeout);
    }

    // Start the typewriter effect with a short delay
    setTimeout(type, 1000);
  }

  // Enhanced Animations
  setupEnhancedAnimations() {
    // Add stagger animation to skill items
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach((group, index) => {
      group.style.animationDelay = `${index * 0.1}s`;
      group.classList.add('animate-fade-in-up');
    });

    // Add floating animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = `translateY(-8px) rotateY(${Math.random() * 10 - 5}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
      });
    });
  }

  // Navigation with enhanced effects
  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const offset = 80;
          const elementPosition = targetSection.offsetTop - offset;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });

          this.updateActiveNavLink(link);
          this.closeMobileMenu();

          // Add a fun notification
          this.showFunNotification(`Navigating to ${targetId} section! 🚀`);
        }
      });
    });

    window.addEventListener(
      "scroll",
      this.throttle(() => {
        this.updateActiveNavOnScroll();
      }, 100)
    );
  }

  setupMobileMenu() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");

        const icon = mobileMenuButton.querySelector("svg path");
        if (mobileMenu.classList.contains("hidden")) {
          icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
        } else {
          icon.setAttribute("d", "M6 18L18 6M6 6l12 12");
        }
      });

      const mobileNavLinks = mobileMenu.querySelectorAll("a");
      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });

      document.addEventListener("click", (e) => {
        if (
          !mobileMenuButton.contains(e.target) &&
          !mobileMenu.contains(e.target)
        ) {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuButton = document.getElementById("mobile-menu-button");

    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");

      const icon = mobileMenuButton.querySelector("svg path");
      icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
  }

  updateActiveNavLink(activeLink) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("text-gray-900", "dark:text-white", "font-medium");
      link.classList.add("text-gray-600", "dark:text-gray-300");
    });

    activeLink.classList.remove("text-gray-600", "dark:text-gray-300");
    activeLink.classList.add("text-gray-900", "dark:text-white", "font-medium");
  }

  updateActiveNavOnScroll() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("text-gray-900", "dark:text-white", "font-medium");
      link.classList.add("text-gray-600", "dark:text-gray-300");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.remove("text-gray-600", "dark:text-gray-300");
        link.classList.add("text-gray-900", "dark:text-white", "font-medium");
      }
    });
  }

  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.classList.add("fade-in-complete");
          }, index * 100); // Staggered animation
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
      "section, .project-card, .skill-group, .education-card"
    );

    elementsToObserve.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(element);
    });
  }

  setupProjectInteractions() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const cardElement = card.querySelector(".floating-card");
        cardElement.style.transform = "translateY(-8px) rotateX(5deg)";
      });

      card.addEventListener("mouseleave", () => {
        const cardElement = card.querySelector(".floating-card");
        cardElement.style.transform = "translateY(0) rotateX(0deg)";
      });
    });

    const githubLinks = document.querySelectorAll(".github-link");
    githubLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || href === "#" || href === "coming-soon") {
          e.preventDefault();
          this.showFunNotification("GitHub repository coming soon! 🚧");
        }
      });
    });
  }

  setupContactInteractions() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.showFunNotification("Opening your email client! 📧");
      });
    });

    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach((link) => {
      link.addEventListener("click", () => {
        link.style.transform = "scale(0.95)";
        setTimeout(() => {
          link.style.transform = "scale(1)";
        }, 150);
      });
    });
  }

  // Fun interactions and micro-copy
  setupFunInteractions() {
    // Add fun hover effects to fun-copy elements
    const funCopyElements = document.querySelectorAll('.fun-copy');
    funCopyElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.05)';
        element.style.color = '#3b82f6';
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
      });
    });

    // Add konami code easter egg
    this.setupKonamiCode();

    // Add click counter for fun
    this.setupClickCounter();
  }

  setupKonamiCode() {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let userInput = [];

    document.addEventListener('keydown', (e) => {
      userInput.push(e.code);
      if (userInput.length > konamiCode.length) {
        userInput.shift();
      }

      if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
        this.triggerKonamiEasterEgg();
        userInput = [];
      }
    });
  }

  triggerKonamiEasterEgg() {
    // Create a fun confetti effect
    this.showFunNotification("🎉 Konami Code activated! You're awesome! 🎉");
    
    // Add temporary rainbow effect to the page
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff0080)';
    document.body.style.backgroundSize = '200% 200%';
    document.body.style.animation = 'rainbow 2s ease infinite';

    setTimeout(() => {
      document.body.style.background = '';
      document.body.style.animation = '';
    }, 3000);
  }

  setupClickCounter() {
    let clickCount = 0;
    const funMessages = [
      "Keep clicking! 🖱️",
      "You're really going for it! 💪",
      "Wow, dedication! 🌟",
      "Are you testing me? 🤔",
      "Alright, I'm impressed! 👏"
    ];

    document.addEventListener('click', () => {
      clickCount++;
      if (clickCount % 50 === 0 && clickCount <= 250) {
        const messageIndex = Math.min(Math.floor(clickCount / 50) - 1, funMessages.length - 1);
        this.showFunNotification(funMessages[messageIndex]);
      }
    });
  }

  showFunNotification(message) {
    const notification = document.createElement("div");
    notification.className = "fixed top-20 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm max-w-xs transform transition-all duration-300 backdrop-blur-sm";
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span>${message}</span>
        <button class="ml-2 text-white/80 hover:text-white" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    notification.style.transform = "translateX(100%) rotateY(90deg)";
    notification.style.opacity = "0";

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0) rotateY(0deg)";
      notification.style.opacity = "1";
    });

    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%) rotateY(90deg)";
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 4000);
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  handleResize() {
    if (window.innerWidth >= 768) {
      this.closeMobileMenu();
    }
  }
}

// Initialize enhanced portfolio when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new EnhancedPortfolio();

  // Handle window resize
  window.addEventListener("resize", () => {
    portfolio.handleResize();
  });

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      portfolio.closeMobileMenu();
    }
  });

  // Add rainbow animation for konami code
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
  `;
  document.head.appendChild(style);

  console.log("🚀 Enhanced Portfolio with Dark Mode initialized successfully!");
  console.log("💡 Try the Konami Code: ↑↑↓↓←→←→BA");
  console.log("🌙 Dark mode toggle added - try clicking the theme button!");
});

// Add global utilities with enhanced features
window.portfolioUtils = {
  smoothScrollTo: (element, offset = 80) => {
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  },

  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  getTheme: () => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  },

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    const html = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      body.classList.add('dark');
    } else {
      html.setAttribute('data-theme', 'light');
      body.classList.remove('dark');
    }
  }
};
