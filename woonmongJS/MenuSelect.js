document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function activateLinkOnScroll() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

        // 스크롤 시에는 모든 링크에서 'active' 클래스를 일단 제거합니다.
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeId = sections[index].getAttribute('id');
        const activeNavLink = document.querySelector(`nav ul li a[href="#${activeId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', activateLinkOnScroll);
    activateLinkOnScroll(); // 페이지 로딩 시 활성화된 섹션에 대한 링크를 활성화합니다.
});
