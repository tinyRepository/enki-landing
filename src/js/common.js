// Animate stats counter
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stats__number');
  const statsSection = document.querySelector('.stats');
  const duration = 2000;

  const numberFormat = new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
  });

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const startValue = +counter.getAttribute('data-start');
    const range = target - startValue;
    const startTime = performance.now();

    const updateCount = () => {
      const now = performance.now();
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.ceil(progress * range + startValue);

      counter.innerText = numberFormat.format(currentValue).replace(/,/g, ' ');

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const checkStatsSection = () => {
    if (isElementInViewport(statsSection) && !statsSection.classList.contains('animated')) {
      statsSection.classList.add('animated');
      counters.forEach((counter) => {
        animateCounter(counter);
      });
    }
  };

  window.addEventListener('scroll', checkStatsSection);
  checkStatsSection();
});

// Open FAQ items
document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach((item) => {
    const control = item.querySelector('.faq__item-control');

    control.addEventListener('click', function () {
      item.classList.toggle('active');

      const description = item.querySelector('.faq__item-description');
      if (item.classList.contains('active')) {
        description.style.maxHeight = description.scrollHeight + 'px';
      } else {
        description.style.maxHeight = '0';
      }
    });
  });
});

// Tabs switcher
const tabItems = document.querySelectorAll('.prices__tab-item');
const tabTargets = document.querySelectorAll('.prices__tab-target');

tabItems.forEach((tabItem, index) => {
  tabItem.addEventListener('click', () => {
    tabItems.forEach((item) => item.classList.remove('active'));
    tabTargets.forEach((target) => target.classList.remove('active'));

    tabItem.classList.add('active');
    tabTargets[index].classList.add('active');
  });
});
