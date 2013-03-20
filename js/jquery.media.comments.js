/*
 *  Project: jQuery Media Comments
 *  Description: jQuery pluggin to add media query functionality to HTML comments
 *  Author: Steve Podmore (https://twitter.com/StevenPodmore)
 *  License: MIT
 */

;(function ( $, window, document, undefined ) {

    var 
    mediacomments = "mediacomments",
    defaults = {
        timeout: 500 //milliseconds to watch for window changes
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = mediacomments;
        this.init();
    };

    Plugin.prototype = {

        init: function() {
            var $this = this;
            if(!$($this.element).attr('id')){
                $($this.element).attr('id',this.randString(10))
            }
            var wait = false;
            $(window).resize(function(){
                if(wait !== false){
                    clearTimeout(wait);
                }
                wait = setTimeout(function(){
                    $this.doQuery($this.element, $this.options);
                }, $this.options.timeout);
            });
            $(window).trigger('resize');
        },

        doQuery: function(el,opts){
            var $this = this;
            var els = $(el)
            var nodes = this.getComments(els.get(0));
            $(nodes).each(function(i,e){ 
                var mq = this.nodeValue.match(/[^\r\n]+/g)[0];
                if(mq.match(/@media/g)){
                    var mql = window.matchMedia($.trim(mq.replace(/@media/g,'')))
                    var exists = $('#mc' + $($this.element).attr('id') + i).length==0;
                    if(mql.matches && exists){
                        var html = $.parseHTML(this.nodeValue.replace(mq,''));
                        $(html).attr('id','mc' + $($this.element).attr('id') + i).insertAfter(this);
                    }
                    if(!mql.matches){
                        $('#mc' + $($this.element).attr('id') + i).remove();
                    }
                }
            });
        },

        getComments: function(node) {
            var textNodes = [];
            function getTextNodes(node) {
                if (node.nodeType == 8) {
                    textNodes.push(node);
                } else {
                    for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                        getTextNodes(node.childNodes[i]);
                    }
                }
            }
            getTextNodes(node);
            return textNodes;
        },

        randString: function(n){
            if(!n){
                n = 5;
            }
            var text = '';
            var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            for(var i=0; i < n; i++){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

    };



    $.fn[mediacomments] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + mediacomments)) {
                $.data(this, "plugin_" + mediacomments, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );