// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const navbar = document.querySelector('.navbar');
const searchBox = document.querySelector('.search-box');
const searchInput = document.getElementById('searchInput');

// Search box hover animation
if (searchBox) {
    searchBox.addEventListener('mouseenter', () => {
        navbar.classList.add('search-active');
    });
    
    searchBox.addEventListener('mouseleave', () => {
        if (!searchInput.matches(':focus')) {
            navbar.classList.remove('search-active');
        }
    });
    
    searchInput.addEventListener('blur', () => {
        navbar.classList.remove('search-active');
    });
}

// Navbar scroll blur animation
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" /></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" /></svg>';
    themeToggle.innerHTML = theme === 'light' ? moonIcon : sunIcon;
}

// Sell form functionality
const sellForm = document.getElementById('sellForm');
if (sellForm) {
    const powerAmountInput = document.getElementById('powerAmount');
    const pricePerKwhInput = document.getElementById('pricePerKwh');
    const totalPriceSpan = document.getElementById('totalPrice');
    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');

    // Province to district mapping
    if (provinceSelect && districtSelect) {
        provinceSelect.addEventListener('change', () => {
            const province = provinceSelect.value;
            districtSelect.innerHTML = '<option value="">Tanlang</option>';
            
            if (province && districts[province]) {
                districtSelect.disabled = false;
                districts[province].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase();
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                districtSelect.disabled = true;
                districtSelect.innerHTML = '<option value="">Avval viloyat tanlang</option>';
            }
        });
    }

    function calculateTotal() {
        const amount = parseFloat(powerAmountInput.value) || 0;
        const price = parseFloat(pricePerKwhInput.value) || 0;
        const total = amount * price;
        totalPriceSpan.textContent = total.toLocaleString('uz-UZ');
    }

    powerAmountInput.addEventListener('input', calculateTotal);
    pricePerKwhInput.addEventListener('input', calculateTotal);

    sellForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('sellerName').value,
            phone: document.getElementById('phone').value,
            province: document.getElementById('province').value,
            district: document.getElementById('district').value,
            address: document.getElementById('address').value,
            powerAmount: document.getElementById('powerAmount').value,
            pricePerKwh: document.getElementById('pricePerKwh').value,
            panelCapacity: document.getElementById('panelCapacity').value,
            installDate: document.getElementById('installDate').value,
            description: document.getElementById('description').value
        };

        console.log('Form submitted:', formData);
        alert('E\'loningiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
        sellForm.reset();
        totalPriceSpan.textContent = '0';
        districtSelect.disabled = true;
        districtSelect.innerHTML = '<option value="">Avval viloyat tanlang</option>';
    });
}

// Contact form functionality
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log('Contact form submitted:', formData);
        alert('Xabaringiz yuborildi! Tez orada javob beramiz.');
        contactForm.reset();
    });
}

// Product filters
const filterProvince = document.getElementById('filterProvince');
const filterDistrict = document.getElementById('filterDistrict');
const filterPrice = document.getElementById('filterPrice');
const sortBy = document.getElementById('sortBy');
const filterMinKwh = document.getElementById('filterMinKwh');
const filterMaxKwh = document.getElementById('filterMaxKwh');

const districts = {
    'toshkent-shahar': ['Chilonzor', 'Yunusobod', 'Mirobod', 'Yakkasaroy', 'Sergeli', 'Bektemir', 'Uchtepa', 'Yashnobod', 'Olmazor', 'Shayxontohur', "Mirzo Ulug'bek"],
    'toshkent-viloyat': ['Angren', 'Olmaliq', 'Chirchiq', 'Bekobod', 'Ohangaron', "Yangiyo'l"],
    'samarqand': ['Samarqand shahri', 'Registon', "Kattaqo'rg'on", 'Jomboy', 'Urgut'],
    'buxoro': ['Buxoro shahri', 'Kogon', "G'ijduvon", 'Olot'],
    'fargona': ["Farg'ona shahri", "Qo'qon", "Marg'ilon", 'Quvasoy', 'Rishton'],
    'andijon': ['Andijon shahri', 'Asaka', "Xo'jaobod", "Paytug'"],
    'namangan': ['Namangan shahri', 'Chortoq', 'Chust', 'Pop'],
    'qashqadaryo': ['Qarshi', 'Shahrisabz', 'Koson', 'Muborak'],
    'surxondaryo': ['Termiz', 'Denov', 'Boysun', "Jarqo'rg'on"],
    'jizzax': ['Jizzax shahri', 'Zomin', "G'allaorol"],
    'sirdaryo': ['Guliston', 'Yangiyer', 'Sirdaryo'],
    'navoiy': ['Navoiy shahri', 'Zarafshon', 'Nurota', 'Uchquduq'],
    'xorazm': ['Urganch', 'Xiva', 'Pitnak', 'Xonqa', 'Shovot'],
    'qoraqalpogiston': ['Nukus', 'Beruniy', "To'rtko'l", "Xo'jayli", "Qo'ng'irot"]
};

