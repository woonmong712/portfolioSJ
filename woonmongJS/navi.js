
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const pageCircles = document.querySelectorAll(".page");

    function activateLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").substring(1) === sectionId);
        });
        pageCircles.forEach((circle, index) => {
            circle.classList.toggle("active", navLinks[index].getAttribute("href").substring(1) === sectionId);
        });
    }

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });
        activateLink(current);
    });
});

