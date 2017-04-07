// From  xr280xr on stackoverflow
// http://stackoverflow.com/questions/14596213/shrink-div-to-text-thats-wrapped-to-its-max-width
$.fn.fixWidth = function( isBold ) {
  $(this).each(function() {
    var el = $(this);
    var getLength = function(txt) {
      var span = new $("<span />");
      if (txt == ' ')
        span.html('&nbsp;');
      else
        span.text(txt);

      //Remove el's contents
      var originalContents = el.contents().detach()

      el.append(span);
      var len = span.width();
      span.remove();

      //Add el's contents back to it
      el.append(originalContents);

      return len;
    };
    var words = el.text().split(' ');
    var lengthOfSpace = getLength(' ');
    var lengthOfLine = 0;
    var maxElementWidth = el.width();
    var maxLineLengthSoFar = 0;
    for (var i = 0; i < words.length; i++) {
      var curWord = getLength(words[i]);

      var acceptedLineLength;
      var proposedLineLength = (lengthOfLine + (i == 0 ? 0 : lengthOfSpace) + curWord);

      if (proposedLineLength > maxElementWidth) {
        acceptedLineLength = lengthOfLine;
        lengthOfLine = curWord; //Start a new line
      } else {
        lengthOfLine = proposedLineLength;
        acceptedLineLength = lengthOfLine
      }

      if (acceptedLineLength > maxLineLengthSoFar)
        maxLineLengthSoFar = acceptedLineLength;
    }

    if (maxLineLengthSoFar != 0) {
      if (isBold ) {
        el.data('maxLineLength', maxLineLengthSoFar + 3) ;
      } else {
        el.data('maxLineLength', maxLineLengthSoFar + 1) ;
      }
    }
  });
};

var fixButtonWidth = function() {
  // get a couple of widths
  var $bannerHeader = $('.banner-text h1') ;
  var $bannerPara = $('.banner-text p') ;
  $bannerHeader.fixWidth(true);
  $bannerPara.fixWidth(true);
  var wide1 = $bannerHeader.data('maxLineLength') ;
  console.log("Banner header is: " + wide1 + "pixels wide.");
  var wide2 = $bannerPara.data('maxLineLength') ;
  console.log("Banner paragraph is: " + wide2 + "pixels wide.");
  if (wide1 > wide2) {
    $('.banner-button-container').css({width: wide1 + "px"}) ;
  } else {
    $('.banner-button-container').css({width: wide2 + "px"}) ;
  }
};

$(document).ready(function(){
  fixButtonWidth() ;
  $(window).resize( function() {
    console.log('In Resize handler');
    if ( $(window).width() > 785 ) {
      fixButtonWidth() ;
    } else {
      $('.banner-button-container').css({width: '80vw'}) ;
    }
  })
});
