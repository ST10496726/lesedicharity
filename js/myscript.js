/* ===============================
   GLOBAL INTERACTIVE SCRIPT
   Lesedi Charity
   =============================== */

/* -------------------------------
   1. Fade-in Animation on Scroll
--------------------------------- */
const fadeElements = document.querySelectorAll('.fade-in');

function revealOnScroll() {
    fadeElements.forEach(el => {
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
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMsg = document.getElementById('newsletterMsg');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
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
        newsletterForm.reset();
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

