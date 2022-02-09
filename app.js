
const carousel = document.querySelector('#image__carousel');

const nextButton = carousel.querySelector('.carousel__button.next');
const prevButton = carousel.querySelector('.carousel__button.prev');
const slideTrack = carousel.querySelector('.carousel__track');
const slideArray = Array.from(slideTrack.children);
const navTrack = carousel.querySelector('.carousel__nav');
const navArray = Array.from(navTrack.children);

const NUM_OF_SLIDES = slideArray.length;

//move from currentSlide to the targetSlide
const moveToSlide = (currentSlide, targetSlide) => {
    currentSlide.classList.remove('active__slide');
    targetSlide.classList.add('active__slide');

    const currentSlideDescription = currentSlide.querySelector('.carousel__slide-description');
    const targetSlideDescription = targetSlide.querySelector('.carousel__slide-description');
    
    currentSlideDescription.classList.remove('display');
    targetSlideDescription.classList.add('display');
}

//update the navigation buttons when slide moves
const updateNav = (currentDot, targetDot) => {
    currentDot.classList.remove('active__slide');
    targetDot.classList.add('active__slide');
}

const moveToNextSlide = () => {
    const currentSlide = slideTrack.querySelector('.carousel__slide.active__slide');
    const firstSlide = slideArray[0];
    const nextSlide = currentSlide.nextElementSibling || firstSlide;
    moveToSlide(currentSlide, nextSlide);
    
    const currentDot = navTrack.querySelector('.carousel__nav-button.active__slide');
    const firstDot = navArray[0];
    const nextDot = currentDot.nextElementSibling || firstDot;
    updateNav(currentDot, nextDot);
}

const moveToPreviousSlide = () => {
    const currentSlide = slideTrack.querySelector('.carousel__slide.active__slide');
    const lastSlide = slideArray[NUM_OF_SLIDES - 1]
    const previousSlide = currentSlide.previousElementSibling || lastSlide;
    moveToSlide(currentSlide, previousSlide);
    
    const currentDot = navTrack.querySelector('.carousel__nav-button.active__slide');
    const lastDot = navArray[NUM_OF_SLIDES - 1];
    const previousDot = currentDot.previousElementSibling || lastDot;
    updateNav(currentDot, previousDot);
}

nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPreviousSlide);

//When I click on a dot in the navigation, go to that slide
navTrack.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = slideTrack.querySelector('.carousel__slide.active__slide');
    const currentDot = navTrack.querySelector('.carousel__nav-button.active__slide');
    const targetIndex = navArray.findIndex(dot => dot === targetDot);
    const targetSlide = slideArray[targetIndex];

    moveToSlide(currentSlide, targetSlide);
    updateNav(currentDot, targetDot);
})

//time between slides - auto play - in ms
const intervalTime = 4000;
let intervalId;

const repeater = () => {
    intervalId = setInterval(() => {
        moveToNextSlide();
    }, intervalTime);
}

repeater();

//When I put my mouse over carousel, don't auto play slides
//When I put my mouse over carousel, display Arrows
carousel.addEventListener('mouseover', () => {
    clearInterval(intervalId);
    nextButton.classList.add('display');
    prevButton.classList.add('display');
});

//When I put my mouse out of carousel, auto play slides again
//When I put my mouse out of carousel, don't display arrows
carousel.addEventListener('mouseout', () => {
    repeater();
    nextButton.classList.remove('display');
    prevButton.classList.remove('display');
});