if (filterProvince) {
    filterProvince.addEventListener('change', () => {
        const province = filterProvince.value;
        filterDistrict.innerHTML = '<option value="">Barchasi</option>';
        
        if (province && districts[province]) {
            filterDistrict.disabled = false;
            districts[province].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase();
                option.textContent = district;
                filterDistrict.appendChild(option);
            });
        } else {
            filterDistrict.disabled = true;
            filterDistrict.innerHTML = '<option value="">Avval viloyat tanlang</option>';
        }
        filterProducts();
    });
}

if (filterProvince && filterPrice && sortBy) {
    filterDistrict.addEventListener('change', filterProducts);
    filterPrice.addEventListener('change', filterProducts);
    sortBy.addEventListener('change', filterProducts);
    if (filterMinKwh) filterMinKwh.addEventListener('input', filterProducts);
    if (filterMaxKwh) filterMaxKwh.addEventListener('input', filterProducts);
}

function filterProducts() {
    const district = filterDistrict?.value.toLowerCase().trim();
    const minKwh = parseFloat(filterMinKwh?.value) || 0;
    const maxKwh = parseFloat(filterMaxKwh?.value) || Infinity;
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const cardKwhText = card.querySelector('.detail-item .value')?.textContent || '0';
        const cardKwh = parseFloat(cardKwhText.replace(/,/g, '').replace(/[^0-9]/g, ''));
        
        let showCard = true;
        
        // District filter
        if (district && district !== '') {
            if (!cardTitle.includes(district)) {
                showCard = false;
            }
        }
        
        // kWh filter
        if (cardKwh < minKwh || cardKwh > maxKwh) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Product purchase buttons
const purchaseButtons = document.querySelectorAll('.product-card .btn-primary');
purchaseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (!user) {
            showLoginModal();
            return;
        }
        
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productTotal = productCard.querySelector('.product-total strong').textContent;
        
        if (confirm(`${productName}\n${productTotal}\n\nSotib olishni tasdiqlaysizmi?`)) {
            alert('Xaridingiz uchun rahmat! Tez orada siz bilan bog\'lanamiz.');
        }
    });
});

function showLoginModal() {
    const scrollY = window.scrollY;
    const modal = document.createElement('div');
    modal.className = 'login-required-modal';
    modal.style.top = scrollY + 'px';
    modal.innerHTML = `
        <div class="login-modal-content">
            <h2>Tizimga kirish kerak</h2>
            <p>Mahsulot sotib olish uchun avval tizimga kirish kerak!</p>
            <div class="modal-buttons">
                <a href="login.html" class="btn btn-primary">Kirish</a>
                <a href="register.html" class="btn btn-secondary">Ro'yxatdan o'tish</a>
                <button class="btn btn-cancel" onclick="this.closest('.login-required-modal').remove(); document.body.style.overflow='auto'">Bekor qilish</button>
            </div>
        </div>
    `;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Login form functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate login
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showCustomAlert('Muvaffaqiyatli!', 'Xush kelibsiz, ' + user.name + '!', () => {
                window.location.href = 'index.html';
            });
        } else {
            showCustomAlert('Xato!', 'Email yoki parol noto\'g\'ri!');
        }
    });
}

// Register form functionality
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const registerBtn = document.getElementById('registerBtn');
    const verificationGroup = document.getElementById('verificationGroup');
    let generatedCode = '';
    
    sendCodeBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        
        if (!email || !name) {
            showCustomAlert('Xato!', 'Ism va emailni kiriting!');
            return;
        }
        
        // Generate 6-digit code
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Simulate sending email
        console.log('Verification code:', generatedCode);
        showCustomAlert('Yuborildi!', `Tasdiqlash kodi emailga yuborildi: ${generatedCode}\n(Demo: Kod konsolda ko'rsatilgan)`);
        
        verificationGroup.style.display = 'block';
        sendCodeBtn.style.display = 'none';
        registerBtn.style.display = 'block';
    });
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const verificationCode = document.getElementById('verificationCode').value;
        
        if (verificationCode !== generatedCode) {
            showCustomAlert('Xato!', 'Tasdiqlash kodi noto\'g\'ri!');
            return;
        }
        
        if (password !== confirmPassword) {
            showCustomAlert('Xato!', 'Parollar mos kelmadi!');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === email)) {
            showCustomAlert('Xato!', 'Bu email allaqachon ro\'yxatdan o\'tgan!');
            return;
        }
        
        const newUser = { name, email, phone, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        showCustomAlert('Muvaffaqiyatli!', 'Ro\'yxatdan o\'tish muvaffaqiyatli! Endi kirish mumkin.', () => {
            window.location.href = 'login.html';
        });
    });
}

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
const loginBtn = document.getElementById('loginBtn');

