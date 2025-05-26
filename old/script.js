// Minimalist Portfolio Website JavaScript
// Clean, focused implementation for navigation, interactions, and user experience

class MinimalistPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupProjectInteractions();
    this.setupContactInteractions();
  }

  setupNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-link");

    // Add smooth scrolling
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Calculate offset for fixed navigation
          const offset = 80;
          const elementPosition = targetSection.offsetTop - offset;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });

          // Update active navigation state
          this.updateActiveNavLink(link);

          // Close mobile menu if open
          this.closeMobileMenu();
        }
      });
    });

    // Update active nav link on scroll
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

        // Update button icon
        const icon = mobileMenuButton.querySelector("svg path");
        if (mobileMenu.classList.contains("hidden")) {
          icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
        } else {
          icon.setAttribute("d", "M6 18L18 6M6 6l12 12");
        }
      });

      // Close mobile menu when clicking navigation links
      const mobileNavLinks = mobileMenu.querySelectorAll("a");
      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });

      // Close mobile menu when clicking outside
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

      // Reset button icon
      const icon = mobileMenuButton.querySelector("svg path");
      icon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
  }

  updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("text-gray-900", "font-medium");
      link.classList.add("text-gray-600");
    });

    // Add active class to current link
    activeLink.classList.remove("text-gray-600");
    activeLink.classList.add("text-gray-900", "font-medium");
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

    // Update active navigation link
    navLinks.forEach((link) => {
      link.classList.remove("text-gray-900", "font-medium");
      link.classList.add("text-gray-600");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.remove("text-gray-600");
        link.classList.add("text-gray-900", "font-medium");
      }
    });
  }

  setupScrollEffects() {
    // Intersection Observer for subtle fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.classList.add("fade-in-complete");
        }
      });
    }, observerOptions);

    // Observe sections and important elements
    const elementsToObserve = document.querySelectorAll(
      "section, .project-card, .skill-category"
    );

    elementsToObserve.forEach((element) => {
      // Set initial state for animation
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
  }

  setupProjectInteractions() {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      // Add subtle hover effects
      card.addEventListener("mouseenter", () => {
        const cardElement = card.querySelector("div");
        cardElement.style.transform = "translateY(-2px)";
      });

      card.addEventListener("mouseleave", () => {
        const cardElement = card.querySelector("div");
        cardElement.style.transform = "translateY(0)";
      });
    });

    // GitHub link interactions
    const githubLinks = document.querySelectorAll(".github-link");

    githubLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");

        // Check if href is missing, empty, or still a placeholder
        if (!href || href === "#" || href === "coming-soon") {
          e.preventDefault();
          showNotification("GitHub repository links coming soon!");
        }
        // Otherwise, allow the link to work as normal
      });
    });

    // Assuming showNotification is a function you've defined elsewhere:
    function showNotification(message) {
      alert(message); // or use your custom UI
    }
  }

  setupContactInteractions() {
    // Email link tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Track email interactions
        console.log("Email contact initiated");
      });
    });

    // External link handling
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Add small delay to show interaction
        link.style.transform = "scale(0.98)";
        setTimeout(() => {
          link.style.transform = "scale(1)";
        }, 100);
      });
    });
  }

  showNotification(message) {
    // Create clean notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-20 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-sm max-w-xs";
    notification.textContent = message;

    // Set initial state
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";
    notification.style.transition = "all 0.3s ease";

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
      notification.style.opacity = "1";
    });

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Utility function for performance optimization
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

  // Handle window resize
  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      this.closeMobileMenu();
    }
  }
}

// Initialize portfolio when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new MinimalistPortfolio();

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

  // Smooth scrolling polyfill for older browsers
  if (!("scrollBehavior" in document.documentElement.style)) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  console.log("Portfolio initialized successfully");
});

// Add global utilities
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
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};
