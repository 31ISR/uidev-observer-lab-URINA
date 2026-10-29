console.log("Скрипт подключен");

const animatedElements = document.querySelectorAll(".reveal, .slide-left, .slide-right, .scale-up, .stagger-item");

const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;

        if (element.classList.contains("stagger-item")) {
            const parent = element.parenetElement;
            const items = parent.querySelectorAll(".stagger-item");

            items.forEach((item, index)=> {
                setTimeout(()=> {
                    item.classList.add("animate");
                }, index * 200);
            });
        } else {
            element.classList.add("animate");
            observer.unobserve(element);
        }

    });
}, observerOptions);

animatedElements.forEach((element)=> {
    animationObserver.observe(element);
});

const progressBar = document.querySelector(".scroll-progress");

function updateScrollProgress() {
    if (!progressBar) return;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (window.scrollY / documentHeight)*100 : 0;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

