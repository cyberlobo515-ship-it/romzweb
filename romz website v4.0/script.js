/* =========================================================
   ROMZ CLOTHING — Supabase bilan to'liq ishlaydigan script.js
   ========================================================= */

/* 🤖 TELEGRAM BOT */
const TELEGRAM_CONFIG = {
    botToken: '8661007641:AAF4wObrf6eVc1UB-sBZBRMAJ4Hczoj1xZQ', 
    chatId: '406580906' 
};

const PROMO_CODES = {
    'ROMZ10': { type: 'percent', value: 10, label: '10% chegirma' },
    'ROMZ20': { type: 'percent', value: 20, label: '20% chegirma' },
    'WELCOME': { type: 'percent', value: 15, label: 'Yangi mijoz 15%' },
    'VIP50': { type: 'fixed', value: 50000, label: "50,000 so'm chegirma" },
    'ROMZ': { type: 'percent', value: 5, label: '5% chegirma' }
};

const CATEGORY_PREFIXES = { outerwear: 'CL', tailoring: 'CM', knitwear: 'CN', footwear: 'CB', accessories: 'CG' };

const TRANSLATIONS = {
    uz: { top1:"Yangi Kuz-Qish 2025 Kolleksiyasi",top2:"O'zbekiston bo'ylab 2 kunda VIP kuryer",top3:"Telegram Bot integratsiyasi",nav_all:'Barchasi',nav_outerwear:'Ustki kiyim',nav_tailoring:'Kostyumlar',nav_knitwear:'Trikotaj',nav_footwear:'Poyabzal',nav_accessories:'Aksessuarlar',search_ph:'Kiyimlar qidirish...',admin_btn:'Admin',hero_tag:"Kuz-Qish '25 Edition",hero_title:'Kuz &amp; Qish: <em>Haqiqiy aristokratik</em> did',hero_sub:"Yuqori darajadagi kashmir, jun va ipak matolardan tayyorlangan saralangan siluetlar.",hero_cta:'Kolleksiyani kashf etish',hero_cta2:'Yangi paltolar',stat_models:'Model turlari',stat_natural:'Tabiiy matolar',stat_vip:'VIP yetkazish',stat_days:'kun',hero_badge:'Haftaning sarasi',perk1_title:'Original Sifat',perk1_desc:"Har bir buyum sifat tekshiruvidan o'tgan.",perk2_title:'Telegram Bot',perk2_desc:'Buyurtma tafsilotlari kanalga yuboriladi.',perk3_title:'Premium Qadoqlash',perk3_desc:"Brend qutilari va himoya g'iloflari bilan.",catalog_eyebrow:'Tanlangan kolleksiya',catalog_title:'Saralangan Katalog',sort_label:'Saralash:',sort_featured:'Tavsiya',sort_pa:'Narx ↑',sort_pd:'Narx ↓',sort_stock:'Qoldiq',chip_all:'Barchasi',chip_outerwear:'Ustki kiyim',chip_tailoring:'Kostyumlar',chip_knitwear:'Trikotaj',chip_footwear:'Poyabzal',chip_accessories:'Aksessuarlar',stock_left:'Qoldi',stock_out:'Qolmadi',stock_pieces:'ta',modal_size:"O'lcham:",modal_stock:'Qoldiq:',modal_in_stock:'Omborda:',modal_hurry:'(Shoshiling!)',modal_out:'Tugagan',modal_add_cart:"Savatga qo'shish",cart_choice:'Tanlovingiz',cart_title:'Savat',cart_empty:"Savat bo'sh",cart_delivery:'Yetkazish:',cart_free:'Bepul (VIP)',cart_total:'Jami:',cart_btn:'Buyurtma berish',cart_back:'Qaytish',cart_info:"Mijoz ma'lumotlari",cart_name:'Ism *',cart_phone:'Telefon *',cart_addr:'Manzil *',cart_payment:"To'lov:",cart_note:'Kanalga yuboriladi',cart_confirm:'Tasdiqlash',cart_name_ph:'Azizbek Karimov',cart_addr_ph:'Toshkent sh., Mirobod, 12',promo_label:'Promo kod',promo_ph:'ROMZ10',promo_apply:"Qo'llash",promo_discount:'Chegirma:',wishlist_title:'Sevimlilar',wishlist_empty:"Sevimlilar bo'sh",wishlist_added:"Sevimlilarga qo'shildi",wishlist_removed:"Sevimlilardan olib tashlandi",footer_about:"ROMZ — nafosat va klassik dizayn uyg'unligi.",footer_collections:'Kolleksiyalar',footer_customers:'Mijozlarga',footer_contact:"Bog'lanish",footer_size:"O'lcham jadvali",footer_vip:'VIP Yetkazish',footer_tg:'Telegram Bot',footer_address:'Toshkent sh., Amir Temur, 42',footer_copyright:'© 2025 ROMZ. Barcha huquqlar himoyalangan.',footer_location:'Toshkent · Bot v2.4 Active',success_title:'Buyurtmangiz qabul qilindi!',success_desc:'Buyurtmangiz Telegram kanalimizga yuborildi.',success_btn:"Do'konga qaytish",nav_store:"Do'kon",nav_cart:'Savat',nav_wishlist:'Wishlist',promo_applied:"Promo kod qo'llanildi",promo_invalid:"Promo kod noto'g'ri",promo_removed:"Promo kod o'chirildi",added_cart:"savatga qo'shildi",out_of_stock:'Qoldiq tugagan' },
    en: { top1:'New Fall-Winter 2025 Collection',top2:'VIP courier across Uzbekistan in 2 days',top3:'Telegram Bot integration',nav_all:'All',nav_outerwear:'Outerwear',nav_tailoring:'Suits',nav_knitwear:'Knitwear',nav_footwear:'Footwear',nav_accessories:'Accessories',search_ph:'Search clothing...',admin_btn:'Admin',hero_tag:"Fall-Winter '25 Edition",hero_title:"Fall & Winter: <em>True aristocratic</em> taste",hero_sub:'Curated silhouettes crafted from premium cashmere, wool and silk.',hero_cta:'Explore collection',hero_cta2:'New coats',stat_models:'Models',stat_natural:'Natural fabrics',stat_vip:'VIP delivery',stat_days:'days',hero_badge:"Week's Pick",perk1_title:'Original Quality',perk1_desc:'Every item passes strict quality control.',perk2_title:'Telegram Bot',perk2_desc:'Order details are sent to our channel.',perk3_title:'Premium Packaging',perk3_desc:'Brand boxes and protective covers.',catalog_eyebrow:'Curated collection',catalog_title:'Selected Catalog',sort_label:'Sort:',sort_featured:'Featured',sort_pa:'Price ↑',sort_pd:'Price ↓',sort_stock:'Stock',chip_all:'All',chip_outerwear:'Outerwear',chip_tailoring:'Suits',chip_knitwear:'Knitwear',chip_footwear:'Footwear',chip_accessories:'Accessories',stock_left:'Left',stock_out:'Sold out',stock_pieces:'pcs',modal_size:'Size:',modal_stock:'Stock:',modal_in_stock:'In stock:',modal_hurry:'(Hurry!)',modal_out:'Sold out',modal_add_cart:'Add to cart',cart_choice:'Your selection',cart_title:'Cart',cart_empty:'Cart is empty',cart_delivery:'Delivery:',cart_free:'Free (VIP)',cart_total:'Total:',cart_btn:'Checkout',cart_back:'Back',cart_info:'Customer info',cart_name:'Name *',cart_phone:'Phone *',cart_addr:'Address *',cart_payment:'Total:',cart_note:'Sent to channel',cart_confirm:'Confirm order',cart_name_ph:'John Doe',cart_addr_ph:'Tashkent, Mirabad, 12',promo_label:'Promo code',promo_ph:'ROMZ10',promo_apply:'Apply',promo_discount:'Discount:',wishlist_title:'Wishlist',wishlist_empty:'Wishlist is empty',wishlist_added:'Added to wishlist',wishlist_removed:'Removed from wishlist',footer_about:'ROMZ — harmony of elegance and classic design.',footer_collections:'Collections',footer_customers:'Customers',footer_contact:'Contact',footer_size:'Size chart',footer_vip:'VIP Delivery',footer_tg:'Telegram Bot',footer_address:'Tashkent, Amir Temur, 42',footer_copyright:'© 2025 ROMZ. All rights reserved.',footer_location:'Tashkent · Bot v2.4 Active',success_title:'Your order is confirmed!',success_desc:'Your order was sent to our Telegram channel.',success_btn:'Back to store',nav_store:'Store',nav_cart:'Cart',nav_wishlist:'Wishlist',promo_applied:'Promo code applied',promo_invalid:'Invalid promo code',promo_removed:'Promo code removed',added_cart:'added to cart',out_of_stock:'Out of stock' },
    ru: { top1:'Новая коллекция Осень-Зима 2025',top2:'VIP-курьер по Узбекистану за 2 дня',top3:'Интеграция с Telegram Bot',nav_all:'Все',nav_outerwear:'Верхняя одежда',nav_tailoring:'Костюмы',nav_knitwear:'Трикотаж',nav_footwear:'Обувь',nav_accessories:'Аксессуары',search_ph:'Поиск одежды...',admin_btn:'Админ',hero_tag:"Осень-Зима '25 Edition",hero_title:'Осень & Зима: <em>Истинно аристократичный</em> вкус',hero_sub:'Избранные силуэты из премиального кашемира, шерсти и шелка.',hero_cta:'Смотреть коллекцию',hero_cta2:'Новые пальто',stat_models:'Моделей',stat_natural:'Натуральные ткани',stat_vip:'VIP доставка',stat_days:'дня',hero_badge:'Выбор недели',perk1_title:'Гарантия качества',perk1_desc:'Каждое изделие проходит контроль качества.',perk2_title:'Telegram Bot',perk2_desc:'Детали заказа отправляются в канал.',perk3_title:'Премиум упаковка',perk3_desc:'Брендовые коробки и защитные чехлы.',catalog_eyebrow:'Избранная коллекция',catalog_title:'Избранный каталог',sort_label:'Сортировка:',sort_featured:'Рекомендуемые',sort_pa:'Цена ↑',sort_pd:'Цена ↓',sort_stock:'Остаток',chip_all:'Все',chip_outerwear:'Верхняя одежда',chip_tailoring:'Костюмы',chip_knitwear:'Трикотаж',chip_footwear:'Обувь',chip_accessories:'Аксессуары',stock_left:'Осталось',stock_out:'Нет',stock_pieces:'шт',modal_size:'Размер:',modal_stock:'Остаток:',modal_in_stock:'В наличии:',modal_hurry:'(Спешите!)',modal_out:'Распродано',modal_add_cart:'В корзину',cart_choice:'Ваш выбор',cart_title:'Корзина',cart_empty:'Корзина пуста',cart_delivery:'Доставка:',cart_free:'Бесплатно (VIP)',cart_total:'Итого:',cart_btn:'Оформить',cart_back:'Назад',cart_info:'Данные клиента',cart_name:'Имя *',cart_phone:'Телефон *',cart_addr:'Адрес *',cart_payment:'Сумма:',cart_note:'Отправляется в канал',cart_confirm:'Подтвердить заказ',cart_name_ph:'Иван Иванов',cart_addr_ph:'Ташкент, Мирабад, 12',promo_label:'Промокод',promo_ph:'ROMZ10',promo_apply:'Применить',promo_discount:'Скидка:',wishlist_title:'Избранное',wishlist_empty:'Избранное пусто',wishlist_added:'Добавлено в избранное',wishlist_removed:'Удалено из избранного',footer_about:'ROMZ — гармония элегантности и классического дизайна.',footer_collections:'Коллекции',footer_customers:'Клиентам',footer_contact:'Контакты',footer_size:'Таблица размеров',footer_vip:'VIP доставка',footer_tg:'Telegram Bot',footer_address:'Ташкент, Амира Темура, 42',footer_copyright:'© 2025 ROMZ. Все права защищены.',footer_location:'Ташкент · Bot v2.4 Active',success_title:'Ваш заказ принят!',success_desc:'Заказ отправлен в наш Telegram канал.',success_btn:'Вернуться в магазин',nav_store:'Магазин',nav_cart:'Корзина',nav_wishlist:'Избранное',promo_applied:'Промокод применён',promo_invalid:'Неверный промокод',promo_removed:'Промокод удалён',added_cart:'добавлено в корзину',out_of_stock:'Нет в наличии' }
};

