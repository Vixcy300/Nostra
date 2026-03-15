// ============================================
// SHARED SCRIPT - Offer, Drawer, Slider, Wishlist, Scroll
// ============================================

// --- 1. OFFER BANNER: Hide when close button clicked ---
var offerClose = document.getElementById('offer-close');
var offerBanner = document.getElementById('offer-banner');
if (offerClose && offerBanner) {
    offerClose.addEventListener('click', function () {
        offerBanner.style.display = 'none';
    });
}

// --- 2. DRAWER (mobile menu): Open and close ---
var drawerToggle = document.getElementById('side-navbar-activate');
var drawerClose = document.getElementById('side-navbar-close');
var drawer = document.getElementById('drawer-nav');

function openDrawer() {
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
    if (drawerToggle) drawerToggle.setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
    if (drawer) drawer.setAttribute('aria-hidden', 'true');
    if (drawerToggle) drawerToggle.setAttribute('aria-expanded', 'false');
}

if (drawerToggle) drawerToggle.addEventListener('click', openDrawer);
if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

var drawerLinks = drawer ? drawer.querySelectorAll('.drawer__link') : [];
for (var i = 0; i < drawerLinks.length; i++) {
    drawerLinks[i].addEventListener('click', closeDrawer);
}

// --- 3. SLIDER: Prev/Next buttons move the images ---
var sliderLeft = document.getElementById('slider-left-activate');
var sliderRight = document.getElementById('slider-right-activate');
var sliderContainer = document.querySelector('.hero__slider-container');

if (sliderLeft && sliderRight && sliderContainer) {
    var slideIndex = 0;
    var totalSlides = 3;

    function moveSlider() {
        var offset = slideIndex * 100;
        sliderContainer.style.marginLeft = '-' + offset + 'vw';
    }

    sliderRight.addEventListener('click', function () {
        slideIndex = slideIndex + 1;
        if (slideIndex >= totalSlides) slideIndex = 0;
        moveSlider();
    });

    sliderLeft.addEventListener('click', function () {
        slideIndex = slideIndex - 1;
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        moveSlider();
    });
}

// --- 4. WISHLIST: Toggle heart color on click ---
var wishlistButtons = document.querySelectorAll('.most-wanted__wishlist');
for (var i = 0; i < wishlistButtons.length; i++) {
    wishlistButtons[i].addEventListener('click', function () {
        if (this.classList.contains('is-liked')) {
            this.classList.remove('is-liked');
        } else {
            this.classList.add('is-liked');
        }
    });
}

// --- 5. SCROLL ANIMATE: Show sections when they come into view ---
function checkScrollAnimate() {
    var animateElements = document.querySelectorAll('.initial-scroll-animate');
    var windowHeight = window.innerHeight;

    for (var i = 0; i < animateElements.length; i++) {
        var el = animateElements[i];
        var rect = el.getBoundingClientRect();

        if (windowHeight > rect.top - 100) {
            el.classList.remove('reveal-scroll-animate');
        }
    }
}

window.addEventListener('scroll', checkScrollAnimate);
checkScrollAnimate();

// ============================================
// COLLECTIONS PAGE - Search and Filter (Assignment requirement)
// ============================================
var productList = document.querySelector('.catalog__product-list');
var searchInput = document.getElementById('catalog-search');
var productTemplate = document.getElementById('product-card-template');

