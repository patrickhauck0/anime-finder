export function frierenEffect() {
    const frierenImg = document.getElementById('frierenImg');

    let animationFrameId;

    frierenImg.addEventListener('mousemove', (event) => {
        const rect = frierenImg.getBoundingClientRect();

        const centerX = rect.left + (rect.width / 2);
        const centerY = rect.top + (rect.height / 2);

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const moveX = (mouseX - centerX) / (rect.width / 2);
        const moveY = (mouseY - centerY) / (rect.height / 2);

        const intensidade = 15;
        cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
            frierenImg.style.setProperty('--move-x', `${moveX * intensidade}px`);
            frierenImg.style.setProperty('--move-y', `${moveY * intensidade}px`);
        });
    });

    frierenImg.addEventListener('mouseleave', () => {
        cancelAnimationFrame(animationFrameId);
        frierenImg.style.setProperty('--move-x', '0px');
        frierenImg.style.setProperty('--move-y', '0px');
    });
}