// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initScrollEffects();
    initFilterTabs();
    initArticles();
    initDonationForm();
    initSmoothScrolling();
});

// Sample articles data
const articlesData = [
    {
        id: 1,
        title: "Finding True Happiness in Simple Moments",
        excerpt: "Discover how the smallest moments in life can bring the greatest joy and fulfillment to your daily existence.",
        tags: ["happiness", "mindfulness"],
        category: "happiness",
        date: "2024-01-15",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Understanding Your Life's Purpose",
        excerpt: "A deep dive into discovering what truly matters to you and how to align your actions with your core values.",
        tags: ["purpose", "self-discovery"],
        category: "purpose",
        date: "2024-01-12",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "The Wisdom of Letting Go",
        excerpt: "Learn the profound art of releasing what no longer serves you and embracing the freedom that follows.",
        tags: ["wisdom", "growth"],
        category: "wisdom",
        date: "2024-01-10",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Building Meaningful Relationships",
        excerpt: "Explore the foundations of deep, authentic connections and how they transform our lives.",
        tags: ["relationships", "growth"],
        category: "growth",
        date: "2024-01-08",
        readTime: "7 min read"
    },
    {
        id: 5,
        title: "Embracing Change with Grace",
        excerpt: "How to navigate life's inevitable changes with wisdom, acceptance, and inner peace.",
        tags: ["wisdom", "growth"],
        category: "wisdom",
        date: "2024-01-05",
        readTime: "5 min read"
    },
    {
        id: 6,
        title: "The Power of Gratitude",
        excerpt: "Transform your perspective and find joy in everyday life through the practice of genuine gratitude.",
        tags: ["happiness", "mindfulness"],
        category: "happiness",
        date: "2024-01-03",
        readTime: "4 min read"
    }
];

let currentFilter = 'all';
let displayedArticles = 3;

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        } else {
            mobileMenu.classList.add('active');
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.article-card, .about-content, .donate-content');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Filter tabs functionality
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.dataset.filter;
            
            // Reset displayed articles count
            displayedArticles = 3;
            
            // Re-render articles
            renderArticles();
        });
    });
}

// Articles functionality
function initArticles() {
    renderArticles();
    
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.addEventListener('click', function() {
        displayedArticles += 3;
        renderArticles();
    });
}

function renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // Filter articles based on current filter
    let filteredArticles = articlesData;
    if (currentFilter !== 'all') {
        filteredArticles = articlesData.filter(article => 
            article.category === currentFilter || 
            article.tags.includes(currentFilter)
        );
    }
    
    // Get articles to display
    const articlesToShow = filteredArticles.slice(0, displayedArticles);
    
    // Clear grid
    articlesGrid.innerHTML = '';
    
    // Render articles
    articlesToShow.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesGrid.appendChild(articleCard);
    });
    
    // Show/hide load more button
    if (displayedArticles >= filteredArticles.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
    
    // Re-initialize Lucide icons for new content
    lucide.createIcons();
}

function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'article-card';
    
    card.innerHTML = `
        <div class="article-image">
            <i data-lucide="book-open"></i>
        </div>
        <div class="article-content">
            <div class="article-tags">
                ${article.tags.map(tag => `<span class="article-tag">${tag}</span>`).join('')}
            </div>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
                <span>${formatDate(article.date)}</span>
                <span>${article.readTime}</span>
            </div>
        </div>
    `;
    
    // Add click handler for article
    card.addEventListener('click', function() {
        openArticle(article);
    });
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function openArticle(article) {
    // In a real application, this would navigate to the article page
    alert(`Opening article: "${article.title}"\n\nThis would normally open the full article page.`);
}

// Donation form functionality
function initDonationForm() {
    const donationBtns = document.querySelectorAll('.donation-btn');
    const customAmountDiv = document.getElementById('custom-amount');
    const customAmountInput = document.getElementById('custom-amount-input');
    const donateBtn = document.getElementById('donate-btn');
    
    let selectedAmount = 50; // Default amount
    
    donationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            donationBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const amount = this.dataset.amount;
            
            if (amount === 'custom') {
                customAmountDiv.style.display = 'block';
                customAmountInput.focus();
                selectedAmount = null;
            } else {
                customAmountDiv.style.display = 'none';
                selectedAmount = parseInt(amount);
            }
        });
    });
    
    customAmountInput.addEventListener('input', function() {
        selectedAmount = parseInt(this.value) || null;
    });
    
    donateBtn.addEventListener('click', function() {
        const finalAmount = selectedAmount || parseInt(customAmountInput.value);
        
        if (!finalAmount || finalAmount < 1) {
            alert('Please select or enter a valid donation amount.');
            return;
        }
        
        // In a real application, this would integrate with a payment processor
        alert(`Thank you for your generous donation of $${finalAmount}!\n\nThis would normally redirect to a secure payment page.`);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add parallax effect to hero section (subtle)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        }, 10));
    }
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // This could be enhanced with a typing animation library
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transition = 'opacity 1s ease-in-out';
        }, 500);
    }
});