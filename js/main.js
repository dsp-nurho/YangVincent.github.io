$(document).ready(function() {
    setTimeout(function() {
        $('body').addClass('loaded');
        $('h1').css('color', '#222222');
    }, 1500);
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        // Prevent default anchor click behavior
        event.preventDefault();


        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        var pageRef=$(this).attr("href");
        if (pageRef[0] != "#"){
            window.location.href=pageRef;
        }
        else {
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            })};
    });

    // Slide in elements on scroll
    $(window).scroll(function() {
        $(".slideanim").each(function(){
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });



    $('.close-error').click(function() {
        $('#login-error').hide();
    });
    $('.close-already-logged-in').click(function() {
        $('#already-logged-in').hide();
    });
    $('#registration').click(function() {
        if (Parse.User.current() != null){
            $('#already-logged-in').show();
            return;
        }

        var username=document.getElementById('potentialusername').value;
        var password=document.getElementById('potentialpassword').value;
        var email=document.getElementById('potentialemail').value;
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.signUp(null, {
            success: function(user) {
                // Hooray! Let them use the app now.
                $('#logged-in-status').show();
                $('#logged-out-status').hide();
                document.getElementById('potentialusername').value = "";
                document.getElementById('potentialpassword').value = "";
                document.getElementById('potentialemail').value = "";
            },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
                $('#login-error').show();
                $('logged-out-status').hide();
                alert("Error: " + error.code + " " + error.message);
                document.getElementById('potentialusername').value = "";
                document.getElementById('potentialpassword').value = "";
                document.getElementById('potentialemail').value = "";
            }
        });
    });
    $('#change-password').click(function() {
        var email = document.getElementById('potentialemail').value;
        if (email == "") {
            alert("You must fill out the email field!");
            return;
        }
        if (Parse.User.current() != null) {
            $('#already-logged-in').show();
            return;
        }    
        Parse.User.requestPasswordReset(email, {
            success: function() {
                //Password reset request sent successfully
                alert("You have been sent an email! Use it to reset the password");
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    });
    $('#signin').click(function() {
        if (Parse.User.current() != null){
            $('#already-logged-in').show();
            return;
        }
        var username=document.getElementById('potentialusername').value;
        var password=document.getElementById('potentialpassword').value;
        Parse.User.logIn(username, password, {
            success: function(user) {
                alert("logged in!");
                document.getElementById('potentialusername').value = "";
                document.getElementById('potentialpassword').value = "";
                document.getElementById('potentialemail').value = "";
                $('#logged-in-status').show();
            },
            error: function(user, error) {
                alert("Unable to log in")
                    document.getElementById('potentialusername').value = "";
                document.getElementById('potentialpassword').value = "";
                document.getElementById('potentialemail').value = "";
                $('#logged-in-status').hide();
                $('logged-out-status').show();

            }
        });
    });
    $('#signout').click(function() {
        document.getElementById('potentialusername').value = "";
        document.getElementById('potentialpassword').value = "";
        document.getElementById('potentialemail').value = "";
        if (Parse.User.current() == null) {
            alert("Not logged in");
        }
        alert("signing out");
        Parse.User.logOut();
        $('#logged-in-status').hide();
        $('#already-logged-in').hide();
    });
});
