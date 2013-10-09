(function(window) {

    // add event helper
    function addEvent(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        }
    }

    function cornifyThisGuy() {
        var script = document.createElement('script');
        script.src = 'http://www.cornify.com/js/cornify.js';
        if (window.console) {
            window.console.log('YAY! You hot-linked desandro.com/mint/?js! Prepare for unicorns!');
        }
        window.onload = function() {
            document.body.appendChild(script);

            var isFirstCornified = false;

            function cornifyAgain() {
                if (window.cornify_add) {
                    window.cornify_add();
                    window.cornify_add();
                    window.cornify_add();
                    isFirstCornified = true;
                }
                // keep trying it until it happens
                if (!isFirstCornified) {
                    setTimeout(cornifyAgain, 1000);
                }
            }
            cornifyAgain();

            if (window.cornify_add) {
                window.cornify_add();
            }
            // cornify with every click
            addEvent(document, 'click', function(event) {
                if (window.cornify_add) {
                    event.preventDefault();
                    event.stopPropagation();
                    window.cornify_add();
                }
            });
        }
    }

    // warn all non-desandro/metafizzy urls
    var hostname = window.location && window.location.hostname;
    if (hostname && (hostname.indexOf('desandro') === -1 && hostname.indexOf('metafizzy') === -1)) {
        // cornifyThisGuy();
        var console = window.console
        if (console) {
            console[console.warn ? 'warn' : 'log']('Hey there! Please remove http://desandro.com/mint/?js in your HTML. It is dangerously filled with unicorns. Thanks!');
        }
        // return;
    }

    var Mint = new Object();
    Mint.save = function() {
        var now = new Date();
        var debug = false; // this is set by php
        if (window.location.hash == '#Mint:Debug') {
            debug = true;
        };
        var path = 'http://desandro.com/mint/?record&key=3033764b703838716c634d783433474b4a726e6469674b35363331';
        path = path.replace(/^https?:/, window.location.protocol);

        // Loop through the different plug-ins to assemble the query string
        for (var developer in this) {
            for (var plugin in this[developer]) {
                if (this[developer][plugin] && this[developer][plugin].onsave) {
                    path += this[developer][plugin].onsave();
                };
            };
        };
        // Slap the current time on there to prevent caching on subsequent page views in a few browsers
        path += '&' + now.getTime();

        // Redirect to the debug page
        if (debug) {
            window.open(path + '&debug&errors', 'MintLiveDebug' + now.getTime());
            return;
        };

        var ie = /*@cc_on!@*/ 0;
        if (!ie && document.getElementsByTagName && (document.createElementNS || document.createElement)) {
            var tag = (document.createElementNS) ? document.createElementNS('http://www.w3.org/1999/xhtml', 'script') : document.createElement('script');
            tag.type = 'text/javascript';
            tag.src = path + '&serve_js';
            document.getElementsByTagName('head')[0].appendChild(tag);
        } else if (document.write) {
            document.write('<' + 'script type="text/javascript" src="' + path + '&amp;serve_js"><' + '/script>');
        };
    };
    if (!Mint.SI) {
        Mint.SI = new Object();
    }
    Mint.SI.Referrer = {
        onsave: function() {
            var encoded = 0;
            if (typeof Mint_SI_DocumentTitle == 'undefined') {
                Mint_SI_DocumentTitle = document.title;
            } else {
                encoded = 1;
            };
            var referer = (window.decodeURI) ? window.decodeURI(document.referrer) : document.referrer;
            var resource = (window.decodeURI) ? window.decodeURI(document.URL) : document.URL;
            return '&referer=' + escape(referer) + '&resource=' + escape(resource) + '&resource_title=' + escape(Mint_SI_DocumentTitle) + '&resource_title_encoded=' + encoded;
        }
    };
    Mint.save();
})(window);
