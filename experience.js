document.addEventListener('DOMContentLoaded', function() {
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    const slider = document.querySelector('.content'); // 가로 스크롤을 적용할 컨테이너 선택

    slider.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', function() {
        isMouseDown = false;
    });

    slider.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    slider.addEventListener('mousemove', function(e) {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // 마우스 이동 거리에 따른 스크롤 속도 조절
        slider.scrollLeft = scrollLeft - walk;
    });
});
