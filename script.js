// Inspax website interactions
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle, #menu-toggle, [data-menu-toggle]");
  const nav = document.querySelector(".nav-links, #nav-links, [data-nav]");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Automatically update the copyright year
  const yearElements = document.querySelectorAll("#year, [data-current-year]");
  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Validate the enquiry form and open a pre-filled email
  const enquiryForm = document.querySelector("#enquiry-form, #contact-form, form[data-enquiry-form]");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) return;

      const formData = new FormData(enquiryForm);
      const getValue = (...keys) => {
        for (const key of keys) {
          const value = formData.get(key);
          if (value !== null && String(value).trim()) return String(value).trim();
        }
        return "";
      };

      const name = getValue("name", "fullName", "fullname");
      const email = getValue("email");
      const phone = getValue("phone", "mobile", "contact");
      const service = getValue("service", "subject");
      const message = getValue("message", "enquiry", "details");

      const subject = encodeURIComponent(`Website enquiry${service ? ` - ${service}` : ""}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
      );

      // This opens the visitor's email application; it does not send automatically.
      window.location.href = `mailto:info@inspax.in?subject=${subject}&body=${body}`;
    });
  }
});
