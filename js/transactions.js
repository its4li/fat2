// مدیریت صفحه نمایش تراکنش‌ها

document.addEventListener('DOMContentLoaded', function() {
    // دریافت اطلاعات کیف پول از حافظه محلی
    const walletAddress = localStorage.getItem('walletAddress');
    const blockchain = localStorage.getItem('blockchain');
    
    // بررسی وجود اطلاعات کیف پول
    if (!walletAddress || !blockchain) {
        window.location.href = 'wallet-input.html';
        return;
    }
    
    // نمایش اطلاعات کیف پول در صفحه
    document.getElementById('displayWalletAddress').textContent = walletAddress;
    document.getElementById('displayBlockchain').textContent = getBlockchainFullName(blockchain);
    
    // دریافت اطلاعات کیف پول و تراکنش‌ها
    loadWalletInfo(walletAddress, blockchain);
    loadTransactions(walletAddress, blockchain);
    
    // رویداد فیلتر تراکنش‌ها
    document.getElementById('txFilter').addEventListener('change', function() {
        filterTransactions(this.value);
    });
});

// تابع بارگذاری اطلاعات کیف پول
async function loadWalletInfo(address, blockchain) {
    try {
        const walletInfo = await getWalletInfo(address, blockchain);
        document.getElementById('walletBalance').textContent = walletInfo.balance;
    } catch (error) {
        console.error('خطا در دریافت اطلاعات کیف پول:', error);
        document.getElementById('walletBalance').textContent = 'خطا در دریافت اطلاعات';
    }
}

// تابع بارگذاری تراکنش‌ها
async function loadTransactions(address, blockchain) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const transactionsTable = document.getElementById('transactionsTable');
    const noTransactions = document.getElementById('noTransactions');
    
    try {
        // نمایش لودینگ
        loadingSpinner.classList.remove('hidden');
        transactionsTable.classList.add('hidden');
        noTransactions.classList.add('hidden');
        
        // دریافت تراکنش‌ها
        const transactions = await getWalletTransactions(address, blockchain);
        
        // بررسی وجود تراکنش
        if (transactions.length === 0) {
            loadingSpinner.classList.add('hidden');
            noTransactions.classList.remove('hidden');
            return;
        }
        
        // نمایش تراکنش‌ها در جدول
        renderTransactions(transactions);
        
        // مخفی کردن لودینگ و نمایش جدول
        loadingSpinner.classList.add('hidden');
        transactionsTable.classList.remove('hidden');
    } catch (error) {
        console.error('خطا در دریافت تراکنش‌ها:', error);
        loadingSpinner.classList.add('hidden');
        noTransactions.classList.remove('hidden');
        noTransactions.querySelector('p').textContent = 'خطا در دریافت تراکنش‌ها. لطفاً دوباره تلاش کنید.';
    }
}

// تابع نمایش تراکنش‌ها در جدول
function renderTransactions(transactions) {
    const tableBody = document.getElementById('transactionsTableBody');
    tableBody.innerHTML = '';
    
    transactions.forEach(tx => {
        const row = document.createElement('tr');
        row.dataset.type = tx.type; // برای فیلتر کردن
        
        // تبدیل تایم‌استمپ به تاریخ
        const date = new Date(tx.timestamp);
        const formattedDate = `${date.toLocaleDateString('fa-IR')} ${date.toLocaleTimeString('fa-IR')}`;
        
        // ایجاد سلول‌های جدول
        row.innerHTML = `
            <td title="${tx.txid}">${tx.txid.substring(0, 10)}...</td>
            <td>${formattedDate}</td>
            <td>
                <span class="transaction-type ${tx.type === 'incoming' ? 'transaction-incoming' : 'transaction-outgoing'}">
                    ${tx.type === 'incoming' ? 'ورودی' : 'خروجی'}
                </span>
            </td>
            <td class="address-cell" title="${tx.fromAddress}">${tx.fromAddress.substring(0, 10)}...</td>
            <td class="address-cell" title="${tx.toAddress}">${tx.toAddress.substring(0, 10)}...</td>
            <td>${tx.amount}</td>
            <td>${tx.fee}</td>
            <td>
                <span class="transaction-status status-${tx.status}">
                    ${getStatusText(tx.status)}
                </span>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تابع فیلتر کردن تراکنش‌ها
function filterTransactions(filterType) {
    const rows = document.querySelectorAll('#transactionsTableBody tr');
    
    rows.forEach(row => {
        if (filterType === 'all' || row.dataset.type === filterType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// تابع تبدیل وضعیت به متن فارسی
function getStatusText(status) {
    switch(status) {
        case 'confirmed':
            return 'تایید شده';
        case 'pending':
            return 'در انتظار';
        case 'failed':
            return 'ناموفق';
        default:
            return status;
    }
}

// تابع دریافت نام کامل بلاکچین
function getBlockchainFullName(blockchain) {
    const names = {
        bitcoin: 'بیت کوین (Bitcoin)',
        ethereum: 'اتریوم (Ethereum)',
        litecoin: 'لایت کوین (Litecoin)',
        dogecoin: 'دوج کوین (Dogecoin)',
        tron: 'ترون (Tron)'
    };
    
    return names[blockchain] || blockchain;
}
