// 모바일 기기의 너비를 가져오는 함수
function getMobileScreenWidth() {
    return Math.max(window.screen.width, window.screen.height);
}

// 모바일 기기에서는 canvas의 너비를 동적으로 설정하는 함수
function setCanvasWidthForMobile() {
    var canvas = document.getElementById('gameCanvas');
    var mobileScreenWidth = getMobileScreenWidth();
    canvas.width = mobileScreenWidth; // 모바일 기기의 너비로 설정
    canvas.height = mobileScreenWidth; // 모바일 기기의 너비로 설정
}

// 페이지 로드 시 모바일 기기에서 canvas의 너비 설정
window.onload = function () {
    if (isMobileDevice()) {
        setCanvasWidthForMobile();
    }
};

// 모바일 기기인지 확인하는 함수
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}
