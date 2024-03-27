document.addEventListener("DOMContentLoaded", function() {
    // 선언부
    const portfolioContainer = document.querySelector('#portfolio .portfolio-container');
    const prevButton = document.querySelector('#portfolio .prev');
    const nextButton = document.querySelector('#portfolio .next');
    const pages = document.querySelectorAll('#portfolio .portfolio-page');
    const tabs = document.querySelectorAll('nav ul li a');
    
    let currentPageIndex = 0;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let lastKnownScrollPosition = 0;
    let ticking = false;

    // 탭 클릭 시 동작
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            setActiveTab(this.getAttribute('href'));
        });
    });

    // 활성 탭 설정
    function setActiveTab(hash) {
        tabs.forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`nav ul li a[href="${hash}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            window.location.hash = hash;
        }
    }

    // 스크롤 최적화
    window.addEventListener('scroll', function() {
        lastKnownScrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                toggleButtonsVisibility(lastKnownScrollPosition);
                ticking = false;
            });
            ticking = true;
        }
    });

    // 버튼 가시성 토글
    function toggleButtonsVisibility(scrollPos) {
        // 버튼 가시성 조절 로직
    }

    // 페이지 가시성 업데이트
    function updatePageVisibility() {
        pages.forEach((page, index) => {
            page.style.display = index === currentPageIndex ? 'block' : 'none';
        });
    }

    // 초기 상태 설정
    toggleButtonsVisibility();
    updatePageVisibility();
    setActiveTab(window.location.hash || '#home');

    // 해시 변경 감지
    window.addEventListener('hashchange', () => {
        setActiveTab(window.location.hash);
    });

    // 이벤트 핸들러
    prevButton.addEventListener('click', scrollPrevPage);
    nextButton.addEventListener('click', scrollNextPage);

    // 세부 항목 클릭 이벤트
    document.querySelectorAll('.portfolio-sections ol li, .portfolio-sections ul li').forEach(item => {
        item.addEventListener('click', function() {
            handlePortfolioItemClick(this);
        });
    });

    document.getElementById('hello-menu').addEventListener('click', function(event) {
        event.preventDefault();
        showHelloPage();
    });
});

// 상세 페이지를 표시하는 함수
function showPortfolioDetail(itemId) {
    const detailsElement = document.getElementById('portfolioDetails');
    // 상세 페이지 내용을 설정하는 부분입니다.
    // 이 부분에서 실제 데이터를 기반으로 HTML 내용을 생성하거나
    // 서버로부터 데이터를 가져와서 표시할 수 있습니다.
    const detailContent = `<h2>Details for ${itemId}</h2><p>여기에 '${itemId}'에 대한 상세 내용을 표시합니다.</p>`;
    
    // detailsElement의 HTML을 새로운 내용으로 채웁니다.
    detailsElement.innerHTML = detailContent;
    
    // detailsElement를 보이게 합니다.
    detailsElement.style.display = 'block';
}

// 모든 포트폴리오 리스트 항목에 클릭 이벤트 리스너를 추가합니다.
document.querySelectorAll('.portfolio-sections ol li, .portfolio-sections ul li').forEach(item => {
    item.addEventListener('click', function() {
        // 클릭된 항목의 id를 사용하여 상세 내용을 표시합니다.
        showPortfolioDetail(this.id);
    });
});

document.querySelectorAll('.portfolio-sections ol li > ol li').forEach(item => {
    item.addEventListener('click', function() {
        // 모든 상세 페이지를 숨깁니다.
        document.querySelectorAll('.portfolio-page').forEach(page => {
            page.classList.remove('active');
        });
        
        // 클릭된 항목에 해당하는 상세 페이지를 표시합니다.
        const pageId = this.id + '-page';
        const pageElement = document.getElementById(pageId);
        if (pageElement) {
            pageElement.classList.add('active');
            document.querySelector('.portfolio-pages-container').style.display = 'block'; // 상세 페이지 컨테이너를 보이게 합니다.
        }
    });
});