const CATEGORY_LABELS = {
    uz: { outerwear:'Ustki kiyim',tailoring:'Kostyumlar',knitwear:'Trikotaj',footwear:'Poyabzal',accessories:'Aksessuarlar' },
    en: { outerwear:'Outerwear',tailoring:'Suits',knitwear:'Knitwear',footwear:'Footwear',accessories:'Accessories' },
    ru: { outerwear:'Верхняя одежда',tailoring:'Костюмы',knitwear:'Трикотаж',footwear:'Обувь',accessories:'Аксессуары' }
};

let state = {
    lang: localStorage.getItem('romz_lang') || 'uz',
    products: [], 
    orders: [],   
    hero: { productCode: null, badge: 'Haftaning sarasi' },
    botToken: localStorage.getItem('romz_token') || TELEGRAM_CONFIG.botToken,
    botChatId: localStorage.getItem('romz_chatid') || TELEGRAM_CONFIG.chatId,
    cart: [],
    wishlist: JSON.parse(localStorage.getItem('romz_wishlist') || '[]'),
    appliedPromo: JSON.parse(localStorage.getItem('romz_promo') || 'null'),
    category: 'all',
    search: '',
    sort: 'featured',
    modalProd: null,
    modalSize: null,
    modalImgIdx: 0,
    tempImages: [],
    isAdmin: false
};

let cardTimers = [];

function generateNextCode(category) {
    const prefix = CATEGORY_PREFIXES[category] || 'CL';
    let maxNum = 0;
    state.products.forEach(p => {
        if (p.code && p.code.startsWith(prefix + '-')) {
            const n = parseInt(p.code.split('-')[1]);
            if (!isNaN(n) && n > maxNum) maxNum = n;
        }
    });
    return prefix + '-' + String(maxNum + 1).padStart(5, '0');
}

function getProductByCode(code) { return state.products.find(p => p.code === code); }
function t(key) { return TRANSLATIONS[state.lang][key] || key; }

function saveLocalState() {
    try {
        localStorage.setItem('romz_token', state.botToken);
        localStorage.setItem('romz_chatid', state.botChatId);
        localStorage.setItem('romz_wishlist', JSON.stringify(state.wishlist));
        localStorage.setItem('romz_promo', JSON.stringify(state.appliedPromo));
        localStorage.setItem('romz_lang', state.lang);
    } catch (e) {}
}

