/* Mobile slide + contextual chevrons */
(function(){
  const frame = document.getElementById('frame');
  const next  = document.getElementById('chevNext');
  const back  = document.getElementById('chevBack');

  const goRight = () => frame.classList.add('show-right');
  const goLeft  = () => frame.classList.remove('show-right');

  next.addEventListener('click', goRight);
  back.addEventListener('click', goLeft);

  // Swipe gesture
  let startX = 0, tracking = false;
  frame.addEventListener('touchstart', e => {tracking = true; startX = e.touches[0].clientX;}, {passive:true});
  frame.addEventListener('touchend', e => {
    if(!tracking) return; tracking = false;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    const threshold = 50;
    const onRight = frame.classList.contains('show-right');
    if(!onRight && dx < -threshold) goRight();
    if(onRight && dx > threshold) goLeft();
  }, {passive:true});

  // Auto-slide to right on mobile after 1.5s (home page only)
  if (document.body.id === 'home' && window.innerWidth <= 768) {
    setTimeout(() => {
      frame.classList.add('show-right');
    }, 3000);
  }
})();

// Why-match modal controls
(function(){
  const link  = document.getElementById('why-link');
  const modal = document.getElementById('why-modal');
  if(!link || !modal) return;

  const closeBtn = modal.querySelector('.modal-close');

  const open = (e) => {
    e && e.preventDefault();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  link.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if(e.target === modal) close(); });
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape' && !modal.hidden) close(); });
})();

// Hamburger menu overlay
(function(){
  const menuBtn = document.querySelector('.menu');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = overlay?.querySelector('.close-menu');

  if(!menuBtn || !overlay || !closeBtn) return;

    const openMenu = () => {
    overlay.hidden = false;
    document.getElementById('frame').classList.add('menu-open');
    };

    const closeMenu = () => {
    overlay.hidden = true;
    document.getElementById('frame').classList.remove('menu-open');
    };

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  overlay.addEventListener('click', e => {
    if(e.target === overlay) closeMenu();
  });

  window.addEventListener('keydown', e => {
    if(e.key === 'Escape' && !overlay.hidden) closeMenu();
  });
})();

// Fade control buttons: brighten all on hover/tap for 3s
(function() {
  const buttons = document.querySelectorAll('.round');

  const activateAll = () => {
    buttons.forEach(btn => btn.classList.add('active'));
    clearTimeout(window.roundFadeTimer);
    window.roundFadeTimer = setTimeout(() => {
      buttons.forEach(btn => btn.classList.remove('active'));
    }, 3000);
  };

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', activateAll);
    btn.addEventListener('click', activateAll);
  });
})();

