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
