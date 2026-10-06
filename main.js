/**
 * ==========================================================================
 * Main JavaScript File - منصة أفق العقارية (المحدثة)
 * ==========================================================================
 */

// تهيئة الأيقونات
lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. تفعيل التبديل بين زري (شراء عقار / استئجار عقار)
       ========================================================================== */
    const btnBuy = document.getElementById('btn-buy');
    const btnRent = document.getElementById('btn-rent');
    let currentSearchMode = 'buy'; // القيمة الافتراضية: شراء

    // التبديل إلى وضع الشراء
    btnBuy.addEventListener('click', (e) => {
        e.preventDefault();
        currentSearchMode = 'buy';
        
        // تحديث تنسيق الأزرار
        btnBuy.className = "px-6 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-md transition-all";
        btnRent.className = "px-6 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all";
    });

    // التبديل إلى وضع الاستئجار
    btnRent.addEventListener('click', (e) => {
        e.preventDefault();
        currentSearchMode = 'rent';
        
        // تحديث تنسيق الأزرار
        btnRent.className = "px-6 py-2 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-md transition-all";
        btnBuy.className = "px-6 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all";
    });


    /* ==========================================================================
       2. تقنية VR المتطورة (دعم اللمس والسحب للابتوب والجوال)
       ========================================================================== */
    const vrContainer = document.getElementById('vr-container');
    const vrCanvas = document.getElementById('vr-canvas');
    const btnRotateLeft = document.getElementById('btn-rotate-left');
    const btnRotateRight = document.getElementById('btn-rotate-right');
    const currentRoomName = document.getElementById('current-room-name');
    const hotspots = document.querySelectorAll('.hotspot');

    let currentRotation = 0;
    let isDragging = false;
    let startX = 0;

    function updateRotation() {
        vrCanvas.style.transform = `scale(1.1) rotateY(${currentRotation}deg)`;
    }

    // التحكم بالأسهم للابتوب والجوال
    btnRotateLeft.addEventListener('click', () => {
        currentRotation -= 20;
        updateRotation();
    });

    btnRotateRight.addEventListener('click', () => {
        currentRotation += 20;
        updateRotation();
    });

    // Touch & Mouse Events للتحكم بالسحب
    const handleStart = (clientX) => {
        isDragging = true;
        startX = clientX;
    };

    const handleMove = (clientX) => {
        if (!isDragging) return;
        const deltaX = clientX - startX;
        currentRotation += deltaX * 0.2;
        startX = clientX;
        updateRotation();
    };

    const handleEnd = () => {
        isDragging = false;
    };

    // دعم الماوس (لأجهزة الكمبيوتر واللابتوب)
    vrContainer.addEventListener('mousedown', (e) => handleStart(e.clientX));
    window.addEventListener('mousemove', (e) => handleMove(e.clientX));
    window.addEventListener('mouseup', handleEnd);

    // دعم اللمس (لأجهزة الجوال والتابلت)
    vrContainer.addEventListener('touchstart', (e) => handleStart(e.touches[0].clientX));
    window.addEventListener('touchmove', (e) => handleMove(e.touches[0].clientX));
    window.addEventListener('touchend', handleEnd);

    // التنقل عبر Hotspots
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            const room = e.currentTarget.getAttribute('data-room');
            currentRoomName.textContent = room;
            vrCanvas.style.opacity = '0.6';
            setTimeout(() => { vrCanvas.style.opacity = '1'; }, 200);
        });
    });


    /* ==========================================================================
       3. نظام البحث المتقدم عن العقارات
       ========================================================================== */
    const searchForm = document.getElementById('search-form');

    function handleSearch(event) {
        event.preventDefault();
        const locationQuery = document.getElementById('search-location').value.trim();
        const type = document.getElementById('search-type').value;
        const modeText = currentSearchMode === 'buy' ? 'الشراء' : 'الاستئجار';

        if (locationQuery !== '') {
            alert(`جاري البحث عن عقارات بوضع (${modeText}) في (${locationQuery}) - النوع: (${type})...`);
        } else {
            alert(`يرجى كتابة اسم المدينة أو الدولة للبدء بالبحث عن عقارات لـ (${modeText}).`);
        }
    }

    searchForm.addEventListener('submit', handleSearch);


    /* ==========================================================================
       4. إدارة التوقيع والعقود أونلاين (Modal System)
       ========================================================================== */
    const modal = document.getElementById('contract-modal');
    const btnCheckouts = document.querySelectorAll('.btn-checkout');
    const btnCloseModal = document.getElementById('close-modal');
    const contractForm = document.getElementById('contract-form');
    const modalPropertyName = document.getElementById('modal-property-name');

    function openModal(propertyName) {
        modalPropertyName.value = propertyName;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    btnCheckouts.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = e.currentTarget.getAttribute('data-title');
            openModal(title);
        });
    });

    btnCloseModal.addEventListener('click', closeModal);

    contractForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('تم اعتماد وتوقيع العقد الرقمي بنجاح! سيتم تحويل ملف التوثيق إلى بريدك الإلكتروني.');
        closeModal();
    });

});