function formatUZS(val) { return Number(val).toLocaleString('uz-UZ') + " so'm"; }

function showToast(text, icon = 'fa-check') {
    const box = document.getElementById('toastBox');
    const item = document.createElement('div');
    item.className = 'toast-msg';
    item.innerHTML = `<i class="fas ${icon}" style="color:var(--gold);"></i> <span>${text}</span>`;
    box.appendChild(item);
    setTimeout(() => { item.style.opacity = '0'; item.style.transition = 'opacity 0.3s'; setTimeout(() => item.remove(), 300); }, 3000);
}

function applyLanguage(lang) {
    state.lang = lang;
    saveLocalState();
    const trans = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.dataset.i18n; if (trans[key] !== undefined) el.textContent = trans[key]; });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { const key = el.dataset.i18nHtml; if (trans[key] !== undefined) el.innerHTML = trans[key]; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { const key = el.dataset.i18nPlaceholder; if (trans[key] !== undefined) el.placeholder = trans[key]; });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    
    renderCatalog(); renderHero(); updateCartUI(); updateWishlistUI(); populateHeroProductSelect(); updateHeroPreview();
}

async function sendTelegramAlert(text) {
    const token = state.botToken.trim(), chatId = state.botChatId.trim();
    if (!token || !chatId) return true;
    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' }) });
    } catch (e) { console.log('TG xato:', e); }
    return true;
}

function renderHero() {
    const heroProduct = getProductByCode(state.hero.productCode) || state.products[0];
    if (!heroProduct) return;
    state.hero.productCode = heroProduct.code;
    document.getElementById('heroShowcaseTitle').innerText = heroProduct.name;
    document.getElementById('heroShowcasePrice').innerText = formatUZS(heroProduct.price);
    document.getElementById('heroShowcaseImg').src = heroProduct.images?.[0] || heroProduct.image;
}

function updateHeroPreview() {
    const sel = document.getElementById('adminHeroProductSelect');
    if (!sel || !sel.value) return;
    const product = getProductByCode(sel.value);
    if (!product) return;
    document.getElementById('heroPreviewImg').src = product.images?.[0] || product.image;
    document.getElementById('heroPreviewTitle').innerText = product.name;
    document.getElementById('heroPreviewPrice').innerText = formatUZS(product.price);
    document.getElementById('heroPreviewBadge').innerText = document.getElementById('adminHeroBadgeInput')?.value || 'Haftaning sarasi';
    document.getElementById('heroPreviewCode').innerText = product.code;
}

function populateHeroProductSelect() {
    const sel = document.getElementById('adminHeroProductSelect');
    if (!sel) return;
    sel.innerHTML = state.products.map(p => `<option value="${p.code}" ${p.code === state.hero.productCode ? 'selected' : ''}>${p.code} — ${p.name}</option>`).join('');
    updateHeroPreview();
}

function openHeroShowcaseDetail() {
    const p = getProductByCode(state.hero.productCode);
    if (p) openProductModal(p.id);
}