if (currentUser && loginBtn) {
    const navActions = loginBtn.parentElement;
    const userAvatar = currentUser.avatar || '';
    navActions.innerHTML = `
        <div class="search-box">
            <button class="search-icon" id="searchIcon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
            <input type="text" class="search-input" id="searchInput" placeholder="Qidirish...">
        </div>
        <div class="user-menu">
            <button class="btn btn-user" id="userMenuBtn">
                ${userAvatar ? `<img src="${userAvatar}" alt="Avatar" class="user-avatar-img">` : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="32" height="32">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>`}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="16" height="16" class="dropdown-arrow">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            <div class="user-dropdown" id="userDropdown">
                <a href="profile.html" class="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Profil
                </a>
                <a href="statistics.html" class="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                    Statistika
                </a>
                <a href="settings.html" class="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Sozlamalar
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" id="logoutBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Chiqish
                </a>
            </div>
        </div>
        <button class="theme-toggle" id="themeToggle">🌙</button>
    `;
    
    // Re-initialize theme toggle
    const newThemeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" /></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" /></svg>';
    newThemeToggle.innerHTML = savedTheme === 'light' ? moonIcon : sunIcon;
    newThemeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        newThemeToggle.innerHTML = newTheme === 'light' ? moonIcon : sunIcon;
    });
    
    // User menu toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const newSearchBox = document.querySelector('.search-box');
    const newSearchInput = document.getElementById('searchInput');
    
    // Re-initialize search box animation
    if (newSearchBox && newSearchInput) {
        newSearchBox.addEventListener('mouseenter', () => {
            navbar.classList.add('search-active');
        });
        
        newSearchBox.addEventListener('mouseleave', () => {
            if (!newSearchInput.matches(':focus')) {
                navbar.classList.remove('search-active');
            }
        });
        
        newSearchInput.addEventListener('blur', () => {
            navbar.classList.remove('search-active');
        });
    }
    
    userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });
    
    document.addEventListener('click', () => {
        userDropdown.classList.remove('show');
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showCustomAlert('Chiqish', 'Tizimdan chiqmoqchimisiz?', () => {
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    });
}

// Social login function
function socialLogin(provider) {
    showCustomAlert(`${provider} orqali kirish`, `${provider} akkauntingiz bilan tizimga kirmoqchimisiz?`, () => {
        // Open real OAuth popup
        const width = 500;
        const height = 600;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        let authUrl = '';
        if (provider === 'Google') {
            authUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        } else if (provider === 'Facebook') {
            authUrl = 'https://www.facebook.com/v12.0/dialog/oauth';
        } else if (provider === 'Discord') {
            authUrl = 'https://discord.com/api/oauth2/authorize';
        } else if (provider === 'Apple') {
            authUrl = 'https://appleid.apple.com/auth/authorize';
        }
        
        const popup = window.open(
            authUrl,
            `${provider} Login`,
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );
        
        if (!popup) {
            showCustomAlert('Xato!', 'Popup oynasi bloklangan. Iltimos, brauzer sozlamalarida popup oynalariga ruxsat bering.');
            return;
        }
        
        // Check if popup was closed without authentication
        const checkPopup = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkPopup);
                showCustomAlert('Xatolik', `${provider} orqali kirish amalga oshmadi.`);
            }
        }, 500);
    });
}

function showCustomAlert(title, message, onConfirm) {
    const scrollY = window.scrollY;
    const modal = document.createElement('div');
    modal.className = 'custom-alert-modal';
    modal.style.top = scrollY + 'px';
    modal.innerHTML = `
        <div class="custom-alert-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="alert-buttons">
                <button class="btn btn-primary" onclick="this.closest('.custom-alert-modal').remove(); document.body.style.overflow='auto'; ${onConfirm ? 'arguments[0]()' : ''}" data-callback="${onConfirm ? 'true' : 'false'}">OK</button>
                ${onConfirm ? '<button class="btn btn-cancel" onclick="this.closest(\'.custom-alert-modal\').remove(); document.body.style.overflow=\'auto\'">Bekor qilish</button>' : ''}
            </div>
        </div>
    `;
    
    document.body.style.overflow = 'hidden';
    document.body.appendChild(modal);
    
    if (onConfirm) {
        modal.querySelector('.btn-primary').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
            onConfirm();
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Counter animation
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                if (target === 5000) {
                    counter.innerText = target + '+';
                } else if (target === 15) {
                    counter.innerText = target + ' MW';
                } else if (target === 98) {
                    counter.innerText = target + '%';
                }
            }
        };
        
        updateCount();
    });
};

const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

const teamData = {
    member1: {
        name: 'Alisher Karimov',
        position: 'Asoschisi va Direktor',
        bio: 'Alisher Karimov 15 yillik tajribaga ega biznes rahbari. U Solar Share kompaniyasini 2020 yilda asos solgan va O\'zbekistonda qayta tiklanadigan energiya sohasini rivojlantirishga katta hissa qo\'shmoqda.',
        education: 'Toshkent Davlat Texnika Universiteti, MBA',
        achievements: [
            'O\'zbekistonda 50+ quyosh energiya loyihasini amalga oshirgan',
            'Yashil energiya sohasida "Yil tadbirkor" mukofoti',
            'Xalqaro energetika konferensiyalarida ma\'ruzachi'
        ]
    },
    member2: {
        name: 'Nilufar Rahimova',
        position: 'Texnologiya bo\'yicha direktor',
        bio: 'Nilufar dasturiy ta\'minot ishlab chiqish va sun\'iy intellekt sohasida 10 yillik tajribaga ega. U platformamizning barcha texnik jihatlarini boshqaradi va innovatsion yechimlarni joriy etadi.',
        education: 'TATU, Kompyuter injiniringi',
        achievements: [
            'Solar Share platformasini noldan yaratgan',
            'AI asosidagi energiya prognozlash tizimini ishlab chiqqan',
            'Texnologiya sohasida 5+ patent egasi'
        ]
    },
    member3: {
        name: 'Sardor Tursunov',
        position: 'Operatsion direktor',
        bio: 'Sardor energetika va logistika sohasida 12 yillik tajribaga ega. U kompaniyaning kundalik operatsiyalarini boshqaradi va mijozlar bilan ishlash jarayonlarini optimallashtiradi.',
        education: 'Toshkent Davlat Iqtisodiyot Universiteti',
        achievements: [
            'Operatsion samaradorlikni 40% oshirgan',
            'Mijozlar qoniqish darajasini 98% ga yetkazgan',
            'O\'zbekiston bo\'ylab tarmoq yaratgan'
        ]
    },
    member4: {
        name: 'Madina Yusupova',
        position: 'Marketing bo\'yicha direktor',
        bio: 'Madina raqamli marketing va brend strategiyasi sohasida 8 yillik tajribaga ega. U Solar Share brendini O\'zbekiston bo\'ylab taniqli qilishda muhim rol o\'ynagan.',
        education: 'Jahon Iqtisodiyoti va Diplomatiya Universiteti',
        achievements: [
            'Brend taniqligini 5 baravar oshirgan',
            'Ijtimoiy tarmoqlarda 100K+ auditoriya yaratgan',
            'Marketing sohasida "Yil professional" mukofoti'
        ]
    }
};

function openModal(memberId) {
    const modal = document.getElementById('teamModal');
    const modalBody = document.getElementById('modalBody');
    const member = teamData[memberId];
    
    modalBody.innerHTML = `
        <h2>${member.name}</h2>
        <h3 style="color: var(--text-secondary); margin-bottom: 1.5rem;">${member.position}</h3>
        <p><strong>Biografiya:</strong></p>
        <p>${member.bio}</p>
        <p><strong>Ta'lim:</strong> ${member.education}</p>
        <p><strong>Yutuqlar:</strong></p>
        <ul>
            ${member.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
        </ul>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    const teamModal = document.getElementById('teamModal');
    if (teamModal) teamModal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('teamModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Observe feature cards
    const fadeElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Add animation classes to footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        if (index === 0) section.classList.add('slide-left');
        else if (index === 1 || index === 2) section.classList.add('fade-in');
        else if (index === 3) section.classList.add('slide-right');
        observer.observe(section);
    });
    
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        footerBottom.classList.add('fade-in');
        observer.observe(footerBottom);
    }
});

// Hero animation on page load
window.addEventListener('load', () => {
    // Hide loader after page loads + 1 second
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 1000);
    }
    
    const heroElements = document.querySelectorAll('.hero .fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 200);
    });
});

// Language selector - Initialize immediately
(function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
})();
