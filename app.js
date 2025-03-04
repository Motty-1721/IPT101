jQuery(document).ready(function ($) {
    const nextBtn = document.querySelector('.next'),
        prevBtn = document.querySelector('.prev'),
        carousel = document.querySelector('.carousel'),
        list = document.querySelector('.list'),
        item = document.querySelectorAll('.item'),
        runningTime = document.querySelector('.timeRunning');

    let timeRunning = 3000;
    let timeAutoNext = 7000;
    let runTimeOut, runNextAuto;

    $(".slider-img").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).find(".details").fadeOut();
        } else {
            $(".slider-img").removeClass("active");
            $(".details").hide();
            $(this).addClass("active");
            $(this).find(".details").fadeIn();
        }
    });

    $(document).ready(function () {
        const header = $("header");
        const scrollThreshold = 50;

        $(window).on("scroll", function () {
            if ($(window).scrollTop() > scrollThreshold) {
                header.css("background-color", "black");
            } else {
                header.css("background-color", "transparent");
            }
        });

        $("#menu-btn").on("click", function () {
            header.toggleClass("show-mobile-menu");
        });

        $("#close-menu-btn").on("click", function () {
            $("#menu-btn").trigger("click");
        });

        nextBtn.addEventListener("click", function () {
            showslider("next");
        });

        prevBtn.addEventListener("click", function () {
            showslider("prev");
        });

        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        function resetTimeAnimation() {
            runningTime.style.animation = 'none';
            runningTime.offsetHeight;
            runningTime.style.animation = 'runningTime 7s linear 1 forwards';
        }

        function showslider(type) {
            let sliderItemsDom = list.querySelectorAll('.carousel .list .item');

            if (type == 'next') {
                list.appendChild(sliderItemsDom[0]);
                carousel.classList.add('next');
            } else {
                list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
                carousel.classList.add('prev');
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carousel.classList.remove('next');
                carousel.classList.remove('prev');
            }, timeAutoNext);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                nextBtn.click();
            }, timeAutoNext);

            resetTimeAnimation();
        }

        resetTimeAnimation();

        $('.form').find('input, textarea').on('keyup blur focus', function (e) {
            var $this = $(this),
                label = $this.siblings('label'); // Use siblings instead of prev()
    
            if (e.type === 'keyup') {
                label.toggleClass('active highlight', $this.val() !== '');
            } else if (e.type === 'blur') {
                label.removeClass($this.val() === '' ? 'active highlight' : 'highlight');
            } else if (e.type === 'focus') {
                if ($this.val() !== '') label.addClass('highlight');
            }
        });
    
        $('.tab a').on('click', function (e) {
            e.preventDefault();
            var target = $(this).attr('href');
    
            console.log("Tab clicked:", target); // Debugging
    
            if (!$(target).length) return; // Prevent errors if target doesn't exist
    
            $(this).parent().addClass('active').siblings().removeClass('active');
            $('.tab-content > div').not(target).hide();
            $(target).fadeIn(600);
        });

        $(".enroll").click(function (e) {
            e.preventDefault(); 
            $(".login_registration_container").stop(true, true).fadeIn(); // Stops any animations before fading in
        });
        
        // Click outside to close
        $(document).click(function (event) {
            if (!$(event.target).closest(".form, .enroll").length) {
                $(".login_registration_container").fadeOut();
            }
        });
        
        // Prevent clicks inside the form from closing it
        $(".login_registration_container .form").click(function (e) {
            e.stopPropagation();
        });
        
    });
    
});