function renderCatalog() {
    const grid = document.getElementById('productGrid');
    document.getElementById('statModelCount').innerText = (state.products.length + 120) + '+';
    const lang = state.lang;
    let list = state.products.filter(p => {
        const cat = state.category === 'all' || p.category === state.category;
        const q = state.search.toLowerCase();
        return cat && (p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    });
    if (state.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
    if (state.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (state.sort === 'stock-desc') list.sort((a,b) => b.stock - a.stock);
    if (state.sort === 'featured') list.sort((a,b) => (b.featured || 0) - (a.featured || 0));

    grid.innerHTML = list.map(p => {
        const imgs = p.images?.length ? p.images : [p.image].filter(Boolean);
        const isLow = p.stock <= 4;
        const isWished = state.wishlist.includes(p.id);
        const catLabel = CATEGORY_LABELS[lang][p.category] || p.category;
        const stockHtml = p.stock > 0 ? `<div class="stock-tag ${isLow ? 'low' : 'good'}"><span style="width:6px; height:6px; border-radius:50%; background:${isLow ? 'var(--rose)' : 'var(--emerald)'};"></span> ${t('stock_left')}: ${p.stock} ${t('stock_pieces')}</div>` : `<div class="stock-tag low">${t('stock_out')}</div>`;
        const dots = imgs.length > 1 ? `<div class="img-dots">${imgs.map((_, i) => `<span class="img-dot ${i===0?'active':''}"></span>`).join('')}</div>` : '';
        return `
            <article class="product-card" data-product-id="${p.id}" onclick="openProductModal('${p.id}')">
                <div class="product-media">
                    <img class="product-main-img" src="${imgs[0] || ''}" alt="${p.name}" loading="lazy"/>
                    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
                    ${stockHtml}
                    ${dots}
                    <button class="wishlist-toggle ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}')" title="Wishlist">
                        <svg><use href="#icon-heart"/></svg>
                    </button>
                </div>
                <div class="product-body">
                    <span class="product-cat">${catLabel}</span>
                    <h4 class="product-name">${p.name}</h4>
                    <p class="product-desc">${p.description || ''}</p>
                    <div class="product-foot">
                        <span class="product-price">${formatUZS(p.price)}</span>
                        <button class="add-btn" onclick="event.stopPropagation(); quickAdd('${p.id}')" ${p.stock <= 0 ? 'disabled style="opacity:0.3;"' : ''}><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </article>`;
    }).join('');
    startImageRotation();
}

function startImageRotation() {
    cardTimers.forEach(clearInterval);
    cardTimers = [];
    document.querySelectorAll('.product-card[data-product-id]').forEach(card => {
        const id = card.dataset.productId;
        const product = state.products.find(p => p.id === id);
        if (!product || !product.images || product.images.length <= 1) return;
        let idx = 0;
        const timer = setInterval(() => {
            if (!document.contains(card)) { clearInterval(timer); return; }
            idx = (idx + 1) % product.images.length;
            const imgEl = card.querySelector('.product-main-img');
            if (imgEl) { imgEl.style.opacity = '0'; setTimeout(() => { imgEl.src = product.images[idx]; imgEl.style.opacity = '1'; }, 180); }
            card.querySelectorAll('.img-dot').forEach((dot, i) => dot.classList.toggle('active', i === idx));
        }, 3500);
        cardTimers.push(timer);
    });
}

function filterCategory(cat, btn) {
    state.category = cat;
    document.querySelectorAll('#categoryChips .chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.nav .nav-link').forEach(l => l.classList.toggle('active', l.dataset.cat === cat));
    renderCatalog();
}

function handleSort(val) { state.sort = val; renderCatalog(); }
function focusSearch() { window.scrollTo({ top: 380, behavior: 'smooth' }); document.getElementById('searchInput').focus(); }

function openProductModal(id) {
    const p = state.products.find(x => x.id === id);
    if (!p) return;
    state.modalProd = p;
    state.modalSize = (p.sizes && p.sizes[0]) || 'Standart';
    state.modalImgIdx = 0;
    const imgs = p.images?.length ? p.images : [p.image].filter(Boolean);
    const isWished = state.wishlist.includes(p.id);
    const catLabel = CATEGORY_LABELS[state.lang][p.category] || p.category;
    document.getElementById('productModalContent').innerHTML = `
        <div class="pmodal-media">
            <div class="pmodal-main-img-wrap"><img id="pmodalMainImg" src="${imgs[0] || ''}" alt="${p.name}"/></div>
            ${imgs.length > 1 ? `<div class="pmodal-thumbs">${imgs.map((img, i) => `<img src="${img}" class="pmodal-thumb ${i===0?'active':''}" onclick="selectModalImg(${i})"/>`).join('')}</div>` : ''}
        </div>
        <div class="pmodal-info">
            <div>
                <span style="font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:var(--gold); font-weight:700;">${catLabel}</span>
                <span style="font-size:10px; color:var(--text-dim); font-family:monospace; margin-left:8px;">${p.code}</span>
                <h2 style="font-family:'Playfair Display',serif; font-size:24px; color:var(--ivory); margin-top:4px;">${p.name}</h2>
                <div style="font-family:'Playfair Display',serif; font-size:20px; font-weight:600; color:var(--gold-light); margin-top:4px;">${formatUZS(p.price)}</div>
            </div>
            <p style="font-size:13px; color:var(--text-sub); line-height:1.6; padding-bottom:12px; border-bottom:1px solid var(--line);">${p.description || ''}</p>
            <div>
                <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; display:block; margin-bottom:8px; font-weight:600;">${t('modal_size')}</span>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">${(p.sizes || ['Standart']).map(s => `<button class="size-btn ${s === state.modalSize ? 'active' : ''}" onclick="selectModalSize('${s}', this)">${s}</button>`).join('')}</div>
            </div>
            <div>
                <span style="font-size:11px; color:var(--text-dim); text-transform:uppercase; display:block; margin-bottom:4px; font-weight:600;">${t('modal_stock')}</span>
                <span style="font-size:12.5px; color:${p.stock <= 4 ? 'var(--rose)' : 'var(--emerald)'}; font-weight:600;">${p.stock > 0 ? `${t('modal_in_stock')} ${p.stock} ${t('stock_pieces')} ${p.stock <= 4 ? t('modal_hurry') : ''}` : t('modal_out')}</span>
            </div>
            <div style="display:flex; gap:8px; margin-top:auto;">
                <button class="btn btn-primary" onclick="addModalToCart()" style="flex:1;" ${p.stock <= 0 ? 'disabled style="opacity:0.4;"' : ''}><i class="fas fa-shopping-bag"></i> ${p.stock > 0 ? t('modal_add_cart') : t('modal_out')}</button>
                <button class="btn btn-ghost" onclick="toggleWishlistFromModal('${p.id}')" style="width:50px; ${isWished ? 'color:var(--rose); border-color:var(--rose);' : ''}"><svg width="16" height="16"><use href="#icon-heart"/></svg></button>
            </div>
        </div>`;
    document.getElementById('modalBackdrop').classList.add('show');
    document.getElementById('productModal').classList.add('show');
}

function selectModalImg(idx) {
    state.modalImgIdx = idx;
    const p = state.modalProd;
    if (!p) return;
    const imgs = p.images?.length ? p.images : [p.image];
    document.getElementById('pmodalMainImg').src = imgs[idx];
    document.querySelectorAll('.pmodal-thumb').forEach((el, i) => el.classList.toggle('active', i === idx));
}

function selectModalSize(s, btn) { state.modalSize = s; document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function closeProductModal() { document.getElementById('productModal').classList.remove('show'); checkBackdrop(); }

function toggleWishlist(id) {
    const idx = state.wishlist.indexOf(id);
    if (idx >= 0) { state.wishlist.splice(idx, 1); showToast(t('wishlist_removed'), 'fa-heart-broken'); }
    else { state.wishlist.push(id); showToast(t('wishlist_added'), 'fa-heart'); }
    saveLocalState(); renderCatalog(); updateWishlistUI();
}

function toggleWishlistFromModal(id) {
    toggleWishlist(id);
    const isWished = state.wishlist.includes(id);
    const btn = document.querySelector('#productModalContent .btn-ghost');
    if (btn) { btn.style.color = isWished ? 'var(--rose)' : ''; btn.style.borderColor = isWished ? 'var(--rose)' : ''; }
}

function updateWishlistUI() {
    const count = state.wishlist.length;
    document.getElementById('wishlistBadgeCount').innerText = count;
    document.getElementById('mobileWishlistBadge').innerText = count;
    document.querySelector('.wishlist-header-btn')?.classList.toggle('has-items', count > 0);
    const list = document.getElementById('wishlistItemsList');
    const empty = document.getElementById('wishlistEmptyState');
    if (state.wishlist.length === 0) { list.innerHTML = ''; empty.style.display = 'flex'; return; }
    empty.style.display = 'none';
    list.innerHTML = state.wishlist.map(id => {
        const p = state.products.find(x => x.id === id);
        if (!p) return '';
        const img = p.images?.[0] || p.image;
        return `
            <div class="cart-line">
                <img src="${img}" alt="${p.name}"/>
                <div>
                    <h5 style="font-family:'Playfair Display',serif; font-size:14px; color:var(--ivory);">${p.name}</h5>
                    <div style="font-size:11px; color:var(--text-dim); font-family:monospace;">${p.code}</div>
                    <div style="font-size:12.5px; color:var(--gold-light); font-weight:600; margin-top:2px;">${formatUZS(p.price)}</div>
                </div>
                <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
                    <button onclick="quickAddWishlist('${p.id}')" style="background:var(--gold); color:#000; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:600;" ${p.stock <= 0 ? 'disabled style="opacity:0.4;"' : ''}><i class="fas fa-cart-plus"></i></button>
                    <button onclick="toggleWishlist('${p.id}')" style="color:var(--rose); font-size:11px;"><i class="fas fa-trash"></i></button>
                </div>
            </div>`;
    }).join('');
}

function quickAddWishlist(id) { quickAdd(id); }
function openWishlist() { document.getElementById('wishlistDrawer').classList.add('open'); document.getElementById('modalBackdrop').classList.add('show'); updateWishlistUI(); }
function closeWishlist() { document.getElementById('wishlistDrawer').classList.remove('open'); checkBackdrop(); }

function quickAdd(id) {
    const p = state.products.find(x => x.id === id);
    if (!p || p.stock <= 0) return;
    addToCart(p, (p.sizes && p.sizes[0]) || 'Standart');
}

function addModalToCart() {
    if (!state.modalProd || state.modalProd.stock <= 0) return;
    addToCart(state.modalProd, state.modalSize);
    closeProductModal();
}

function addToCart(p, size) {
    const item = state.cart.find(x => x.id === p.id && x.size === size);
    if (item) {
        if (item.qty < p.stock) item.qty++;
        else { showToast(t('out_of_stock'), 'fa-triangle-exclamation'); return; }
    } else {
        state.cart.push({ id: p.id, code: p.code, name: p.name, price: p.price, image: p.images?.[0] || p.image, size, qty: 1, stock: p.stock });
    }
    updateCartUI();
    showToast(`"${p.name}" ${t('added_cart')}`);
}

function changeCartItemQty(idx, delta) {
    const item = state.cart[idx];
    if (!item) return;
    if (delta > 0 && item.qty >= item.stock) { showToast(t('out_of_stock'), 'fa-triangle-exclamation'); return; }
    item.qty += delta;
    if (item.qty <= 0) state.cart.splice(idx, 1);
    updateCartUI();
}

function calcTotal() {
    const subtotal = state.cart.reduce((a, b) => a + (b.price * b.qty), 0);
    let discount = 0;
    if (state.appliedPromo) {
        discount = state.appliedPromo.type === 'percent' ? Math.round(subtotal * state.appliedPromo.value / 100) : state.appliedPromo.value;
        discount = Math.min(discount, subtotal);
    }
    return { subtotal, discount, total: subtotal - discount };
}

function updateCartUI() {
    const count = state.cart.reduce((a, b) => a + b.qty, 0);
    document.getElementById('cartBadgeCount').innerText = count;
    document.getElementById('mobileCartBadge').innerText = count;
    const list = document.getElementById('cartItemsList');
    const empty = document.getElementById('cartEmptyState');
    const foot = document.getElementById('cartFooter');
    if (state.cart.length === 0) { list.innerHTML = ''; empty.style.display = 'flex'; foot.style.display = 'none'; return; }
    empty.style.display = 'none'; foot.style.display = 'block';
    const { subtotal, discount, total } = calcTotal();
    document.getElementById('cartGrandTotal').innerText = formatUZS(total);
    document.getElementById('checkoutFinalSum').innerText = formatUZS(total);
    const promoRow = document.getElementById('promoDiscountRow');
    const promoAmt = document.getElementById('promoDiscountAmount');
    if (state.appliedPromo) {
        promoRow.style.display = 'flex'; promoAmt.innerText = '-' + formatUZS(discount);
        document.getElementById('promoAppliedBox').style.display = 'block';
        document.getElementById('promoAppliedBox').innerHTML = `<div class="promo-applied"><span><i class="fas fa-check-circle"></i> ${state.appliedPromo.code} — ${state.appliedPromo.label}</span><button onclick="removePromo()">×</button></div>`;
    } else {
        promoRow.style.display = 'none'; document.getElementById('promoAppliedBox').style.display = 'none'; document.getElementById('promoAppliedBox').innerHTML = '';
    }
    list.innerHTML = state.cart.map((item, i) => `
        <div class="cart-line">
            <img src="${item.image}" alt="${item.name}"/>
            <div>
                <h5 style="font-family:'Playfair Display',serif; font-size:14px; color:var(--ivory);">${item.name}</h5>
                <div style="font-size:11px; color:var(--text-dim);">${item.size}</div>
                <div style="font-size:12.5px; color:var(--gold-light); font-weight:600; margin-top:2px;">${formatUZS(item.price)}</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; justify-content:space-between;">
                <div style="display:flex; align-items:center; border:1px solid var(--line); border-radius:99px; padding:2px;">
                    <button style="width:22px; height:22px;" onclick="changeCartItemQty(${i}, -1)"><i class="fas fa-minus" style="font-size:10px;"></i></button>
                    <span style="font-size:12px; min-width:20px; text-align:center;">${item.qty}</span>
                    <button style="width:22px; height:22px;" onclick="changeCartItemQty(${i}, 1)"><i class="fas fa-plus" style="font-size:10px;"></i></button>
                </div>
                <button onclick="state.cart.splice(${i}, 1); updateCartUI();" style="font-size:11px; color:var(--text-dim);"><i class="fas fa-trash"></i></button>
            </div>
        </div>`).join('');
}

function applyPromo() {
    const code = document.getElementById('promoInput').value.trim().toUpperCase();
    if (!code) return;
    const promo = PROMO_CODES[code];
    if (!promo) { showToast(t('promo_invalid'), 'fa-circle-xmark'); return; }
    state.appliedPromo = { code, ...promo };
    saveLocalState(); updateCartUI(); showToast(`${t('promo_applied')}: ${promo.label}`, 'fa-ticket');
    document.getElementById('promoInput').value = '';
}
function removePromo() { state.appliedPromo = null; saveLocalState(); updateCartUI(); showToast(t('promo_removed'), 'fa-times'); }

function openCart() { document.getElementById('cartViewItems').style.display = 'flex'; document.getElementById('cartViewCheckout').style.display = 'none'; document.getElementById('cartDrawer').classList.add('open'); document.getElementById('modalBackdrop').classList.add('show'); }
function closeCart() { document.getElementById('cartDrawer').classList.remove('open'); checkBackdrop(); }
function goToCheckout() { document.getElementById('cartViewItems').style.display = 'none'; document.getElementById('cartViewCheckout').style.display = 'block'; }
function backToCartItems() { document.getElementById('cartViewItems').style.display = 'flex'; document.getElementById('cartViewCheckout').style.display = 'none'; }

function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(','); const mime = arr[0].match(/:(.*?);/)[1]; const bstr = atob(arr[1]);
    let n = bstr.length; const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n); return new Blob([u8arr], { type: mime });
}

function getShareLink(code) { if (!window.location.protocol.startsWith('http')) return null; return window.location.origin + window.location.pathname + '?product=' + code; }

async function sendOrderToTelegram({ orderId, name, phone, address, total, discount, items }) {
    const token = state.botToken.trim(); const chatId = state.botChatId.trim();
    if (!token || !chatId) return;
    const firstItem = items[0]; const firstProd = state.products.find(p => p.id === firstItem.id);
    const mainImage = firstProd?.images?.[0] || firstProd?.image || firstItem.image;
    const shareLink = firstProd ? getShareLink(firstProd.code) : null;
    const itemsList = items.map(c => { const p = state.products.find(x => x.id === c.id); return `• <b>${c.name}</b> (${c.size}) × ${c.qty} — ${formatUZS(c.price * c.qty)}\n  <code>${p?.code || ''}</code>`; }).join('\n');
    let caption = `🔥 <b>YANGI SOTUV! ${orderId}</b>\n\n✅ <b>Ushbu kiyim sotildi! Siz ham ulgurib qoling!</b>\n\n👤 <b>Xaridor:</b> ${name}\n📞 <b>Telefon:</b> <a href="tel:${phone}">${phone}</a>\n📍 <b>Manzil:</b> ${address}\n\n━━━━━━━━━━━━━━━━━━\n🛍 <b>Mahsulot(lar):</b>\n${itemsList}\n━━━━━━━━━━━━━━━━━━\n\n`;
    if (state.appliedPromo) { caption += `🎟 <b>Promo:</b> ${state.appliedPromo.code} (<i>${state.appliedPromo.label}</i>)\n💸 <b>Chegirma:</b> -${formatUZS(discount)}\n`; }
    caption += `💰 <b>JAMI:</b> <b>${formatUZS(total)}</b>\n`;
    if (shareLink) caption += `\n🔗 <a href="${shareLink}">Mahsulotni ko'rish</a>`;
    try {
        const formData = new FormData(); formData.append('chat_id', chatId); formData.append('caption', caption); formData.append('parse_mode', 'HTML'); formData.append('disable_web_page_preview', 'false');
        if (mainImage && mainImage.startsWith('data:')) { formData.append('photo', dataURLtoBlob(mainImage), 'product.jpg'); } 
        else if (mainImage) { formData.append('photo', mainImage); }
        const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: 'POST', body: formData });
        const data = await res.json();
        if (!data.ok) {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: caption, parse_mode: 'HTML', disable_web_page_preview: false }) });
        }
    } catch (err) { console.error('Telegram xato:', err); }
}

