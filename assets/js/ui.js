// Scroll Navbar
(function () {
  const scrollY = 50;
  const defaultClass = 'py-4 border-transparent';
  const scrollClass = 'py-2 bg-white/80 border-gray-200 backdrop-blur-lg';

  let scrollPos = 0;
  let ticking = false;

  function OnScroll(scrollPos) {
    const headers = document.querySelectorAll('header');
    const classArray = scrollClass.split(' ');
    const replaceArray = defaultClass.split(' ');

    headers.forEach((header) => {
      if (scrollPos > scrollY) {
        header.classList.remove(...replaceArray);
        header.classList.add('is-scroll', ...classArray);
        header.setAttribute('scroll', '');
      }
      //reduce the scrollY to avoid flickering when scrolling up
      if (scrollPos < Math.max(scrollY - 40, 10)) {
        header.classList.remove('is-scroll', ...classArray);
        header.classList.add(...replaceArray);
        header.removeAttribute('scroll');
      }
    });
  }

  document.addEventListener('scroll', (event) => {
    scrollPos = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        OnScroll(scrollPos);
        ticking = false;
      });

      ticking = true;
    }
  });
})();
