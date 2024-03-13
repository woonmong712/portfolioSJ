document.addEventListener("DOMContentLoaded", function() {
    const portfolioContainer = document.querySelector('#portfolio .portfolio-container');
    let isScrolling = false;
    const prevButton = document.querySelector('#portfolio .prev');
    const nextButton = document.querySelector('#portfolio .next');
    const portfolioTab = document.querySelector('#portfolio-tab');
    const firstPortfolioPage = document.querySelector('.portfolio-page');

    // 포트폴리오 섹션 내에서 버튼의 표시 여부를 결정하는 함수
    function toggleButtonsVisibility() {
        const { top, bottom } = portfolioContainer.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) {
            // 포트폴리오 섹션 내에 있을 때
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        } else {
            // 포트폴리오 섹션을 벗어났을 때
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    // 스크롤 이벤트 처리
    window.addEventListener('wheel', function(e) {
        if (!isScrolling && e.deltaY > 0) { // 아래로 스크롤할 때만 작동
            isScrolling = true;
            scrollNextPage(); // 다음 페이지로 스크롤
            setTimeout(() => {
                isScrolling = false;
            }, 500); // 500ms 후에 다시 스크롤 가능하도록 설정
        }
    }, { passive: false });

    // 이전 페이지로 이동하는 버튼의 이벤트 리스너
    prevButton.addEventListener('click', function() {
        portfolioContainer.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    });

    // 다음 페이지로 이동하는 버튼의 이벤트 리스너
    nextButton.addEventListener('click', function() {
        portfolioContainer.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    });

    // 다음 페이지로 스크롤하는 함수
    function scrollNextPage() {
        const pages = document.querySelectorAll('#portfolio .portfolio-page');
        const currentPage = document.querySelector('#portfolio .portfolio-page[visible]');
        let nextPageIndex = Array.from(pages).indexOf(currentPage) + 1;

        if (currentPage && nextPageIndex < pages.length) {
            const nextPageOffset = pages[nextPageIndex].offsetLeft;
            portfolioContainer.scrollTo({
                left: nextPageOffset,
                behavior: 'smooth'
            });

            // currentPage가 null이 아닐 때만 속성을 변경
            currentPage.removeAttribute('visible');
            pages[nextPageIndex].setAttribute('visible', true);
        }        
    }

    if (portfolioTab && firstPortfolioPage) {
        portfolioTab.addEventListener('click', function() {
            // 첫 번째 페이지로 스크롤
            portfolioContainer.scrollTo({
                left: firstPortfolioPage.offsetLeft,
                behavior: 'smooth'
            });
            // 모든 페이지의 visible 속성 제거 후 첫 번째 페이지만 visible 설정
            document.querySelectorAll('.portfolio-page').forEach(page => {
                page.removeAttribute('visible');
            });
            firstPortfolioPage.setAttribute('visible', true);
        });
    }

    // 페이지 로드 시 및 스크롤 시 버튼의 표시 여부를 업데이트
    toggleButtonsVisibility();
    document.addEventListener('scroll', toggleButtonsVisibility);
});
