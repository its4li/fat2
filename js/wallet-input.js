// مدیریت فرم ورود آدرس کیف پول

document.addEventListener('DOMContentLoaded', function() {
    const walletForm = document.getElementById('walletForm');
    const errorMessage = document.getElementById('error-message');
    
    // رویداد ارسال فرم آدرس کیف پول
    walletForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const walletAddress = document.getElementById('walletAddress').value;
        const blockchain = document.getElementById('blockchain').value;
        
        // اعتبارسنجی آدرس کیف پول
        if (!validateWalletAddress(walletAddress, blockchain)) {
            errorMessage.textContent = 'آدرس کیف پول نامعتبر است. لطفاً آدرس معتبری وارد کنید.';
            return;
        }
        
        // ذخیره اطلاعات کیف پول در حافظه محلی
        localStorage.setItem('walletAddress', walletAddress);
        localStorage.setItem('blockchain', blockchain);
        
        // هدایت به صفحه نمایش تراکنش‌ها
        window.location.href = 'transactions.html';
    });
});

// تابع اعتبارسنجی آدرس کیف پول بر اساس نوع بلاکچین
function validateWalletAddress(address, blockchain) {
    if (!address || !blockchain) {
        return false;
    }
    
    // الگوهای اعتبارسنجی برای هر بلاکچین
    const patterns = {
        bitcoin: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/,
        ethereum: /^0x[a-fA-F0-9]{40}$/,
        litecoin: /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/,
        dogecoin: /^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$/,
        tron: /^T[a-zA-Z0-9]{33}$/
    };
    
    // بررسی تطابق آدرس با الگوی مربوطه
    if (patterns[blockchain]) {
        return patterns[blockchain].test(address);
    }
    
    // اگر الگویی برای بلاکچین تعریف نشده باشد، فرض می‌کنیم معتبر است
    return true;
}
