(function(){
  function updateNavOffset(){
    try{
      const nav = document.querySelector('.nav');
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      const offset = Math.ceil(rect.height + 8) + 'px';
      document.documentElement.style.setProperty('--nav-offset', offset);
    }catch(e){/* ignore */}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavOffset);
  } else {
    updateNavOffset();
  }
  window.addEventListener('resize', updateNavOffset);
})();
