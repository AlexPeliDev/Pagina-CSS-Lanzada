document.addEventListener('DOMContentLoaded', () => {
    
    // === SCROLL PROGRESS BAR ===
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('scrollProgress').style.width = scrolled + "%";
        
        // Show/Hide Scroll to Top Button
        const fab = document.getElementById('scrollToTopBtn');
        if (scrollTop > 500) {
            fab.style.display = "block";
        } else {
            fab.style.display = "none";
        }

        // Header Transparency
        const header = document.querySelector('.encabezado');
        if (scrollTop > 50) {
            header.style.background = "rgba(10, 10, 15, 0.98)";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
        } else {
            header.style.background = "rgba(10, 10, 15, 0.9)";
            header.style.boxShadow = "none";
        }
    });

    // === SCROLL TO TOP ===
    document.getElementById('scrollToTopBtn').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === NUMBER COUNTER ANIMATION ===
    const counters = document.querySelectorAll('.count');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
    
    // Trigger animation when hero is in view
    setTimeout(animateCounters, 1000);

    // === FILTERING SYSTEM ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.poke-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    // Animation reset
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // === SIMPLE TOAST NOTIFICATION FOR NEWSLETTER ===
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por unirte a la liga PokéCalvos! Te hemos enviado un email de confirmación.');
            form.reset();
        });
    });

    // === SMOOTH SCROLL FOR NAV LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
