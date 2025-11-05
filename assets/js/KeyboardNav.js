document.addEventListener('DOMContentLoaded', () => {
    const TOCLink = document.querySelector('.toc a[href^="#"]');
    TOCLink.forEach (link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                targetEl.setAttribute('tabindex', '-1');
                targetEl.focus({preventScroll: true});
                targetEl.scrollIntoView({behavior: "smooth"});
            }
        });
    });
});
