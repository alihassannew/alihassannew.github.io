(function($){
    $(document).ready(function(){
        var messages = {};
        var error_messages = {};

        var fill_messages = function () {
            messages['newsletter-success'] = "Thank you for subscribing to our newsletter";
        };

        function create_success_message($message) {
            return '<div class="alert alert-success">' + $message + '</div>';
        }
        var fill_error_messages = function () {
            error_messages['email-required'] = "Please enter your email address";
            error_messages['email-email'] = "Please enter a valid email address";
            error_messages['sending'] = "Sending...";
        };

        var validate_newsletter_form = function () {
            $(".newsletter-subscription-form").each(function () {
                $(this).validate({
                    // Specify validation rules
                    rules: {
                        // The key name on the left side is the name attribute
                        // of an input field. Validation rules are defined
                        // on the right side
                        "subscriber-email": "required"
                    },
                    // Specify validation error messages
                    messages: {
                        "subscriber-email": {
                            email: error_messages['email-email'],
                            required: error_messages['email-required']
                        }
                    },
                    // messages: {
                    //     "subscriber-email": error_messages['email-email']
                    // },
                    // errorPlacement: function (error, element) {
                    //     if (element.attr("name") == "subscriber-email") {
                    //         error.insertAfter(element.parent());
                    //     }
                    // },
                    // Make sure the form is submitted to the destination defined
                    // in the "action" attribute of the form when valid
                    submitHandler: function (form) {
                        var submit_btn = $(form).find("input[type=submit]");
                        action = 'add_new_member';
                        var url = $(form).find(":submit").data("url");
                        var type = $(form).find(":submit").data("type");
                        var email = $(form).find("input[name='subscriber-email']").val();
                        var subscribe_nonce = $(form).find("input[name='subscribe_nonce']").val();
                        $('.newsletter-load').addClass('newsletter-load-show');
                        // submit_btn.val(error_messages['sending']);

                        $.ajax({
                            url: url,
                            type: 'post',
                            data: {
                                action: action,
                                email: email,
                                subscribe_nonce: subscribe_nonce,
                                type: type
                            },
                            success: function (result) {
                                if (result == 0) {
                                } else {
                                    if (type == 'newsletter') {
                                        var success_message = create_success_message(messages['newsletter-success']);
                                        $(form).find("div").replaceWith(success_message);
                                        $('.newsletter-subscription-form input').hide();
                                    }
                                }
                            }
                        });
                    }
                });
            });
        };
        fill_messages();
        fill_error_messages();
        validate_newsletter_form();
    });
})(jQuery);