if (productList && productTemplate) {
    var products = [
        { id: 1, name: "Blue Summer Casual Top", src: "./assets/products/collections/c-1.jpg", desc: "Light blue summer top for casual occasions", price: 220, tags: ["new", "blue", "summer"] },
        { id: 2, name: "Green Beach Dress", src: "./assets/products/collections/c-2.jpg", desc: "Relaxed green dress perfect for beach days", price: 260, tags: ["new", "green", "beach"] },
        { id: 3, name: "Red Party Dress", src: "./assets/products/collections/c-3.jpg", desc: "Bold red dress for evening events", price: 399, tags: ["old", "red", "party"] },
        { id: 4, name: "White Beach Cover-Up", src: "./assets/products/collections/c-4.jpg", desc: "Elegant white beach cover-up", price: 399, tags: ["old", "white", "beach"] },
        { id: 5, name: "White Linen Summer Dress", src: "./assets/products/collections/c-6.jpg", desc: "Classic white linen dress for summer", price: 579, tags: ["old", "white", "beach"] },
        { id: 6, name: "Red Evening Gown", src: "./assets/products/collections/c-7.jpg", desc: "Statement red evening gown", price: 579, tags: ["old", "red", "party"] },
        { id: 7, name: "Blue Summer Casual Top", src: "./assets/products/collections/c-8.jpg", desc: "Navy blue summer casual top", price: 399, tags: ["new", "blue", "summer"] },
        { id: 8, name: "Green Party Outfit", src: "./assets/products/collections/c-9.jpg", desc: "Emerald green party ensemble", price: 579, tags: ["old", "green", "party"] },
        { id: 9, name: "White Beach Collection", src: "./assets/products/collections/c-10.jpg", desc: "Light white beach-ready style", price: 220, tags: ["new", "white", "beach"] }
    ];

    function getFilters() {
        var occasion = [], color = [], arrival = [];
        var occ = document.querySelectorAll('input[name="occasion"]');
        var col = document.querySelectorAll('input[name="color"]');
        var arr = document.querySelectorAll('input[name="arrival"]');
        for (var i = 0; i < occ.length; i++) { if (occ[i].checked) occasion.push(occ[i].value); }
        for (var i = 0; i < col.length; i++) { if (col[i].checked) color.push(col[i].value); }
        for (var i = 0; i < arr.length; i++) { if (arr[i].checked) arrival.push(arr[i].value); }
        return { occasion: occasion, color: color, arrival: arrival };
    }

    function productMatches(product, filters) {
        var f = filters;
        if (f.occasion.length > 0) {
            var ok = false;
            for (var i = 0; i < f.occasion.length; i++) {
                if (product.tags.indexOf(f.occasion[i]) !== -1) { ok = true; break; }
            }
            if (!ok) return false;
        }
        if (f.color.length > 0) {
            var ok = false;
            for (var i = 0; i < f.color.length; i++) {
                if (product.tags.indexOf(f.color[i]) !== -1) { ok = true; break; }
            }
            if (!ok) return false;
        }
        if (f.arrival.length > 0) {
            var ok = false;
            for (var i = 0; i < f.arrival.length; i++) {
                if (product.tags.indexOf(f.arrival[i]) !== -1) { ok = true; break; }
            }
            if (!ok) return false;
        }
        return true;
    }

    function productMatchesSearch(product, query) {
        if (!query || query.trim() === '') return true;
        return product.name.toLowerCase().indexOf(query.toLowerCase().trim()) !== -1;
    }

    function showProducts() {
        var filters = getFilters();
        var query = searchInput ? searchInput.value : '';
        productList.innerHTML = '';
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (productMatches(p, filters) && productMatchesSearch(p, query)) {
                var clone = productTemplate.content.cloneNode(true);
                clone.querySelector('.catalog__product-img').src = p.src;
                clone.querySelector('.catalog__product-img').alt = p.name;
                clone.querySelector('.catalog__product-name').textContent = p.name;
                clone.querySelector('.catalog__product-price').textContent = '$' + p.price;
                productList.appendChild(clone);
            }
        }
    }

    showProducts();
    if (searchInput) searchInput.addEventListener('input', showProducts);
    var allCb = document.querySelectorAll('input[name="occasion"], input[name="color"], input[name="arrival"]');
    for (var i = 0; i < allCb.length; i++) {
        allCb[i].addEventListener('change', showProducts);
    }
}
