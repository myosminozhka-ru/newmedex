import $ from 'jquery';
import gsap from 'gsap';
import Typewriter from 'typewriter-effect/dist/core';


window.typewriter = new Typewriter('.first__name--title', {
    strings: ['Assistant and provider of financial protection in high-risk eCOM Universe.'],
    autoStart: false,
    delay: 5
});
window.typewriterText = new Typewriter('.first__name--text', {
    strings: ['Full-cycle outsourcing: we find whatever you want and deliver wherever you need. Quality and Safety guaranteed'],
    autoStart: false,
    delay: 5
});


$(function() {
    function moveItem(item) {
        gsap.to(item, 0.3, {
            transform: `scale(1) translate(0, 0)`,
            fillOpacity: 1,
            onComplete: () => {
                if ($(item).next().length) {
                    moveItem($(item).next());
                } else {
                    finishPreloading();
                }
            }
        })
    }
    function startPreloader() {
        moveItem($('.preloader__in > svg > g')[0]);
    }
    function finishPreloading() {
        let svgWidthOnFullHd = 219 * (window.innerWidth / 1920);
        let svgHeightOnFullHd = 109 * (window.innerWidth / 1920);
        let innerWidth = $('.preloader__in').width();
        let innerHeight = $('.preloader__in').height();
        if (window.innerWidth > 1023) {
            gsap.to('.preloader__in', 1, {
                left: () => {
                    return 100 * 100 / 1920 + 'vw'
                },
                top: () => {
                    return 60 * 100 / 1920 + 'vw'
                },
                x: () => {
                    return ((innerWidth - svgWidthOnFullHd) / 2 * - 1)  * 100 / 1920 + 'vw'
                },
                y: () => {
                    return ((innerHeight - svgHeightOnFullHd) / 2 * - 1) * 100 / 1920 + 'vw'
                },
                opacity: 0,
                onComplete: () => {
                    $('.preloader').fadeOut('slow', function() {
                        showShield();
                    });
                }
            })
        } else {
            showShield();
            $('.preloader').fadeOut();
        }
    }
    function showShield() {
        $('.first__name').fadeIn('fast');
        
        typewriter
        .typeString($('.first__name--title').data('text'))
        .start().callFunction(() => {
            typewriterText
            .typeString($('.first__name--text').data('text'))
            .start().callFunction(() => {
                $('.first__shield').prepend($(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 641 775" fill="none">
            
                    <path d="M1.5 545.185V120.557C1.5 103.32 12.9572 88.1831 29.5469 83.5031L309.568 4.50743C316.403 2.57913 323.639 2.57914 330.474 4.50743L610.495 83.5031C627.084 88.1831 638.542 103.32 638.542 120.557V244.459V545.185C638.542 558.214 631.953 570.358 621.031 577.461L341.01 759.561C328.248 767.861 311.794 767.861 299.032 759.561L19.0109 577.461C8.08895 570.358 1.5 558.214 1.5 545.185Z" stroke="white" stroke-opacity="0" stroke-width="3" transform="scale(0.71)" style="transform-box: fill-box; transform-origin: 50% 50%;">
                        <animateTransform
                            attributeName="transform"
                            type="scale"
                            values="0.71; 1"
                            dur="2s"
                            repeatCount="indefinite"
                            begin="12.5s"
                        />
                        <animate
                            attributeName="stroke-opacity"
                            values="0; 0.3; 0"
                            dur="2s"
                            repeatCount="indefinite"
                            begin="12.5s"
                        />
                    </path>
                    <path d="M45.1392 520.476V161.479C45.1392 144.237 56.6037 129.097 73.2005 124.422L309.582 57.8357C316.408 55.9128 323.633 55.9128 330.46 57.8357L566.841 124.422C583.438 129.097 594.903 144.237 594.903 161.479V264.148V520.476C594.903 533.514 588.304 545.666 577.37 552.766L340.988 706.26C328.236 714.54 311.806 714.54 299.054 706.26L62.672 552.766C51.7375 545.666 45.1392 533.514 45.1392 520.476Z" stroke="white" stroke-opacity="0" stroke-width="3" transform="scale(0.83)" style="transform-box: fill-box; transform-origin: 50% 50%;">
                        <animateTransform
                            attributeName="transform"
                            type="scale"
                            values="0.83; 1.1"
                            dur="2s"
                            repeatCount="indefinite"
                            begin="13.5s"
                        />
                        <animate
                            attributeName="stroke-opacity"
                            values="0; 0.3; 0"
                            dur="2s"
                            repeatCount="indefinite"
                            begin="13.5s"
                        />
                    </path>
                    <path d="M92.8191 493.926V205.481C92.8191 188.242 104.279 173.104 120.871 168.426L309.573 115.219C316.405 113.292 323.637 113.292 330.469 115.219L519.171 168.426C535.763 173.104 547.223 188.242 547.223 205.481V285.328V493.926C547.223 506.957 540.631 519.104 529.704 526.206L341.002 648.859C328.244 657.152 311.798 657.152 299.039 648.859L110.337 526.206C99.4112 519.104 92.8191 506.957 92.8191 493.926Z" stroke="white" stroke-opacity="0.3" stroke-width="3" stroke-dasharray="2100 2100" stroke-dashoffset="2100">
                        <animate
                            attributeName="stroke-dashoffset"
                            values="2100; 0"
                            dur="12s"
                            fill="freeze"
                            repeatCount="1"
                            begin="1s"
                        />
                    </path>
                    <path
                        d="M135.65 470.405V244.498C135.65 227.274 147.09 212.146 163.662 207.454L309.533 166.155C316.39 164.214 323.652 164.214 330.509 166.155L476.379 207.454C492.952 212.146 504.392 227.274 504.392 244.498V304.122V470.405C504.392 483.411 497.825 495.538 486.934 502.646L341.063 597.849C328.276 606.194 311.766 606.194 298.979 597.849L153.108 502.646C142.217 495.538 135.65 483.411 135.65 470.405Z"
                        stroke="white" stroke-width="3" />
                    <g fill-opacity="0" class="small_shield" data-text-id="1" transform="translate(-100 0)">
                        <path class="border"
                            d="M80 497.816V517.99C80 518.661 80.3363 519.287 80.8956 519.657L93.8956 528.268C94.5651 528.712 95.4349 528.712 96.1044 528.268L109.104 519.657C109.664 519.287 110 518.661 110 517.99V503.671V497.816C110 496.925 109.409 496.14 108.552 495.894L95.5523 492.159C95.1914 492.055 94.8086 492.055 94.4477 492.159L81.4477 495.894C80.5905 496.14 80 496.925 80 497.816Z" />
                        <path
                            d="M85 502.413V515.22C85 515.887 85.3319 516.51 85.8852 516.881L93.8852 522.252C94.5595 522.704 95.4405 522.704 96.1148 522.252L104.115 516.881C104.668 516.51 105 515.887 105 515.22V505.886V502.413C105 501.524 104.413 500.741 103.559 500.493L95.5592 498.163C95.194 498.056 94.806 498.056 94.4408 498.163L86.4408 500.493C85.5871 500.741 85 501.524 85 502.413Z" />
                        <animate
                            attributeName="fill-opacity"
                            values="0; 1"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            to="0 0"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                    </g>
                    <g fill-opacity="0" class="small_shield" data-text-id="2" transform="translate(-100 -50)">
                        <path class="border"
                            d="M83 172.816V192.99C83 193.661 83.3363 194.287 83.8956 194.657L96.8956 203.268C97.5651 203.712 98.4349 203.712 99.1044 203.268L112.104 194.657C112.664 194.287 113 193.661 113 192.99V178.671V172.816C113 171.925 112.409 171.14 111.552 170.894L98.5523 167.159C98.1914 167.055 97.8086 167.055 97.4477 167.159L84.4477 170.894C83.5905 171.14 83 171.925 83 172.816Z" />
                        <path
                            d="M88 177.413V190.22C88 190.887 88.3319 191.51 88.8852 191.881L96.8852 197.252C97.5595 197.704 98.4405 197.704 99.1148 197.252L107.115 191.881C107.668 191.51 108 190.887 108 190.22V180.886V177.413C108 176.524 107.413 175.741 106.559 175.493L98.5592 173.163C98.194 173.056 97.806 173.056 97.4408 173.163L89.4408 175.493C88.5871 175.741 88 176.524 88 177.413Z" />
                        <animate
                            attributeName="fill-opacity"
                            values="0; 1"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                            begin="2.7s"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            to="0 0"
                            begin="2.7s"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                    </g>
                    <g fill-opacity="0" class="small_shield" data-text-id="3" transform="translate(0 -100)">
                        <path class="border"
                            d="M305 101.816V121.99C305 122.661 305.336 123.287 305.896 123.657L318.896 132.268C319.565 132.712 320.435 132.712 321.104 132.268L334.104 123.657C334.664 123.287 335 122.661 335 121.99V107.671V101.816C335 100.925 334.409 100.14 333.552 99.8942L320.552 96.1587C320.191 96.055 319.809 96.055 319.448 96.1587L306.448 99.8942C305.591 100.14 305 100.925 305 101.816Z" />
                        <path
                            d="M310 106.413V119.22C310 119.887 310.332 120.51 310.885 120.881L318.885 126.252C319.559 126.704 320.441 126.704 321.115 126.252L329.115 120.881C329.668 120.51 330 119.887 330 119.22V109.886V106.413C330 105.524 329.413 104.741 328.559 104.493L320.559 102.163C320.194 102.056 319.806 102.056 319.441 102.163L311.441 104.493C310.587 104.741 310 105.524 310 106.413Z" />
                        <animate
                            attributeName="fill-opacity"
                            values="0; 1"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                            begin="4s"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            to="0 0"
                            begin="4s"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                    </g>
                    <g fill-opacity="0" class="small_shield" data-text-id="4" transform="translate(100 -50)">
                        <path class="border"
                            d="M528 172.816V192.99C528 193.661 528.336 194.287 528.896 194.657L541.896 203.268C542.565 203.712 543.435 203.712 544.104 203.268L557.104 194.657C557.664 194.287 558 193.661 558 192.99V178.671V172.816C558 171.925 557.409 171.14 556.552 170.894L543.552 167.159C543.191 167.055 542.809 167.055 542.448 167.159L529.448 170.894C528.591 171.14 528 171.925 528 172.816Z" />
                        <path
                            d="M533 177.413V190.22C533 190.887 533.332 191.51 533.885 191.881L541.885 197.252C542.559 197.704 543.441 197.704 544.115 197.252L552.115 191.881C552.668 191.51 553 190.887 553 190.22V180.886V177.413C553 176.524 552.413 175.741 551.559 175.493L543.559 173.163C543.194 173.056 542.806 173.056 542.441 173.163L534.441 175.493C533.587 175.741 533 176.524 533 177.413Z" />
                        <animate
                            attributeName="fill-opacity"
                            values="0; 1"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                            begin="5.3s"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            to="0 0"
                            begin="5.3s"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                    </g>
                    <g fill-opacity="0" class="small_shield" data-text-id="5" transform="translate(100 50)">
                        <path class="border"
                            d="M530 497.816V517.99C530 518.661 530.336 519.287 530.896 519.657L543.896 528.268C544.565 528.712 545.435 528.712 546.104 528.268L559.104 519.657C559.664 519.287 560 518.661 560 517.99V503.671V497.816C560 496.925 559.409 496.14 558.552 495.894L545.552 492.159C545.191 492.055 544.809 492.055 544.448 492.159L531.448 495.894C530.591 496.14 530 496.925 530 497.816Z" />
                        <path
                            d="M535 502.413V515.22C535 515.887 535.332 516.51 535.885 516.881L543.885 522.252C544.559 522.704 545.441 522.704 546.115 522.252L554.115 516.881C554.668 516.51 555 515.887 555 515.22V505.886V502.413C555 501.524 554.413 500.741 553.559 500.493L545.559 498.163C545.194 498.056 544.806 498.056 544.441 498.163L536.441 500.493C535.587 500.741 535 501.524 535 502.413Z" />
                        <animate
                            attributeName="fill-opacity"
                            values="0; 1"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                            begin="7.3s"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            to="0 0"
                            begin="7.3s"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                    </g>
                    <g fill-opacity="0" class="small_shield" data-text-id="6" transform="translate(0 100)">
                        <path class="border"
                            d="M305 642.816V662.99C305 663.661 305.336 664.287 305.896 664.657L318.896 673.268C319.565 673.712 320.435 673.712 321.104 673.268L334.104 664.657C334.664 664.287 335 663.661 335 662.99V648.671V642.816C335 641.925 334.409 641.14 333.552 640.894L320.552 637.159C320.191 637.055 319.809 637.055 319.448 637.159L306.448 640.894C305.591 641.14 305 641.925 305 642.816Z" />
                        <path
                            d="M310 647.413V660.22C310 660.887 310.332 661.51 310.885 661.881L318.885 667.252C319.559 667.704 320.441 667.704 321.115 667.252L329.115 661.881C329.668 661.51 330 660.887 330 660.22V650.886V647.413C330 646.524 329.413 645.741 328.559 645.493L320.559 643.163C320.194 643.056 319.806 643.056 319.441 643.163L311.441 645.493C310.587 645.741 310 646.524 310 647.413Z" />
                        <animate
                            attributeName="fill-opacity"
                            values="0; 1"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                            begin="9s"
                        />
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            to="0 0"
                            begin="9s"
                            dur="0.3s"
                            fill="freeze"
                            repeatCount="1"
                        />
                    </g>
                </svg>`));
                $('.first__shield, .first__text').fadeIn('fast');
                let interval = setInterval(() => {
                    if ($('.first__text-in.isActive').next().length) {
                        $('.first__text-in.isActive').removeClass('isActive').next().addClass('isActive');
                    } else {
                        clearInterval(interval);
                        $('.first__shield').addClass('isInteractable');
                        $('.first__text-in.isActive').removeClass('isActive')
                        $('[data-text-id="1"], [data-item-id="1"]').addClass('isActive');
                    }
                }, 1800)
            });
        });
    }
    startPreloader();
})