async function submitCustomerOrder(e) {
    e.preventDefault();
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();
    if (!name || !phone || !address || state.cart.length === 0) return;

    const orderId = '#RMZ-' + Math.floor(1000 + Math.random() * 9000);
    const { discount, total } = calcTotal();

    try {
        await DB.createOrder({
            id: orderId, customer: name, phone: phone, address: address,
            items: state.cart.map(x => ({ name: x.name, size: x.size, qty: x.qty, price: x.price, code: x.code })),
            total: total, discount: discount, promo: state.appliedPromo?.code || null, status: 'Kutilmoqda'
        });

        for (const item of state.cart) { await DB.decrementStock(item.id, item.qty); }
        await sendOrderToTelegram({ orderId, name, phone, address, total, discount, items: state.cart });
        await reloadData();

        state.cart = []; state.appliedPromo = null; updateCartUI(); closeCart();
        document.getElementById('successOrderRef').innerText = orderId;
        document.getElementById('orderSuccessModal').classList.add('show');
    } catch (err) {
        showToast("Buyurtma yuborishda xato: " + err.message, 'fa-circle-xmark');
    }
}

function closeSuccessOverlay() { document.getElementById('orderSuccessModal').classList.remove('show'); }

function openAdminLogin() { document.getElementById('adminLoginModal').classList.add('show'); document.getElementById('modalBackdrop').classList.add('show'); }
function closeAdminLogin() { document.getElementById('adminLoginModal').classList.remove('show'); checkBackdrop(); }

