import AOS from 'aos';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import emailjs from '@emailjs/browser';

// تهيئة EmailJS
emailjs.init("ERCHjijQ65pCFNf_4");

// دالة إرسال رسالة واتساب
window.sendWhatsAppMessage = (packageName) => {
    const message = `مرحباً، أود الاستفسار عن ${packageName}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/212601754736?text=${encodedMessage}`, '_blank');
};

// تهيئة مكتبة AOS للتأثيرات الحركية
AOS.init({
    duration: 1000,
    once: true
});

// تهيئة Swiper للمعرض
const portfolioSlider = new Swiper('.portfolio-slider', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// التحكم في القائمة المتنقلة
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// تأثير الشريط العلوي عند التمرير
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// دالة لعرض الإشعارات
function showNotification(message, type) {
    // إزالة أي إشعار موجود
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // إنشاء إشعار جديد
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // إخفاء الإشعار بعد 3 ثواني
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// معالجة تقديم النموذج
window.handleSubmit = async (event) => {
    event.preventDefault();

    // جمع البيانات من النموذج
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // التحقق من تعبئة جميع الحقول
    if (!name || !email || !phone || !message) {
        showNotification('يرجى تعبئة جميع الحقول المطلوبة', 'error');
        return false;
    }

    // إرسال البيانات
    try {
        await emailjs.send("service_id", "template_id", {
            from_name: name,
            from_email: email,
            phone: phone,
            message: message,
            to_email: 'ezzalan54@gmail.com'
        });

        // إظهار رسالة نجاح
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');

        // إعادة تعيين النموذج
        document.getElementById('contactForm').reset();

    } catch (error) {
        showNotification('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى', 'error');
    }

    return false;
};