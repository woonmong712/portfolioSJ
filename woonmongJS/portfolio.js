document.addEventListener("DOMContentLoaded", function() {
    const portfolioContainer = document.querySelector('#portfolio .portfolio-container');
    let isDragging = false,
        startX = 0,
        scrollLeft = 0;

    const prevButton = document.querySelector('#portfolio .prev');
    const nextButton = document.querySelector('#portfolio .next');
    const pages = document.querySelectorAll('#portfolio .portfolio-page');
    let currentPageIndex = 0; // 현재 페이지 인덱스
    const totalPages = pages.length; // 총 페이지 수
    let lastScrollTime = 0; // 마지막 스크롤 이벤트 시간

    function updatePageVisibility() {
        pages.forEach((page, index) => {
            if (index === currentPageIndex) {
                page.setAttribute('visible', true);
            } else {
                page.removeAttribute('visible');
            }
        });
    }

    portfolioContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - portfolioContainer.offsetLeft;
        scrollLeft = portfolioContainer.scrollLeft;
    });

    portfolioContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - portfolioContainer.offsetLeft;
        const walk = (x - startX) * 3; // 드래그 속도
        portfolioContainer.scrollLeft = scrollLeft - walk;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    portfolioContainer.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // 스크롤 이벤트 처리 조정
    window.addEventListener('wheel', function(e) {
        const now = new Date().getTime();
        const { deltaY } = e;
        if (portfolioContainer.getBoundingClientRect().top < window.innerHeight && deltaY > 0 && currentPageIndex < totalPages - 1 && (now - lastScrollTime > 800)) {
            e.preventDefault(); // 기본 스크롤 동작 방지
            lastScrollTime = now;
            scrollNextPage();
        } else if (portfolioContainer.getBoundingClientRect().top < window.innerHeight && deltaY < 0 && currentPageIndex > 0 && (now - lastScrollTime > 800)) {
            e.preventDefault(); // 기본 스크롤 동작 방지
            lastScrollTime = now;
            scrollPrevPage();
        }
    }, { passive: false });

    function scrollNextPage() {
        if (currentPageIndex < totalPages - 1) {
            currentPageIndex++;
            portfolioContainer.scrollTo({
                left: portfolioContainer.offsetWidth * currentPageIndex,
                behavior: 'smooth'
            });
            updatePageVisibility();
        }
    }

    function scrollPrevPage() {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            portfolioContainer.scrollTo({
                left: portfolioContainer.offsetWidth * currentPageIndex,
                behavior: 'smooth'
            });
            updatePageVisibility();
        }
    }

    // 버튼 클릭 이벤트
    prevButton.addEventListener('click', function() {
        scrollPrevPage();
    });

    nextButton.addEventListener('click', function() {
        scrollNextPage();
    });

    updatePageVisibility(); // 초기 페이지 가시성 업데이트
});