async function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminLoginUser').value.trim();
    const password = document.getElementById('adminLoginPass').value.trim();
    try {
        await DB.signIn(email, password);
        state.isAdmin = await DB.isAdmin();
        if (!state.isAdmin) {
            showToast("Sizda admin huquqi yo'q!", 'fa-shield-halved');
            await DB.signOut();
            return;
        }
        closeAdminLogin();
        document.getElementById('adminFullWebsite').classList.add('active');
        await reloadData();
        showToast("Admin Panelga xush kelibsiz!", 'fa-shield-halved');
    } catch (err) {
        showToast("Email yoki parol noto'g'ri", 'fa-circle-xmark');
    }
}

function exitAdminWebsite() { document.getElementById('adminFullWebsite').classList.remove('active'); showToast("Do'konga qaytildi", 'fa-arrow-left'); }

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
    const titles = { stats:'Statistika', orders:'Buyurtmalar', products:'Mahsulotlar', hero:'Hero', bot:'Telegram Bot' };
    document.getElementById('adminTabTitle').innerText = titles[tab] || 'Admin';
    ['stats','orders','products','hero','bot'].forEach(t => { const sec = document.getElementById(`tab-${t}`); if (sec) sec.style.display = (t === tab) ? 'block' : 'none'; });
    const activeBtn = Array.from(document.querySelectorAll('.admin-nav-item')).find(b => b.onclick.toString().includes(tab));
    if (activeBtn) activeBtn.classList.add('active');
    if (tab === 'stats') setTimeout(renderCharts, 100);
    if (window.innerWidth <= 768) closeAdminSidebarMobile();
}

function openAdminSidebarMobile() { document.getElementById('adminSidebar').classList.add('show'); }
function closeAdminSidebarMobile() { document.getElementById('adminSidebar').classList.remove('show'); }

function updateAdminViews() {
    const rev = state.orders.reduce((a, b) => a + (b.total || 0), 0);
    document.getElementById('adminTotalRevenue').innerText = formatUZS(rev);
    document.getElementById('adminTotalOrdersCount').innerText = state.orders.length;
    document.getElementById('adminLowStockCount').innerText = state.products.filter(p => p.stock <= 4).length;
    document.getElementById('adminRecentOrdersTable').innerHTML = state.orders.slice(0, 5).map(o => `<tr><td style="font-weight:600; color:var(--gold-light);">${o.id}</td><td>${o.customer}</td><td>${o.phone}</td><td style="font-weight:600;">${formatUZS(o.total)}</td><td><span class="badge-status ${o.status === 'Yakunlandi' ? 'done' : (o.status === 'Yetkazilmoqda' ? 'delivering' : 'pending')}">${o.status}</span></td></tr>`).join('');
    document.getElementById('adminAllOrdersTable').innerHTML = state.orders.map((o, idx) => `
        <tr>
            <td style="font-weight:600; color:var(--gold-light);">${o.id}</td><td>${o.date}</td>
            <td><strong>${o.customer}</strong><br/><small style="color:var(--text-dim);">${o.address}</small></td>
            <td>${o.phone}</td><td>${o.items.map(i => `${i.name} x${i.qty}`).join('<br/>')}</td>
            <td style="font-weight:600;">${formatUZS(o.total)}${o.promo ? `<br/><small style="color:var(--emerald);">🎟 ${o.promo}</small>` : ''}</td>
            <td><select onchange="updateOrderStatus('${o.dbId}', this.value)" style="background:var(--surface-card); border:1px solid var(--line); color:var(--ivory); padding:4px 8px; border-radius:6px; font-size:11px;"><option value="Kutilmoqda" ${o.status === 'Kutilmoqda' ? 'selected' : ''}>Kutilmoqda</option><option value="Yetkazilmoqda" ${o.status === 'Yetkazilmoqda' ? 'selected' : ''}>Yetkazilmoqda</option><option value="Yakunlandi" ${o.status === 'Yakunlandi' ? 'selected' : ''}>Yakunlandi</option></select></td>
            <td><button onclick="deleteOrder('${o.dbId}')" style="color:var(--rose);"><i class="fas fa-trash"></i></button></td>
        </tr>`).join('');
    document.getElementById('adminProductsTable').innerHTML = state.products.map(p => {
        const isHero = p.code === state.hero.productCode;
        const imgCount = p.images?.length || 0;
        const img = p.images?.[0] || p.image;
        return `
            <tr>
                <td><span style="font-family:monospace; font-weight:700; color:var(--gold-light); font-size:11px; background:var(--gold-dim); padding:3px 8px; border-radius:6px; border:1px solid var(--gold-line);">${p.code || '-'}</span></td>
                <td><img src="${img}" style="width:40px; height:50px; object-fit:cover; border-radius:4px;" alt=""/></td>
                <td style="font-weight:600;">${p.name}</td>
                <td><span style="font-size:10.5px; text-transform:uppercase; color:var(--gold);">${CATEGORY_LABELS.uz[p.category] || p.category}</span></td>
                <td style="font-weight:600;">${formatUZS(p.price)}</td>
                <td><span style="font-weight:700; color:${p.stock <= 4 ? 'var(--rose)' : 'var(--emerald)'};">${p.stock}</span></td>
                <td><span style="font-size:11px; color:var(--gold);"><i class="fas fa-images"></i> ${imgCount}</span></td>
                <td><div style="display:flex; gap:8px; align-items:center;">
                    <button onclick="setAsHero('${p.code}')" title="Hero" style="color:${isHero ? 'var(--gold)' : 'var(--text-dim)'};"><svg width="14" height="14"><use href="#icon-star"/></svg></button>
                    <button onclick="editProductItem('${p.id}')" style="color:var(--gold);"><svg width="14" height="14"><use href="#icon-pen"/></svg></button>
                    <button onclick="deleteProductItem('${p.id}')" style="color:var(--rose);"><svg width="14" height="14"><use href="#icon-trash"/></svg></button>
                </div></td>
            </tr>`;
    }).join('');
    populateHeroProductSelect();
    document.getElementById('adminHeroBadgeInput').value = state.hero.badge || 'Haftaning sarasi';
    renderCharts();
}

