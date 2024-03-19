document.addEventListener("DOMContentLoaded", function() {
    const portfolioContainer = document.querySelector('#portfolio .portfolio-container');
    let isDragging = false,
        startX = 0,
        scrollLeft = 0,
        lastKnownScrollPosition = 0,
        ticking = false;

    const prevButton = document.querySelector('#portfolio .prev');
    const nextButton = document.querySelector('#portfolio .next');
    const pages = document.querySelectorAll('#portfolio .portfolio-page');
    let currentPageIndex = 0; // 현재 페이지 인덱스
    const totalPages = pages.length; // 총 페이지 수
    let lastScrollTime = 0; // 마지막 스크롤 이벤트 시간

    const tabs = document.querySelectorAll('nav ul li a'); // 모든 탭 선택

    // 활성 탭 업데이트 함수
    function setActiveTab() {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        const activeTab = document.querySelector('nav ul li a[href="' + window.location.hash + '"]');
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    // 모든 탭에 클릭 이벤트 리스너를 추가합니다.
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 이벤트 방지
            tabs.forEach(t => t.classList.remove('active')); // 모든 탭의 active 클래스 제거
            this.classList.add('active'); // 클릭된 탭에 active 클래스 추가
            const href = this.getAttribute('href');
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' }); // 스크롤 이동
            window.location.hash = href; // URL 해시 변경
        });
    });

    // 스크롤 이벤트 최적화를 위한 RequestAnimationFrame
    window.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleButtonsVisibility(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    });

    // 버튼 표시 상태를 토글하는 함수
    function toggleButtonsVisibility(scrollPos) {
        const rect = portfolioContainer.getBoundingClientRect();
        if(rect.top < window.innerHeight && rect.bottom >= 0) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        } else {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    // 초기 상태에서도 버튼 가시성을 설정합니다.
    toggleButtonsVisibility();

    // 페이지 가시성 업데이트 함수
    function updatePageVisibility() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPageIndex ? 'block' : 'none';
        });
    }

    // 마우스 이벤트 핸들러
    portfolioContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - portfolioContainer.offsetLeft;
        scrollLeft = portfolioContainer.scrollLeft;
    });

    portfolioContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - portfolioContainer.offsetLeft;
        const walk = (x - startX) * 3;
        portfolioContainer.scrollLeft = scrollLeft - walk;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    portfolioContainer.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // 다음 페이지 스크롤 함수
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

    // 이전 페이지 스크롤 함수
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

    // 버튼 클릭 이벤트 핸들러
    prevButton.addEventListener('click', scrollPrevPage);
    nextButton.addEventListener('click', scrollNextPage);

    // 페이지 로드 시 초기 페이지 가시성 설정
    updatePageVisibility();

    // 페이지 로드 및 해시 변경 시 활성 탭 업데이트
    setActiveTab();
    window.addEventListener('hashchange', setActiveTab);
});
