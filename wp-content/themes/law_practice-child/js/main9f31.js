// Changing the label when file input value changes.
(function($){

	$('#cvfile').on('change', function(e){
        var fileName = '';
        var label = $('.wrap-input label span');
        if( this.files && this.files.length > 1 )
            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else
            fileName = e.target.value.split( '\\' ).pop();

        if( fileName )
            label.html(fileName);
        else
            label.html('Choose a file');
    });

    $('#careers-cv').change(function() {
        var filename = $(this).val();
        var lastIndex = filename.lastIndexOf("\\");
        if (lastIndex >= 0) {
            filename = filename.substring(lastIndex + 1);
        }
        $('#careers-cv-name').val(filename);
    });


    $(document).ready(function(){
        $('.homepage-slider').slick({
            fade: true,
            autoplay: true,
            autoplaySpeed: 6000,
            prevArrow:'<div class="tp-leftarrow tparrows hesperiden custom-slick-prev"></div>',
            nextArrow:'<div class="tp-rightarrow tparrows hesperiden custom-slick-next"></div>'
        });
    });

    if ($(window).width() < 768) {
        $("a[data-rel*='prettyPhoto']").css({
            "cursor": "wait",
            "pointer-events": "none"
        });
    }

})(jQuery);