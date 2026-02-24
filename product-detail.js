// Product data
const products = {
    1: {
        title: 'Toshkent - Chilonzor',
        amount: '1,200 kWh',
        price: '450 so\'m/kWh',
        capacity: '15 kW',
        region: 'Toshkent shahri',
        total: '540,000 so\'m',
        badge: 'Yangi',
        description: 'Chilonzor tumanida joylashgan zamonaviy quyosh panellari. Yuqori sifatli va samarali energiya ishlab chiqarish. Panel holati a\'lo darajada.'
    },
    2: {
        title: 'Samarqand - Registon',
        amount: '800 kWh',
        price: '420 so\'m/kWh',
        capacity: '10 kW',
        region: 'Samarqand',
        total: '336,000 so\'m',
        badge: '',
        description: 'Samarqand shahrida joylashgan quyosh panellari. Tarixiy shahar markazida ekologik toza energiya.'
    },
    3: {
        title: 'Buxoro - Markaz',
        amount: '2,000 kWh',
        price: '400 so\'m/kWh',
        capacity: '25 kW',
        region: 'Buxoro',
        total: '800,000 so\'m',
        badge: 'Top',
        description: 'Buxoro shahar markazida joylashgan katta quvvatli quyosh panellari. Eng yuqori sifat va ishonchlilik.'
    },
    4: {
        title: 'Farg\'ona - Qo\'qon',
        amount: '600 kWh',
        price: '480 so\'m/kWh',
        capacity: '8 kW',
        region: 'Farg\'ona',
        total: '288,000 so\'m',
        badge: '',
        description: 'Farg\'ona vodiysida joylashgan quyosh panellari. Qulay narx va yaxshi sifat.'
    },
    5: {
        title: 'Toshkent - Yunusobod',
        amount: '1,500 kWh',
        price: '430 so\'m/kWh',
        capacity: '18 kW',
        region: 'Toshkent shahri',
        total: '645,000 so\'m',
        badge: '',
        description: 'Yunusobod tumanida joylashgan yuqori quvvatli quyosh panellari.'
    },
    6: {
        title: 'Andijon - Asaka',
        amount: '900 kWh',
        price: '410 so\'m/kWh',
        capacity: '12 kW',
        region: 'Andijon',
        total: '369,000 so\'m',
        badge: '',
        description: 'Andijon viloyatida joylashgan zamonaviy quyosh panellari.'
    },
    7: {
        title: 'Namangan - Markaz',
        amount: '700 kWh',
        price: '440 so\'m/kWh',
        capacity: '9 kW',
        region: 'Namangan',
        total: '308,000 so\'m',
        badge: '',
        description: 'Namangan shahar markazida joylashgan quyosh panellari.'
    },
    8: {
        title: 'Qashqadaryo - Qarshi',
        amount: '1100 kWh',
        price: '390 so\'m/kWh',
        capacity: '14 kW',
        region: 'Qashqadaryo',
        total: '429,000 so\'m',
        badge: '',
        description: 'Qashqadaryo viloyatida joylashgan quyosh panellari.'
    },
    9: {
        title: 'Navoiy - Zarafshon',
        amount: '950 kWh',
        price: '460 so\'m/kWh',
        capacity: '11 kW',
        region: 'Navoiy',
        total: '437,000 so\'m',
        badge: '',
        description: 'Navoiy viloyatida joylashgan quyosh panellari.'
    },
    10: {
        title: 'Xorazm - Urganch',
        amount: '850 kWh',
        price: '425 so\'m/kWh',
        capacity: '10 kW',
        region: 'Xorazm',
        total: '361,250 so\'m',
        badge: '',
        description: 'Xorazm viloyatida joylashgan quyosh panellari.'
    }
};

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId && products[productId]) {
    const product = products[productId];
    
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productAmount').textContent = product.amount;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productCapacity').textContent = product.capacity;
    document.getElementById('productRegion').textContent = product.region;
    document.getElementById('productTotal').textContent = product.total;
    document.getElementById('productDescription').textContent = product.description;
    
    const badge = document.getElementById('productBadge');
    if (product.badge) {
        badge.textContent = product.badge;
        badge.style.display = 'block';
        if (product.badge === 'Top') {
            badge.classList.add('featured');
        }
    } else {
        badge.style.display = 'none';
    }
} else {
    document.querySelector('.product-detail-content').innerHTML = '<p style="text-align:center;">Mahsulot topilmadi</p>';
}

// Purchase button
document.getElementById('purchaseBtn')?.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!user) {
        showLoginModal();
        return;
    }
    
    if (confirm(`${products[productId].title}\n${products[productId].total}\n\nSotib olishni tasdiqlaysizmi?`)) {
        alert('Xaridingiz uchun rahmat! Tez orada siz bilan bog\'lanamiz.');
    }
});
