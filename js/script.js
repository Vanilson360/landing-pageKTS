// Barra de progresso de rolagem
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            document.getElementById('progressBar').style.width = scrollPercentage + '%';
        });
        
        // Menu mobile
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navBackdrop = document.getElementById('navBackdrop');

        const openMobileMenu = () => {
            navLinks.classList.add('mobile-open');
            navBackdrop.classList.add('is-visible');
            document.body.classList.add('nav-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        };

        const closeMobileMenu = () => {
            navLinks.classList.remove('mobile-open');
            navBackdrop.classList.remove('is-visible');
            document.body.classList.remove('nav-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        };
        
        mobileMenuBtn.addEventListener('click', function() {
            if (navLinks.classList.contains('mobile-open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Fechar menu ao clicar em um link (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Navegação suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navElement = document.querySelector('nav');
                    const offset = navElement ? navElement.offsetHeight + 16 : 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Fechar menu mobile no backdrop e tecla Esc
        navBackdrop.addEventListener('click', closeMobileMenu);
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
                closeMobileMenu();
            }
        });

        // Destaque do link ativo no header durante o scroll
        const navSectionLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
        const navSections = navSectionLinks
            .map((link) => document.querySelector(link.getAttribute('href')))
            .filter((section) => section);

        const updateActiveNavLink = () => {
            if (!navSectionLinks.length || !navSections.length) return;

            const currentScroll = window.scrollY + 140;
            let activeSection = navSections[0];

            navSections.forEach((section) => {
                if (currentScroll >= section.offsetTop) {
                    activeSection = section;
                }
            });

            navSectionLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${activeSection.id}`;
                link.classList.toggle('is-active', isActive);
            });
        };

        window.addEventListener('scroll', updateActiveNavLink);
        window.addEventListener('load', updateActiveNavLink);
        
        // Logo flutuante - voltar ao topo
        document.getElementById('floatingLogo').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Feedback visual do CTA no rodapé
        const contatoBtn = document.querySelector('.contato-btn');
        if (contatoBtn) {
            contatoBtn.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 140);
            });
        }
        
        // Copiar e-mail com fallback
        const copyEmailBtn = document.getElementById('copyEmailBtn');
        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', async function() {
                const email = this.dataset.email || '';
                const original = this.innerHTML;
                try {
                    await navigator.clipboard.writeText(email);
                    this.innerHTML = '<i class="fas fa-check"></i> E-mail Copiado';
                    this.style.background = 'rgba(34, 197, 94, 0.24)';
                } catch (err) {
                    this.innerHTML = '<i class="fas fa-times"></i> Copie Manualmente';
                    this.style.background = 'rgba(239, 68, 68, 0.25)';
                }
                setTimeout(() => {
                    this.innerHTML = original;
                    this.style.background = '';
                }, 1800);
            });
        }
        
        // Hora local no rodapé
        const footerTimeElement = document.getElementById('footerTime');
        const updateFooterTime = () => {
            if (!footerTimeElement) return;
            footerTimeElement.textContent = new Intl.DateTimeFormat('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date());
        };
        updateFooterTime();
        setInterval(updateFooterTime, 60000);

        // Entrada do rodape ao entrar na tela
        const footerElement = document.querySelector('footer.footer-animate');
        if (footerElement) {
            if ('IntersectionObserver' in window) {
                footerElement.classList.add('will-reveal');
                const footerObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            footerElement.classList.add('is-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.25 });
                footerObserver.observe(footerElement);
            } else {
                footerElement.classList.add('is-visible');
            }
        }
        
        // Efeito de digitação para o slogan
        const slogan = "Tecnologia simples para negócios que querem crescer";
        const sloganElement = document.querySelector('.capa h1');
        let i = 0;
        
        // Iniciar efeito de digitação quando a página carregar
        window.addEventListener('load', function() {
            sloganElement.innerHTML = "";
            setTimeout(() => {
                const typeWriter = () => {
                    if (i < slogan.length) {
                        sloganElement.innerHTML = slogan.substring(0, i+1) + '<span class="cursor">|</span>';
                        i++;
                        setTimeout(typeWriter, 50 + Math.random() * 30);
                    } else {
                        sloganElement.innerHTML = slogan;
                    }
                };
                typeWriter();
            }, 800);
        });
        
        // Ajustar menu em redimensionamento da janela
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
