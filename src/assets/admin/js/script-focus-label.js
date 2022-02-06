/*
Author       : Dreamguys
Template Name: Doccure - Bootstrap Admin Template
Version      : 1.3
*/

(function($) {
    "use strict";

    // Floating Label
    if ($('.floating').length > 0) {
        $('.floating').on('focus blur', function(e) {
            $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
        }).trigger('blur');

        setTimeout(() => {
            $('.floating').each(function() {
                $(this).parents('.form-focus').toggleClass('focused', (this.value.length > 0));
            });
        }, 300)

    }

})(jQuery);