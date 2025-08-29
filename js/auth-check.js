// بررسی وضعیت احراز هویت در تمام صفحات

document.addEventListener('DOMContentLoaded', function() {
    // بررسی وضعیت ورود کاربر
    if (!isLoggedIn()) {
        // هدایت به صفحه ورود در صورت عدم احراز هویت
        window.location.href = 'login.html';
        return;
    }
    
    // اضافه کردن رویداد خروج به دکمه خروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }
    
    // اضافه کردن رویداد بازگشت به دکمه بازگشت
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'wallet-input.html';
        });
    }
});

// تابع بررسی وضعیت ورود کاربر
function isLoggedIn() {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    // بررسی اعتبار زمانی (۲ ساعت)
    if (loginStatus === 'true' && loginTime) {
        const currentTime = new Date().getTime();
        const loginDuration = currentTime - parseInt(loginTime);
        
        // اگر کمتر از ۲ ساعت از ورود گذشته باشد
        if (loginDuration < (2 * 60 * 60 * 1000)) {
            return true;
        } else {
            // منقضی شدن نشست کاربر
            logout();
        }
    }
    
    return false;
}

// تابع خروج از سیستم
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('blockchain');
    
    // هدایت به صفحه ورود
    window.location.href = 'login.html';
}
