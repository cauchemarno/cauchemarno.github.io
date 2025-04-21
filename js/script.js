async function copyEmail(btn){
    const email='cauchemarno@gmail.com';

    try {
        await navigator.clipboard.writeText(email);
        flash(btn, '✅');
    } catch(e){
        flash(btn,'❌');
    }
}

function flash(btn, symbol){
    const check = btn.nextElementSibling;
    if(!check) return;

    check.textContent = symbol;
    check.classList.add('show');

    clearTimeout(check._t);
    check._t = setTimeout(() => {
        check.classList.remove('show');
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    let currentPhotoIndex = 0;
    const photos = document.querySelectorAll('.gallery-photo');
    const photoViewer = document.getElementById('photoViewer');
    const viewerImage = document.getElementById('viewerImage');
    const closeButton = document.querySelector('.close-btn');
    const nextButton = document.querySelector('.nav-btn.right');
    const prevButton = document.querySelector('.nav-btn.left');

    function openPhoto(index) {
        if (index < 0 || index >= photos.length) {
            console.error('Invalid photo index');
            return;
        }
        currentPhotoIndex = index;
        viewerImage.src = photos[index].src;
        photoViewer.classList.add('active');
    }

    function closePhoto() {
        viewerImage.classList.remove('zoomed');
        photoViewer.classList.remove('active');
    }

    function nextPhoto(event) {
        if (event) event.stopPropagation();
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        viewerImage.src = photos[currentPhotoIndex].src;
    }

    function prevPhoto(event) {
        if (event) event.stopPropagation();
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        viewerImage.src = photos[currentPhotoIndex].src;
    }

    viewerImage.addEventListener('click', (event) => {
        event.stopPropagation();
        viewerImage.classList.toggle('zoomed');
    });

    photoViewer.addEventListener('click', closePhoto);

    closeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        closePhoto();
    });

    nextButton.addEventListener('click', nextPhoto);
    prevButton.addEventListener('click', prevPhoto);

    photos.forEach((photo, index) => {
        photo.addEventListener('click', () => openPhoto(index));
    });

    if (photos.length <= 1) {
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
    }
});
