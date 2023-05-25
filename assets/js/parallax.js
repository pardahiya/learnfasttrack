//
// aos.js
// Theme module
//

'use strict';

(function() {

    //
    // Functions
    //

    function Parallaxinit() {
        var element = document.querySelectorAll('.cs-parallax');

        for (var i = 0; i < element.length; i++) {
            var parallaxInstance = new Parallax(element[i]);
        }
    }


    //
    // Events
    //

    if (typeof Parallax !== 'undefined') {
        Parallaxinit();
    }

})();
