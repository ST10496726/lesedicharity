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
const fadeElements = document.querySelectorAll(".fade-in");

const appearScroll = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

(document.querySelectorAll('.fade-in')).forEach(el => appearScroll.observe(el));