async function updateOrderStatus(dbId, s) {
    try { await DB.updateOrderStatus(dbId, s); await reloadData(); showToast(`Status: ${s}`); }
    catch (err) { showToast("Xato: " + err.message, 'fa-circle-xmark'); }
}

async function deleteOrder(dbId) {
    if (!confirm("O'chirish?")) return;
    try { await DB.deleteOrder(dbId); await reloadData(); showToast("O'chirildi"); }
    catch (err) { showToast("Xato: " + err.message, 'fa-circle-xmark'); }
}

function updatePreviewCodeForNew() {
    const id = document.getElementById('formProdId').value;
    if (id) return;
    document.getElementById('formProdCode').value = generateNextCode(document.getElementById('formProdCat').value);
}

function openProductEditForm() {
    document.getElementById('productFormContainer').style.display = 'block';
    document.getElementById('formProductTitle').innerText = 'Yangi mahsulot';
    document.getElementById('formProdId').value = '';
    document.getElementById('formProdName').value = '';
    document.getElementById('formProdCat').value = 'outerwear';
    document.getElementById('formProdPrice').value = '';
    document.getElementById('formProdStock').value = '8';
    document.getElementById('formProdBadge').value = 'Yangi kolleksiya';
    document.getElementById('formProdSizes').value = '48 / M, 50 / L, 52 / XL';
    document.getElementById('formProdDesc').value = '';
    document.getElementById('formProdCode').value = generateNextCode('outerwear');
    document.getElementById('formProdImgFiles').value = '';
    document.getElementById('formProdImgUrl').value = '';
    document.getElementById('imgUrlWrap').style.display = 'none';
    state.tempImages = [];
    renderImgPreviewGrid();
    document.getElementById('productFormContainer').scrollIntoView({ behavior: 'smooth' });
}

function closeProductEditForm() { document.getElementById('productFormContainer').style.display = 'none'; }

function editProductItem(id) {
    const p = state.products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('productFormContainer').style.display = 'block';
    document.getElementById('formProductTitle').innerText = 'Mahsulotni tahrirlash';
    document.getElementById('formProdId').value = p.id;
    document.getElementById('formProdCode').value = p.code;
    document.getElementById('formProdName').value = p.name;
    document.getElementById('formProdCat').value = p.category;
    document.getElementById('formProdPrice').value = p.price;
    document.getElementById('formProdStock').value = p.stock;
    document.getElementById('formProdBadge').value = p.badge || '';
    document.getElementById('formProdSizes').value = (p.sizes || []).join(', ');
    document.getElementById('formProdDesc').value = p.description || '';
    document.getElementById('formProdImgFiles').value = '';
    document.getElementById('formProdImgUrl').value = '';
    document.getElementById('imgUrlWrap').style.display = 'none';
    state.tempImages = [...(p.images || [p.image].filter(Boolean))];
    renderImgPreviewGrid();
    document.getElementById('productFormContainer').scrollIntoView({ behavior: 'smooth' });
}

function renderImgPreviewGrid() {
    const grid = document.getElementById('imgPreviewGrid');
    grid.innerHTML = state.tempImages.map((img, i) => `
        <div class="image-thumb">
            <img src="${img}" alt=""/>
            ${i === 0 ? '<span class="main-label">ASOSIY</span>' : ''}
            <button type="button" class="remove-img" onclick="removeTempImage(${i})"><i class="fas fa-times"></i></button>
        </div>`).join('');
}

function removeTempImage(i) { state.tempImages.splice(i, 1); renderImgPreviewGrid(); }

async function handleMultiImageUpload(event) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    showToast(`${files.length} rasm yuklanmoqda...`, 'fa-spinner');
    let added = 0;
    for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 5 * 1024 * 1024) { showToast(`${file.name} - 5MB dan katta`, 'fa-circle-xmark'); continue; }
        try {
            const publicUrl = await DB.uploadImage(file);
            state.tempImages.push(publicUrl);
            added++;
        } catch (err) { console.error(err); showToast(`Xato: ${file.name}`, 'fa-circle-xmark'); }
    }
    renderImgPreviewGrid();
    showToast(`${added} rasm yuklandi`, 'fa-check');
    event.target.value = '';
}

function toggleImgUrlInput() {
    const w = document.getElementById('imgUrlWrap');
    w.style.display = w.style.display === 'none' ? 'flex' : 'none';
    if (w.style.display === 'flex') document.getElementById('formProdImgUrl').focus();
}

function addImgUrl() {
    const url = document.getElementById('formProdImgUrl').value.trim();
    if (!url) return;
    state.tempImages.push(url);
    renderImgPreviewGrid();
    document.getElementById('formProdImgUrl').value = '';
}

async function saveAdminProduct(e) {
    e.preventDefault();
    const id = document.getElementById('formProdId').value;
    const name = document.getElementById('formProdName').value.trim();
    const cat = document.getElementById('formProdCat').value;
    const price = Number(document.getElementById('formProdPrice').value);
    const stock = Number(document.getElementById('formProdStock').value);
    const badge = document.getElementById('formProdBadge').value.trim();
    const sizes = document.getElementById('formProdSizes').value.split(',').map(s => s.trim()).filter(Boolean);
    const desc = document.getElementById('formProdDesc').value.trim();
    
    if (state.tempImages.length === 0) { showToast("Kamida 1 ta rasm kerak", 'fa-triangle-exclamation'); return; }

    try {
        if (id) {
            await DB.updateProduct(id, { name, category: cat, price, stock, badge, sizes, description: desc, images: state.tempImages });
            showToast(`"${name}" tahrirlandi`, 'fa-check');
        } else {
            const newCode = generateNextCode(cat);
            await DB.createProduct({ code: newCode, name, category: cat, price, stock, badge, sizes, description: desc, images: state.tempImages });
            showToast(`"${name}" qo'shildi — ${newCode}`, 'fa-plus');
        }
        await reloadData();
        closeProductEditForm();
    } catch (err) {
        showToast("Xato: " + err.message, 'fa-circle-xmark');
    }
}

async function deleteProductItem(id) {
    const p = state.products.find(x => x.id === id);
    if (!p) return;
    if (!confirm(`"${p.name}" (${p.code}) o'chirilsinmi?`)) return;
    
    try {
        await DB.deleteProduct(id);
        if (state.hero.productCode === p.code) {
            const remaining = state.products.filter(x => x.id !== id);
            await DB.saveHero(remaining[0]?.code || null, state.hero.badge);
        }
        await reloadData();
        showToast(`"${p.name}" o'chirildi`, 'fa-trash');
    } catch (err) {
        showToast("Xato: " + err.message, 'fa-circle-xmark');
    }
}

async function setAsHero(code) {
    const p = getProductByCode(code);
    if (!p) return;
    try {
        await DB.saveHero(code, state.hero.badge || 'Haftaning sarasi');
        state.hero.productCode = code;
        renderHero(); updateAdminViews();
        showToast(`"${p.name}" hero'ga qo'yildi!`, 'fa-star');
    } catch (err) { showToast("Xato: " + err.message, 'fa-circle-xmark'); }
}

