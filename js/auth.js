// 로그인 상태 확인
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('loggedIn');
    const currentPage = window.location.pathname;

    if (!isLoggedIn && !currentPage.includes('index.html') && !currentPage.endsWith('/')) {
        window.location.href = 'index.html';
    } else if (isLoggedIn && (currentPage.includes('index.html') || currentPage.endsWith('/'))) {
        window.location.href = 'dashboard.html';
    }
}

// 페이지 로드시 인증 확인
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();

    // 로그인 폼 처리
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'admin' && password === '132400admin') {
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('error-message').textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
            }
        });
    }

    // 로그아웃 버튼 처리
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }
});
