// Javascript for Bardo 3D Carousel Viewer

document.addEventListener('DOMContentLoaded', () => {
    const totalSlides = 20;
    let currentIndex = 0;

    const track = document.getElementById('carouselTrack');
    const thumbTrack = document.getElementById('thumbnailTrack');
    const currentNumSpan = document.getElementById('currentNum');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // 1. Generate Slides and Thumbnails
    for (let i = 1; i <= totalSlides; i++) {
        const slideNumStr = String(i).padStart(3, '0');
        const imgUrl = `images/extracted_img_${slideNumStr}.png`;

        // Create Carousel Item
        const item = document.createElement('div');
        item.classList.add('carousel-item');
        item.dataset.index = i - 1;
        
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `바르도 슬라이드 ${i}페이지`;
        img.loading = i <= 3 ? 'eager' : 'lazy'; // Optimise load
        
        item.appendChild(img);
        track.appendChild(item);

        // Create Thumbnail Item
        const thumb = document.createElement('div');
        thumb.classList.add('thumb-item');
        thumb.dataset.index = i - 1;
        if (i === 1) thumb.classList.add('active');

        const thumbImg = document.createElement('img');
        thumbImg.src = imgUrl;
        thumbImg.alt = `썸네일 ${i}`;
        
        thumb.appendChild(thumbImg);
        thumbTrack.appendChild(thumb);
    }

    const items = document.querySelectorAll('.carousel-item');
    const thumbs = document.querySelectorAll('.thumb-item');

    // 2. Render 3D Position
    function updateCarousel() {
        items.forEach((item, idx) => {
            const offset = idx - currentIndex;
            const absOffset = Math.abs(offset);

            // Active Class
            if (offset === 0) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

            // Show only close slides (within 3 steps) to save memory/perf
            if (absOffset > 3) {
                item.style.opacity = '0';
                item.style.visibility = 'hidden';
                item.style.transform = `translateX(${offset > 0 ? 1000 : -1000}px) translateZ(-500px) rotateY(${offset > 0 ? -90 : 90}deg)`;
                return;
            }

            item.style.visibility = 'visible';
            item.style.opacity = '1';

            // Calculate 3D transformation params
            const rotateY = offset * -35; // rotate degree
            const translateX = offset * 260 - (offset * absOffset * 15); // perspective offset squeeze
            const translateZ = absOffset * -150; // depth offset
            const zIndex = 10 - absOffset;

            // Apply style
            item.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
            item.style.zIndex = zIndex;

            // Blur & Desaturate far slides
            if (absOffset > 0) {
                item.style.filter = `blur(${absOffset * 1.5}px) grayscale(${absOffset * 15}%)`;
                item.style.opacity = `${1 - (absOffset * 0.25)}`;
            } else {
                item.style.filter = 'none';
                item.style.opacity = '1';
            }
        });

        // Update Counter
        currentNumSpan.textContent = String(currentIndex + 1).padStart(2, '0');

        // Update Progress Bar
        const progressPercent = ((currentIndex + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Update Thumbnails
        thumbs.forEach((thumb, idx) => {
            if (idx === currentIndex) {
                thumb.classList.add('active');
                // Scroll thumbnail into view smoothly
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // 3. Navigation Controls
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = 0;
        } else if (index >= totalSlides) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        updateCarousel();
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Loop
        }
        updateCarousel();
    }

    // Bind Button Click Events
    prevBtn.addEventListener('click', prevBtnClick);
    nextBtn.addEventListener('click', nextBtnClick);

    // Cool visual micro-animation trigger for navigation
    function prevBtnClick() {
        prevSlide();
        animateButton(prevBtn);
    }
    
    function nextBtnClick() {
        nextSlide();
        animateButton(nextBtn);
    }

    function animateButton(btn) {
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1.05)';
        }, 100);
    }

    // Bind Card Click Events
    items.forEach((item, idx) => {
        item.addEventListener('click', () => {
            goToSlide(idx);
        });
    });

    // Bind Thumbnail Click Events
    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', () => {
            goToSlide(idx);
        });
    });

    // 4. Bind Keyboard Events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            prevSlide();
        }
    });

    // 5. Mouse Wheel Scroll Interaction (Throttled)
    let lastWheelTime = 0;
    const wheelCooldown = 800; // ms

    window.addEventListener('wheel', (e) => {
        const currentTime = new Date().getTime();
        if (currentTime - lastWheelTime < wheelCooldown) return;

        if (Math.abs(e.deltaY) > 30) {
            if (e.deltaY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            lastWheelTime = currentTime;
        }
    }, { passive: true });

    // Initial render call
    updateCarousel();
});
