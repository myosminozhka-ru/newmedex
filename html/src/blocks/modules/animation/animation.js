import $ from 'jquery';

$('.mobile-arrows__item--up').on('click', function() {
    fullpage_api.moveSectionUp();
});
$('.mobile-arrows__item--down').on('click', function() {
    fullpage_api.moveSectionDown();
});


$('[data-target_modal_id]').click(function(event) {
    event.preventDefault();
    $(`[data-modal_id="${$(this).data('target_modal_id')}"]`).addClass('isOpened')
})

$(document).on('click', function(e){
    if( $(e.target).closest('[data-target_modal_id]').length || $(e.target).closest('[data-modal_id] .modal__in').length ) 
      return;
      $(`.modal`).removeClass('isOpened');
});

$(window).bind('orientationchange', function (event) {
    location.reload(true);
});