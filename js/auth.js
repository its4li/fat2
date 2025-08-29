// مدیریت احراز هویت کاربران

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    
    // بررسی وضعیت ورود کاربر
    if (isLoggedIn()) {
        window.location.href = 'wallet-input.html';
    }
    
    // رویداد ارسال فرم ورود
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // بررسی اعتبار نام کاربری و رمز عبور (در حالت واقعی باید با سرور چک شود)
        if (username === 'admin' && password === 'admin123') {
            // ذخیره وضعیت ورود کاربر
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('loginTime', new Date().getTime());
            
            // هدایت به صفحه ورود آدرس کیف پول
            window.location.href = 'wallet-input.html';
        } else {
            // نمایش پیام خطا
            errorMessage.textContent = 'نام کاربری یا رمز عبور اشتباه است.';
        }
    });
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
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('loginTime');
        }
    }
    
    return false;
}
