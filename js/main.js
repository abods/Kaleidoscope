/*

@TODO: Save settings to cookies
@TODO: Switch to angular?
@TODO: Add bootstrap
@TODO: Add ability to hide control panel
@TODO: Format control panel properly, add labels

 */

(function($) {

    $(document).ready(function() {

        $(this).on('mousemove', function(e)
        {
            if (K.animated === false)
                $(".kal_cont .ksc").css({backgroundPositionX: e.pageX+"px"});
        });

        var $path = $('#path'),
            $slices = $('#slices');

        K.resizeCanvas();
        K.generateLayout($slices.val());

        $path.on('change', function() {
            K.changeBackground($(this).val());
        });

        $slices.on('change', function() {
            K.generateLayout($(this).val());
        });

        $(window).on('resize', function() {
            K.resizeCanvas();
        });

        K.startAnimation();

        // Click to animate, click again to stop
        $(this).on('click', function(e) {
            K.toggleAnimation();
        });

    });

})(jQuery);

var K = {};
K.animated = false;
K.animation = {
    direction : '+=',
    speed : '+=300000'
};


K.toggleDirection = function()
{
    if (K.animation.direction === '+=') {
        K.animation.direction = '-=';
    } else {
        K.animation.direction = '+=';
    }
}

K.toggleAnimation = function()
{
    if (K.animated === false) {
        K.startAnimation();
    } else {
        K.stopAnimation();
    }
}

K.startAnimation = function()
{
    if (K.animated === false) {
        K.animated = true;
        $(".kal_cont .ksc").animate({
            'backgroundPositionY': K.animation.speed
        }, {
            duration: 7500000,
            easing: 'linear',
            done: function() {
//                K.enableAnimation();
                K.animated = false;
            }
        });
    }
}

K.stopAnimation = function() {
    $(".kal_cont .ksc").stop();
    K.animated = false;
}

// Resize kaleidoscope to fit the window
K.resizeCanvas = function ()
{
    var maxHeight = $(window).height();
    $('.kal_main').height(maxHeight);
};

// Change background image
K.changeBackground = function(path)
{
    $('.kal_cont .ksc').css({"background-image": 'url('+path+')'});
};

// Generate kaleidoscope layout with number of "slices"
K.generateLayout = function(numberOfElements)
{
    var html = [],
        degreeOffset = 360 / (numberOfElements*2);

    for (var x=1; x <= numberOfElements*2; x++)
    {
        var elClass = (x%2==0) ? 'even' : 'odd',
            rotate = degreeOffset * (x - (x%2) - 1),
            classes = ['ks', 'kSlice', elClass, 's'+x];

        var elStyle = '-webkit-transform: rotateZ('+rotate+'deg)';

        // HTML generation
        html.push('<div class="'+classes.join(" ")+'" style="'+elStyle+'"><div class="ksc"></div></div>');
    }

    // Populate the container
    document.getElementById('kContainer').innerHTML = html.join('');

    // Adding mirror effect to every other slice
    $('.ks.even').each(function() {
        var style = $(this).attr('style');
        $(this).attr('style', style + ' matrix(-1, 0, 0, 1, 0, 0)');
    });

    // Move slices into correct positions
    $('.kal_cont .ksc').css({'-webkit-transform' : 'rotateZ('+degreeOffset+'deg)'});
};
