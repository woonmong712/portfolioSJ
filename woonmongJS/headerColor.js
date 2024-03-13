document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const header = document.querySelector("header");
    
    function changeHeaderColorOnScroll() {
        let scrollPosition = window.scrollY + header.offsetHeight;
        
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                // 현재 스크롤 위치에 해당하는 섹션의 배경색으로 헤더 색상 변경
                const bgColor = section.dataset.backgroundColor;
                header.style.backgroundColor = bgColor;
            }
        });
    }
    
    window.addEventListener("scroll", changeHeaderColorOnScroll);
    changeHeaderColorOnScroll(); // 페이지 로드 시 실행하여 초기 헤더 색상 설정
});

