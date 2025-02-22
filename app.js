var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.timeRunning')

let timeRunning = 3000
let timeAutoNext = 7000

nextBtn.onclick = function (){
    showslider('next')
}

prevBtn.onclick = function (){
    showslider ('prev')
}

let runTimeOut

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)

function resetTimeAnimation(){
    runningTime.style.animation = 'none'
    runningTime.offsetHeight 
    runningTime.style.animation = null
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}

function showslider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')


    if(type == 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeAutoNext)

    clearTimeout(runNextAuto)
    runNextAuto = setTimeout (() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation()
}

resetTimeAnimation()

jQuery(document).ready(function ($) {
    $(".slider-img").on("click", function () {
        if ($(this).hasClass("active")) {
            // If it's already active, remove active class and hide details
            $(this).removeClass("active");
            $(this).find(".details").fadeOut();
        } else {
            // Otherwise, activate it and show details
            $(".slider-img").removeClass("active");
            $(".details").hide();

            $(this).addClass("active");
            $(this).find(".details").fadeIn();
        }
    });
});