async function saveAdminHeroShowcase(e) {
    e.preventDefault();
    const code = document.getElementById('adminHeroProductSelect').value;
    const badge = document.getElementById('adminHeroBadgeInput').value.trim() || 'Haftaning sarasi';
    try {
        await DB.saveHero(code, badge);
        state.hero = { productCode: code, badge };
        renderHero(); updateAdminViews();
        showToast(`Hero saqlandi!`, 'fa-star');
    } catch (err) { showToast("Xato: " + err.message, 'fa-circle-xmark'); }
}

function saveBotSettings(e) {
    e.preventDefault();
    state.botToken = document.getElementById('botTokenInput').value.trim();
    state.botChatId = document.getElementById('botChatIdInput').value.trim();
    saveLocalState(); showToast("Bot sozlamalari saqlandi!");
}

async function sendTestTelegramMessage() {
    showToast("Yuborilmoqda...");
    await sendTelegramAlert(`✅ <b>ROMZ Bot Test</b>\n\nUlanish muvaffaqiyatli!`);
    showToast("Test yuborildi!", 'fa-paper-plane');
}

let salesChartInstance = null;
let categoryChartInstance = null;

function renderCharts() {
    if (typeof Chart === 'undefined') return;
    const days = [], dayRevenue = [];
    const now = new Date();
    let weekTotal = 0;
    for (let i = 6; i >= 0; i--) {
        const d = new Date(now); d.setDate(d.getDate() - i);
        const dayKey = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
        days.push(label);
        let dayTotal = state.orders.filter(o => o.timestamp && o.timestamp.startsWith(dayKey)).reduce((sum, o) => sum + (o.total || 0), 0);
        dayRevenue.push(dayTotal);
        weekTotal += dayTotal;
    }
    document.getElementById('chartRevenueTotal').innerText = formatUZS(weekTotal);
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        if (salesChartInstance) salesChartInstance.destroy();
        salesChartInstance = new Chart(salesCtx.getContext('2d'), {
            type: 'line',
            data: { labels: days, datasets: [{ label:'Savdo', data: dayRevenue, borderColor:'#D4AF37', backgroundColor:(ctx) => { const g = ctx.chart.ctx.createLinearGradient(0,0,0,260); g.addColorStop(0,'rgba(212,175,55,0.35)'); g.addColorStop(1,'rgba(212,175,55,0)'); return g; }, borderWidth:2.5, fill:true, tension:0.4, pointBackgroundColor:'#D4AF37', pointBorderColor:'#1C1814', pointBorderWidth:2, pointRadius:5, pointHoverRadius:7 }] },
            options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{ backgroundColor:'#1C1814', borderColor:'#D4AF37', borderWidth:1, titleColor:'#F4E4C1', bodyColor:'#EDE4D3', padding:10, callbacks:{ label:(ctx) => formatUZS(ctx.parsed.y) } } }, scales:{ x:{ grid:{color:'rgba(237,228,211,0.05)'}, ticks:{color:'rgba(237,228,211,0.5)', font:{size:10}} }, y:{ grid:{color:'rgba(237,228,211,0.05)'}, ticks:{ color:'rgba(237,228,211,0.5)', font:{size:10}, callback:(v) => (v/1000000).toFixed(1) + 'M' } } } }
        });
    }
    const catRevenue = {};
    state.orders.forEach(o => {
        o.items.forEach(item => {
            const prod = state.products.find(p => p.name === item.name);
            const cat = prod?.category || 'other';
            catRevenue[cat] = (catRevenue[cat] || 0) + (item.qty * (prod?.price || 0));
        });
    });
    const catLabels = { outerwear:'Ustki kiyim', tailoring:'Kostyumlar', knitwear:'Trikotaj', footwear:'Poyabzal', accessories:'Aksessuarlar', other:'Boshqa' };
    const catKeys = Object.keys(catRevenue).filter(k => catRevenue[k] > 0);
    const catColors = { outerwear:'#D4AF37', tailoring:'#C87A54', knitwear:'#10B981', footwear:'#60A5FA', accessories:'#F472B6', other:'#9CA3AF' };
    const catCtx = document.getElementById('categoryChart');
    if (catCtx) {
        if (categoryChartInstance) categoryChartInstance.destroy();
        categoryChartInstance = new Chart(catCtx.getContext('2d'), {
            type: 'doughnut',
            data: { labels: catKeys.map(k => catLabels[k] || k), datasets: [{ data: catKeys.map(k => catRevenue[k]), backgroundColor: catKeys.map(k => catColors[k] || '#9CA3AF'), borderColor:'#14120F', borderWidth:3 }] },
            options: { responsive:true, maintainAspectRatio:false, cutout:'62%', plugins:{ legend:{ position:'bottom', labels:{ color:'rgba(237,228,211,0.75)', font:{size:11}, padding:12, boxWidth:12, boxHeight:12 } }, tooltip:{ backgroundColor:'#1C1814', borderColor:'#D4AF37', borderWidth:1, titleColor:'#F4E4C1', bodyColor:'#EDE4D3', padding:10, callbacks:{ label:(ctx) => `${ctx.label}: ${formatUZS(ctx.parsed)}` } } } }
        });
    }
}

function checkBackdrop() {
    if (!document.getElementById('productModal').classList.contains('show') && !document.getElementById('cartDrawer').classList.contains('open') && !document.getElementById('wishlistDrawer').classList.contains('open') && !document.getElementById('adminLoginModal').classList.contains('show')) {
        document.getElementById('modalBackdrop').classList.remove('show');
    }
}

function closeAllModals() { closeProductModal(); closeCart(); closeWishlist(); closeAdminLogin(); }

/* =========================================================
   INIT & SUPABASE DATA LOADING (Mantiqiy xatolik tuzatildi)
   ========================================================= */
async function reloadData() {
    try {
        // 1. Mahsulotlar va Hero ni yuklash (Buni hamma ko'radi)
        const [products, hero] = await Promise.all([ DB.loadProducts(), DB.loadHero() ]);
        state.products = products;
        state.hero = hero;
        
        renderHero(); 
        renderCatalog(); 
        populateHeroProductSelect();

        // 2. Buyurtmalarni faqat Admin yuklaydi (Mehmonlarga xato bermasligi uchun)
        if (state.isAdmin) {
            try {
                const orders = await DB.loadOrders();
                state.orders = orders;
                updateAdminViews();
                renderCharts();
            } catch (e) {
                console.warn("Buyurtmalar yuklanmadi:", e);
            }
        }
    } catch (err) {
        console.error('reloadData xatosi:', err);
        showToast("Ma'lumot yuklanmadi! Supabase bilan aloqa yo'q.", 'fa-circle-xmark');
    }
}

async function init() {
    document.getElementById('botTokenInput').value = state.botToken;
    document.getElementById('botChatIdInput').value = state.botChatId;
    applyLanguage(state.lang);
    updateCartUI();
    updateWishlistUI();
    
    // Sahifa ochilganda ma'lumotlarni yuklash
    await reloadData();

    // URL'dan mahsulotni ochish
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('product');
    if (sharedCode) {
        const p = getProductByCode(sharedCode);
        if (p) setTimeout(() => openProductModal(p.id), 600);
    }

    // Real-time yangi buyurtmalar (faqat admin uchun)
    DB.onNewOrder(() => {
        if (state.isAdmin) {
            reloadData();
            showToast("🔔 Yangi buyurtma keldi!", 'fa-bell');
        }
    });

    // Qidiruv input
    document.getElementById('searchInput').addEventListener('input', e => {
        state.search = e.target.value;
        renderCatalog();
    });
}

// Hammasini ishga tushirish
init();