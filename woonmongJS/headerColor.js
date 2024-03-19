document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const header = document.querySelector("header");
    const aboutMenu = document.querySelector('nav ul li a[href="#about"]');

    function updateHeaderStyle() {
        let scrollPosition = window.scrollY + header.offsetHeight;
        
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                // 현재 스크롤 위치에 해당하는 섹션의 배경색으로 헤더 색상 변경
                header.style.backgroundColor = section.dataset.backgroundColor || "";
                
                // 'about' 섹션의 배경색에 따라 메뉴 폰트 색 반전
                if (section.id === "about") {
                    aboutMenu.classList.add('active');
                } else {
                    aboutMenu.classList.remove('active');
                }
            }
        });
    }

    function checkHash() {
        if (window.location.hash === '#about' && aboutMenu) {
            aboutMenu.classList.add('active');
        } else if (aboutMenu) {
            aboutMenu.classList.remove('active');
        }
    }

    // 스크롤 및 해시 변경 시 스타일 업데이트
    window.addEventListener("scroll", updateHeaderStyle);
    window.addEventListener('hashchange', checkHash);

    // 페이지 로드 시 스타일 초기화
    updateHeaderStyle();
    checkHash();
});