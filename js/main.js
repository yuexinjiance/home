// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        delay: 100,
        easing: 'ease-in-out'
    });

    // 移动端导航菜单
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                }
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !nav.contains(e.target) && window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }

    // 导航栏活跃状态和滚动效果
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 更新活跃导航项
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            } else {
                console.warn(`目标锚点 ${targetId} 不存在，请检查HTML中是否缺少对应的ID。`);
            }
        });
    });
    
    // 滚动时更新导航栏活跃状态
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // 滚动时导航栏样式调整
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // 业绩展示轮播
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const track = document.querySelector('.achievements-track');
    const cards = document.querySelectorAll('.achievement-card');
    const sliderContainer = document.querySelector('.achievements-slider');
    
    if (track && cards.length > 0 && sliderContainer) {
        let currentPage = 0;
        let cardWidth = 0;
        let viewportWidth = 0;
        let autoplayInterval = null;
        let autoplayTimeout = null;
        const autoplayDelay = 5000; // 自动播放间隔时间，毫秒
        const userInactivityDelay = 4000; // 用户无操作后恢复自动播放的时间，毫秒
        let userInteracted = false;
        
        // 创建指示器
        function createIndicators() {
            // 计算页面数量
            let itemsPerPage = 3;
            if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                itemsPerPage = 2;
            } else if (window.innerWidth <= 768) {
                itemsPerPage = 1;
            }
            
            const maxPages = Math.ceil(cards.length / itemsPerPage);
            
            // 创建指示器容器
            const indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'slider-indicators';
            
            // 清除现有指示器
            const existingIndicators = sliderContainer.querySelector('.slider-indicators');
            if (existingIndicators) {
                existingIndicators.remove();
            }
            
            // 添加指示器点
            for (let i = 0; i < maxPages; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                if (i === currentPage) {
                    indicator.classList.add('active');
                }
                
                // 添加点击事件，允许直接跳转到对应页
                indicator.addEventListener('click', () => {
                    currentPage = i;
                    updateCarousel();
                    resetAutoplayAfterInteraction();
                });
                
                indicatorsContainer.appendChild(indicator);
            }
            
            sliderContainer.appendChild(indicatorsContainer);
        }
        
        // 更新指示器状态
        function updateIndicators() {
            const indicators = document.querySelectorAll('.indicator');
            if (indicators.length > 0) {
                indicators.forEach((indicator, i) => {
                    if (i === currentPage) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
        }
        
        // 设置初始布局
        function setupCarousel() {
            // 确保元素已经渲染好并且有正确的尺寸
            setTimeout(() => {
                viewportWidth = track.parentElement.offsetWidth;
                const computedStyle = window.getComputedStyle(cards[0]);
                const cardMargin = parseInt(computedStyle.marginRight) + parseInt(computedStyle.marginLeft);
                const cardFullWidth = cards[0].offsetWidth + cardMargin;
                cardWidth = cardFullWidth + 30; // 加上gap
                
                // 根据屏幕宽度调整样式
                if (window.innerWidth <= 768) {
                    track.style.gap = '20px';
                    cardWidth = cardFullWidth + 20;
                }
                
                createIndicators();
                updateCarousel();
                startAutoplay(); // 开始初始自动播放
            }, 100);
        }
        
        function updateCarousel() {
            // 计算移动距离，考虑响应式设计
            let itemsPerPage = 3;
            if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                itemsPerPage = 2;
            } else if (window.innerWidth <= 768) {
                itemsPerPage = 1;
            }
            
            const maxPages = Math.ceil(cards.length / itemsPerPage);
            if (currentPage >= maxPages) {
                currentPage = maxPages - 1;
            }
            
            const translateX = currentPage * itemsPerPage * cardWidth;
            track.style.transform = `translateX(-${translateX}px)`;
            
            // 更新按钮状态
            updateButtonStates(itemsPerPage, maxPages);
            // 更新指示器状态
            updateIndicators();
        }
        
        // 更新按钮状态
        function updateButtonStates(itemsPerPage, maxPages) {
            if (prevBtn && nextBtn) {
                prevBtn.classList.remove('disabled');
                nextBtn.classList.remove('disabled');
                
                if (currentPage === 0) {
                    prevBtn.classList.add('disabled');
                }
                
                if (currentPage === maxPages - 1) {
                    nextBtn.classList.add('disabled');
                }
            }
        }
        
        // 启动自动播放
        function startAutoplay() {
            stopAutoplay(); // 确保没有多个计时器同时运行
            
            autoplayInterval = setInterval(() => {
                let itemsPerPage = 3;
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    itemsPerPage = 2;
                } else if (window.innerWidth <= 768) {
                    itemsPerPage = 1;
                }
                
                const maxPages = Math.ceil(cards.length / itemsPerPage);
                
                if (currentPage < maxPages - 1) {
                    currentPage++;
                } else {
                    currentPage = 0;
                }
                updateCarousel();
            }, autoplayDelay);
        }
        
        // 停止自动播放
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            
            if (autoplayTimeout) {
                clearTimeout(autoplayTimeout);
                autoplayTimeout = null;
            }
        }
        
        // 用户交互后设置计时器恢复自动播放
        function resetAutoplayAfterInteraction() {
            userInteracted = true;
            stopAutoplay();
            
            // 设置在用户停止交互后恢复自动播放
            autoplayTimeout = setTimeout(() => {
                userInteracted = false;
                startAutoplay();
            }, userInactivityDelay);
        }
        
        // 窗口大小改变时重新调整
        window.addEventListener('resize', () => {
            setupCarousel();
        });
        
        // 上一页
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentPage > 0) {
                    currentPage--;
                    updateCarousel();
                    resetAutoplayAfterInteraction();
                }
            });
        }
        
        // 下一页
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let itemsPerPage = 3;
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    itemsPerPage = 2;
                } else if (window.innerWidth <= 768) {
                    itemsPerPage = 1;
                }
                
                const maxPages = Math.ceil(cards.length / itemsPerPage);
                
                if (currentPage < maxPages - 1) {
                    currentPage++;
                    updateCarousel();
                    resetAutoplayAfterInteraction();
                }
            });
        }
        
        // 鼠标交互处理
        track.addEventListener('mouseenter', () => {
            stopAutoplay();
        });
        
        track.addEventListener('mouseleave', () => {
            if (!userInteracted) {
                startAutoplay();
            } else {
                resetAutoplayAfterInteraction();
            }
        });
        
        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;
        let touchThreshold = 70; // 滑动距离阈值
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoplay();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            
            // 检测滑动方向
            const swipeDiff = touchEndX - touchStartX;
            
            if (Math.abs(swipeDiff) > touchThreshold) {
                userInteracted = true;
                
                if (swipeDiff > touchThreshold) {
                    // 向右滑动 - 显示上一页
                    if (currentPage > 0) {
                        currentPage--;
                        updateCarousel();
                    }
                } else if (swipeDiff < -touchThreshold) {
                    // 向左滑动 - 显示下一页
                    let itemsPerPage = 3;
                    if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                        itemsPerPage = 2;
                    } else if (window.innerWidth <= 768) {
                        itemsPerPage = 1;
                    }
                    
                    const maxPages = Math.ceil(cards.length / itemsPerPage);
                    
                    if (currentPage < maxPages - 1) {
                        currentPage++;
                        updateCarousel();
                    }
                }
                
                resetAutoplayAfterInteraction();
            } else {
                // 如果不是有效滑动，且用户没有其他交互，则恢复自动播放
                if (!userInteracted) {
                    startAutoplay();
                }
            }
        }, { passive: true });
        
        // 初始化轮播
        setupCarousel();
    }
    
    // 微信二维码交互
    const wechatContainer = document.querySelector('.wechat-container');
    const wechatQrcode = document.querySelector('.wechat-container .wechat-qrcode');
    
    if (wechatContainer && wechatQrcode) {
        // 移动设备点击切换显示二维码
        wechatContainer.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                // 移动设备上的点击切换显示
                if (wechatQrcode.style.opacity === '1') {
                    wechatQrcode.style.opacity = '0';
                    wechatQrcode.style.transform = 'translateX(-50%) scale(0.9)';
                    wechatQrcode.style.pointerEvents = 'none';
                } else {
                    wechatQrcode.style.opacity = '1';
                    wechatQrcode.style.transform = 'translateX(-50%) scale(1)';
                    wechatQrcode.style.pointerEvents = 'auto';
                }
            }
        });
        
        // 点击页面其他区域关闭二维码
        document.addEventListener('click', function(e) {
            if (!wechatContainer.contains(e.target) && window.innerWidth <= 768) {
                wechatQrcode.style.opacity = '0';
                wechatQrcode.style.transform = 'translateX(-50%) scale(0.9)';
                wechatQrcode.style.pointerEvents = 'none';
            }
        });
    }
    
    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const banner = document.querySelector('.banner');
        const scrollPosition = window.pageYOffset;
        
        if (banner) {
            banner.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // 页面加载完成后淡入显示
    document.body.classList.add('loaded');
}); 