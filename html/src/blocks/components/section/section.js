import $ from 'jquery';
import fullpage from 'fullpage.js';
import Typewriter from 'typewriter-effect/dist/core';

$(function() {



const third_shield = new Typewriter('.third__shield-in', {
    strings: ['Mosoblkino "has been organizing film distribution.'],
    autoStart: false,
    delay: 15
});

const fiveth_shield = new Typewriter('.fiveth__shield-in', {
    strings: ['Mosoblkino "has been organizing film distribution.'],
    autoStart: false,
    delay: 15
});

const seventh_shield = new Typewriter('.seventh__shield-in', {
    strings: ['Mosoblkino "has been organizing film distribution.'],
    autoStart: false,
    delay: 15
});

const nineth_title = new Typewriter('.nine__title', {
    strings: ['Feedback form'],
    autoStart: false,
    delay: 15
});

const second_title = new Typewriter('.second__text', {
    strings: ['Our commitments'],
    autoStart: false,
    delay: 15
});



function animateTyping(writer, text, selector) {
    $(selector).html('');
    writer.typeString(text).start();
}
const scroller = new fullpage('#sections', {
    anchors: ['first', 'second', 'third', 'fourth', 'fiveth', 'sixth', 'seventh', 'eight', 'nine'],
    // licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    scrollingSpeed: 3000,
    // autoScrolling: false,
    controlArrows: true,
    afterRender: ( section, origin, destination, direction) => {
		$('.counter__current').text(section.index + 1);
        if ( window.step == 1) {
            window.mobileStep1();
        }
	},
    onLeave: (origin, destination) => {
        if (!$('.animation__in').length) return;
        $('.counter__current').text(destination.index + 1)
        
        switch (destination.anchor)
        {
            case "first":
                window.step = 1;
                if (!isMobile) {
                    window.step1();
                } else {
                    window.mobileStep1();
                }
                break;
            case "second":
                window.step = 2;
                if (!isMobile) {
                    window.step2();
                } else {
                    window.mobileStep2();
                }
                setTimeout(() => {
                    animateTyping(second_title, $('.second__text').data('text'), '.second__text .Typewriter__wrapper');
                }, 2000);
                break;
            case "third":
                window.step = 3;
                if (!isMobile) {
                    window.step3();
                } else {
                    window.mobileStep3();
                }
                setTimeout(() => {
                    animateTyping(third_shield, $('.third__shield').data('text'), '.third__shield-in .Typewriter__wrapper');
                }, 3000);
                // third_shield
                //     .typeString($('.third__shield').data('text'))
                //     .start();
                break;
            case "fourth":
                window.step = 4;
                if (!isMobile) {
                    window.step4();
                } else {
                    window.mobileStep2();
                }
                break;
            case "fiveth":
                window.step = 5;
                if (!isMobile) {
                    window.step5();
                } else {
                    window.mobileStep4();
                }
                setTimeout(() => {
                    animateTyping(fiveth_shield, $('.fiveth__shield').data('text'), '.fiveth__shield-in .Typewriter__wrapper');
                }, 3000);
                break;
            case "sixth":
                window.step = 6;
                if (!isMobile) {
                    window.step6();
                } else {
                    window.mobileStep2();
                }
                break;
            case "seventh":
                window.step = 7;
                if (!isMobile) {
                    window.step7();
                } else {
                    window.mobileStep5();
                }
                setTimeout(() => {
                    animateTyping(seventh_shield, $('.seventh__shield').data('text'), '.seventh__shield-in .Typewriter__wrapper');
                }, 3000);
                break;
            case "eight":
                window.step = 8;
                if (!isMobile) {
                    window.step8();
                } else {
                    window.mobileStep2();
                }
                break;
            case "nine":
                window.step = 9;
                if (!isMobile) {
                    window.step9();
                } else {
                    window.mobileStep1();
                }
                setTimeout(() => {
                    animateTyping(nineth_title, $('.nine__title').data('text'), '.nine__title .Typewriter__wrapper');
                }, 2000);
                break;
            default:
                window.step = 1;
                window.step1();
         }
        if (destination.anchor == 'first') {
            $('.mobile-arrows__item.mobile-arrows__item--up').fadeOut();
        } else {
            $('.mobile-arrows__item.mobile-arrows__item--up').fadeIn();
        }

        if (destination.anchor === 'nine') {
            $('.mobile-arrows__item.mobile-arrows__item--down').fadeOut();
            $('.to_top').fadeIn();

        } else {
            $('.mobile-arrows__item.mobile-arrows__item--down').fadeIn();
            $('.to_top').fadeOut();
        }
    },
});
setTimeout(() => {
    fullpage_api.moveTo('first', 0);
}, 2000);
if(isMobile) {
    window.dispatchEvent(new Event('scroll'));
}
})