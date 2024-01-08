function createTabs(selector) {
  const el = document.querySelector(selector);
  const liEls = el.querySelectorAll('ul li');
  const tabContentEl = el.querySelector('.tab-content');
  const firstTabEl = liEls.item(0).firstElementChild;

  function activate(target) {
    const hash = target.hash;
    const anchors = target.closest('ul').querySelectorAll('li a');

    Array.from(anchors).forEach((v) => (v.className = ''));
    Array.from(tabContentEl.children).forEach(
      (v) => (v.style.display = 'none')
    );
    tabContentEl.querySelector(hash).style.display = '';
    target.className = 'active';
  }

  const handleHash = () => {
    if (location.hash) {
      const selector = `a[href="${location.hash}"]`;
      activate(document.querySelector(selector));
    } else {
      activate(firstTabEl);
    }
  };

  window.addEventListener('hashchange', handleHash);

  handleHash();
}

createTabs('.tabs');
