export function setupLogo() {
  const logoPrincipal = document.getElementById('logo-principal');

  logoPrincipal.addEventListener('click', () => {
    location.reload();
  });

  let animationFrameId;

  logoPrincipal.addEventListener('mousemove', (event) => {
    const rect = logoPrincipal.getBoundingClientRect();

    const centerX = rect.left + (rect.width / 2);
    const centerY = rect.top + (rect.height / 2);

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const moveX = (mouseX - centerX) / (rect.width / 2);
    const moveY = (mouseY - centerY) / (rect.height / 2);

    const intensidade = 15; 
    cancelAnimationFrame(animationFrameId); 

    animationFrameId = requestAnimationFrame(() => {
      logoPrincipal.style.setProperty('--move-x', `${moveX * intensidade}px`);
      logoPrincipal.style.setProperty('--move-y', `${moveY * intensidade}px`);
    });
  });

  logoPrincipal.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animationFrameId);
    logoPrincipal.style.setProperty('--move-x', '0px');
    logoPrincipal.style.setProperty('--move-y', '0px');
  });
}
