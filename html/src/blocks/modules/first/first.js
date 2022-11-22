import $ from 'jquery';
// if (window.innerWidth <= 1023) {
//     $(`.first__text`).innerHeight($('[data-item-id].isActive').innerHeight());

// }
$('.first__shield').on('mouseenter', '.small_shield', function() {
    $('[data-text-id].isActive').removeClass('isActive');
    $('[data-item-id].isActive').removeClass('isActive');
    $(this).addClass('isActive');
    $(`.first__text-in[data-item-id="${$(this).data('text-id')}"]`).addClass('isActive');
    // $(`.first__text`).innerHeight($(`.first__text-in[data-item-id="${$(this).data('text-id')}"]`).innerHeight());
});