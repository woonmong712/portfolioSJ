document.addEventListener('DOMContentLoaded', (event) => {
    // 모든 링크를 찾아 forEach로 반복
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 이벤트를 막습니다
  
        // href 속성에서 ID를 가져와 해당 요소로 스크롤
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth' // 부드러운 스크롤 효과
        });
      });
    });
  });