// Floating label headings for the contact form
$(function () {
  $("body").on("input propertychange", ".floating-label-form-group", function (e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function () {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function () {
    $(this).removeClass("floating-label-form-group-with-focus");
  });
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function ($) {
  //primary navigation slide-in effect
  var MQL = 768;
  var headerHeight = $('.navbar-custom').height();
  $(window).on('scroll', {
    previousTop: 0
  },
    function () {
      // Navigation bar
      var hasToggleMenu = $(window).width() <= MQL;
      var ignore = false;
      if (hasToggleMenu == true) {
        var isOpen = $("#navbar-collapse-1").hasClass("in");
        ignore = isOpen;
        if (isOpen == true) {
          $('.navbar-custom').addClass('is-visible is-fixed');
          if (!$(".scrollTop-button").is(':visible')) { $(".scrollTop-button").fadeIn(200); }
        }
      }
      if (ignore == false) {
        //check if user is scrolling up
        var currentTop = $(window).scrollTop();
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
            if (!$(".scrollTop-button").is(':visible')) { $(".scrollTop-button").fadeIn(200); }
            $('.navbar-custom').addClass('is-visible');
          } else {
            if ($(".scrollTop-button").is(':visible')) { $(".scrollTop-button").fadeOut(200); }
            $('.navbar-custom').removeClass('is-visible is-fixed');
          }
        } else if (currentTop > this.previousTop) {
          //if scrolling down...
          if ($(".scrollTop-button").is(':visible')) { $(".scrollTop-button").fadeOut(200); }
          $('.navbar-custom').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) { $('.navbar-custom').addClass('is-fixed'); }
        }
      }
      this.previousTop = currentTop;
    });

  $(".menu-headers li a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

function scrollToTop() {
  $('body,html').animate({
    scrollTop: 0
  }, 800, function () {
    // Add hash (#) to URL when done scrolling (default click behavior)
    window.location.hash = "";
  });
  return false;
}

function openTerminal() {
  window.location.href = 'terminal/index.html';
  return false;
}