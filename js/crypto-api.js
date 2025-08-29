// ارتباط با API ارزهای دیجیتال (CryptoAPIs.io)

// کلید API (در حالت واقعی باید از سرور دریافت شود)
const API_KEY = 'e96e3116cdffb71f089cabd58a191e10eec7811c';
const API_BASE_URL = 'https://rest.cryptoapis.io/v2';

// تابع دریافت اطلاعات کیف پول
async function getWalletInfo(address, blockchain) {
    // در حالت واقعی، این تابع باید با API ارتباط برقرار کند
    // اما برای نمایش، از داده‌های نمونه استفاده می‌کنیم
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // داده‌های نمونه برای نمایش
            const mockData = {
                address: address,
                blockchain: getBlockchainFullName(blockchain),
                balance: getRandomBalance(blockchain),
                lastUpdated: new Date().toISOString()
            };
            
            resolve(mockData);
        }, 1000); // تاخیر مصنوعی برای شبیه‌سازی درخواست API
    });
}

// تابع دریافت تراکنش‌های کیف پول
async function getWalletTransactions(address, blockchain) {
    // در حالت واقعی، این تابع باید با API ارتباط برقرار کند
    // اما برای نمایش، از داده‌های نمونه استفاده می‌کنیم
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // تولید تراکنش‌های نمونه
            const transactions = generateMockTransactions(address, blockchain);
            resolve(transactions);
        }, 2000); // تاخیر مصنوعی برای شبیه‌سازی درخواست API
    });
}

// تابع تولید تراکنش‌های نمونه
function generateMockTransactions(address, blockchain) {
    const transactions = [];
    const count = Math.floor(Math.random() * 15) + 5; // بین 5 تا 20 تراکنش
    
    for (let i = 0; i < count; i++) {
        const isIncoming = Math.random() > 0.5;
        const timestamp = Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000); // تراکنش‌های 30 روز اخیر
        
        transactions.push({
            txid: generateRandomHash(),
            timestamp: timestamp,
            type: isIncoming ? 'incoming' : 'outgoing',
            fromAddress: isIncoming ? generateRandomAddress(blockchain) : address,
            toAddress: isIncoming ? address : generateRandomAddress(blockchain),
            amount: (Math.random() * 10).toFixed(6),
            fee: (Math.random() * 0.01).toFixed(8),
            status: getRandomStatus(),
            confirmations: Math.floor(Math.random() * 1000)
        });
    }
    
    // مرتب‌سازی بر اساس زمان (جدیدترین اول)
    return transactions.sort((a, b) => b.timestamp - a.timestamp);
}

// تابع تولید آدرس تصادفی
function generateRandomAddress(blockchain) {
    const chars = '0123456789abcdefABCDEF';
    let address = '';
    
    switch(blockchain) {
        case 'bitcoin':
            address = '1';
            for (let i = 0; i < 33; i++) {
                address += chars[Math.floor(Math.random() * chars.length)];
            }
            break;
        case 'ethereum':
            address = '0x';
            for (let i = 0; i < 40; i++) {
                address += chars[Math.floor(Math.random() * chars.length)];
            }
            break;
        case 'litecoin':
            address = 'L';
            for (let i = 0; i < 33; i++) {
                address += chars[Math.floor(Math.random() * chars.length)];
            }
            break;
        case 'dogecoin':
            address = 'D';
            for (let i = 0; i < 33; i++) {
                address += chars[Math.floor(Math.random() * chars.length)];
            }
            break;
        case 'tron':
            address = 'T';
            for (let i = 0; i < 33; i++) {
                address += chars[Math.floor(Math.random() * chars.length)];
            }
            break;
        default:
            address = '0x';
            for (let i = 0; i < 40; i++) {
                address += chars[Math.floor(Math.random() * chars.length)];
            }
    }
    
    return address;
}

// تابع تولید هش تصادفی
function generateRandomHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return hash;
}

// تابع تولید وضعیت تصادفی
function getRandomStatus() {
    const statuses = ['confirmed', 'confirmed', 'confirmed', 'confirmed', 'pending', 'failed'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// تابع تولید موجودی تصادفی
function getRandomBalance(blockchain) {
    let balance;
    
    switch(blockchain) {
        case 'bitcoin':
            balance = (Math.random() * 2).toFixed(8) + ' BTC';
            break;
        case 'ethereum':
            balance = (Math.random() * 30).toFixed(6) + ' ETH';
            break;
        case 'litecoin':
            balance = (Math.random() * 50).toFixed(4) + ' LTC';
            break;
        case 'dogecoin':
            balance = (Math.random() * 10000).toFixed(2) + ' DOGE';
            break;
        case 'tron':
            balance = (Math.random() * 50000).toFixed(2) + ' TRX';
            break;
        default:
            balance = (Math.random() * 10).toFixed(4) + ' CRYPTO';
    }
    
    return balance;
}

// تابع دریافت نام کامل بلاکچین
function getBlockchainFullName(blockchain) {
    const names = {
        bitcoin: 'Bitcoin (BTC)',
        ethereum: 'Ethereum (ETH)',
        litecoin: 'Litecoin (LTC)',
        dogecoin: 'Dogecoin (DOGE)',
        tron: 'Tron (TRX)'
    };
    
    return names[blockchain] || blockchain;
}
