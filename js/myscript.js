/* ===============================
   GLOBAL INTERACTIVE SCRIPT
   Lesedi Charity
   =============================== */

/* -------------------------------
   1. Fade-in Animation on Scroll
--------------------------------- */

function revealOnScroll() {
    (document.querySelectorAll('.fade-in')).forEach(el => {
        const elementPos = el.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (elementPos < screenPos) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


/* -------------------------------
   2. Modal Popup for Programs
--------------------------------- */
const modalButtons = document.querySelectorAll('.learn-more-btn');
const modals = document.querySelectorAll('.modal');

modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalID = btn.getAttribute('data-modal');
        document.getElementById(modalID).style.display = 'block';
    });
});

// Close modal on X click
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.parentElement.parentElement.style.display = 'none';
    });
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});


/* -------------------------------
   3. Lightbox Image Gallery
--------------------------------- */
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

function openLightbox(src, alt) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');

    // Lightbox container
    const box = document.createElement('div');
    box.classList.add('lightbox-box');

    // Image
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;

    // Close button
    const close = document.createElement('span');
    close.classList.add('lightbox-close');
    close.textContent = '×';
    close.addEventListener('click', () => overlay.remove());

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    box.appendChild(close);
    box.appendChild(image);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}


/* -------------------------------
   4. Newsletter Form Validation
--------------------------------- */
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMsg = document.getElementById('newsletterMsg');

if (document.getElementById('newsletterForm')) {
    (document.getElementById('newsletterForm')).addEventListener('submit', (e) => {
        e.preventDefault();

        const email = newsletterEmail.value.trim();
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!validEmail.test(email)) {
            newsletterMsg.textContent = "Please enter a valid email address.";
            newsletterMsg.style.color = "red";
            return;
        }

        newsletterMsg.textContent = "Subscribed successfully!";
        newsletterMsg.style.color = "green";
        (document.getElementById('newsletterForm')).reset();
    });
}


/* -------------------------------------------------------
   5. Accordion + Tabs (used for other pages later)
   ------------------------------------------------------- */

// Accordion
function activateAccordion(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            const panel = item.nextElementSibling;
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    });
}

// Tabs
function activateTabs(tabButtonsSelector, tabContentSelector) {
    const buttons = document.querySelectorAll(tabButtonsSelector);
    const contents = document.querySelectorAll(tabContentSelector);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            contents.forEach(content => {
                content.style.display = content.id === target ? "block" : "none";
            });
        });
    });
}


/* -------------------------------------------------------
   6. Reusable Utility Functions (used on all pages)
   ------------------------------------------------------- */

// Smooth scrolling
function smoothScrollTo(elementID) {
    document.getElementById(elementID).scrollIntoView({
        behavior: "smooth"
    });
}

// -------------------------------
// GET INVOLVED FORM VALIDATION
// -------------------------------
const involvedForm = document.getElementById("involvedForm");
const involvedSuccess = document.getElementById("involved-success");

if (involvedForm) {
    involvedForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const involvement = document.getElementById("involvement").value.trim();

        if (name === "" || email === "" || involvement === "") {
            alert("Please complete all required fields.");
            return;
        }

        if (!email.includes("@")) {
            alert("Please enter a valid email.");
            return;
        }

        involvedSuccess.style.display = "block";
        involvedSuccess.style.opacity = "1";
        involvedForm.reset();

        setTimeout(() => {
            involvedSuccess.style.opacity = "0";
        }, 5000);
    });
}

/* -------------------------
   PROJECT SEARCH FILTER
---------------------------*/
const projectSearch = document.getElementById("projectSearch");
const projects = document.querySelectorAll(".project");

if (projectSearch) {
    projectSearch.addEventListener("keyup", () => {
        const keyword = projectSearch.value.toLowerCase();

        projects.forEach(project => {
            if (project.innerText.toLowerCase().includes(keyword)) {
                project.style.display = "block";
            } else {
                project.style.display = "none";
            }
        });
    });
}

/* -------------------------
      LIGHTBOX GALLERY
---------------------------*/
const lightboxImages = document.querySelectorAll(".lightbox-img");
const lightboxModal = document.getElementById("lightboxModal");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImg = document.getElementById("lightboxImg");

if (lightboxImages) {
    lightboxImages.forEach(img => {
        img.addEventListener("click", () => {
            lightboxModal.style.display = "block";
            lightboxImg.src = img.src;
        });
    });
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
        lightboxModal.style.display = "none";
    });
}

/* Close modal by clicking outside the image */
window.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
        lightboxModal.style.display = "none";
    }
});

/* -------------------------
       SCROLL ANIMATIONS
---------------------------*/

const appearScroll = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

(document.querySelectorAll('.fade-in')).forEach(el => appearScroll.observe(el));

// -------------------------------
// MOBILE MENU TOGGLE (future proof)
// -------------------------------
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-toggle");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("open");
    });
}

// -------------------------------
// FADE-IN ON SCROLL EFFECT
// -------------------------------
const fadeElements = document.querySelectorAll(".fade-in");

function handleFadeIn() {
    (document.querySelectorAll(".fade-in")).forEach(el => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (position < windowHeight - 100) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", handleFadeIn);
window.addEventListener("load", handleFadeIn);


// -------------------------------
// CONTACT FORM VALIDATION
// -------------------------------
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contact-success");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page refresh

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Simple validation
        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Please fill out all fields before submitting.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address.");
            return;
        }

        // Show success message
        contactSuccess.style.display = "block";
        contactSuccess.style.opacity = "1";

        // Clear form
        contactForm.reset();

        // Hide after 5 seconds
        setTimeout(() => {
            contactSuccess.style.opacity = "0";
        }, 5000);
    });
}


// -------------------------------
// NEWSLETTER FORM
// -------------------------------
const newsletterForm = document.getElementById("newsletterForm");
const newsletterSuccess = document.getElementById("newsletter-success");

if (document.getElementById('newsletterForm')) {
    (document.getElementById('newsletterForm')).addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("newsletterEmail").value.trim();

        if (email === "" || !email.includes("@")) {
            alert("Please enter a valid email to subscribe.");
            return;
        }

        // Show success message
        newsletterSuccess.style.display = "block";
        newsletterSuccess.style.opacity = "1";

        (document.getElementById('newsletterForm')).reset();

        // Hide message
        setTimeout(() => {
            newsletterSuccess.style.opacity = "0";
        }, 5000);
    });
}


// -------------------------------
// SMOOTH SCROLL (optional future)
// -------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
