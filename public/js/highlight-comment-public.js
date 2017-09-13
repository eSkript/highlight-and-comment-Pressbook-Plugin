(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
    
    $(function() {
       console.log("highlight data:");
	   console.log(highlight_vars);
	});

})( jQuery );

$(document).on("mouseup", function (e) {
    var selected = getSelection();
    selected.removeAllRanges();
    var range = selected.getRangeAt(0);
    console.log(range);
    console.log(selected.toString());
    
    for(var i=0; i<selected.rangeCount; i++) {
        var range = selected.getRangeAt(i);
        var parent = range.commonAncestorContainer;
        var b = document.createElement('b');
        if(parent.nodeType == 3) {
            range.surroundContents(b);
        } else {
            var content = range.extractContents();
            b.appendChild(content);
            range.insertNode(b);
        }
    }
    
    if(selected.toString().length > 1){
        var newNode = document.createElement("span");
        newNode.setAttribute("class", "red");
        range.surroundContents(newNode);       
    }
    selected.removeAllRanges();
 });

function getSelection() {
    var seltxt = '';
     if (window.getSelection) { 
         seltxt = window.getSelection(); 
     } else if (document.getSelection) { 
         seltxt = document.getSelection(); 
     } else if (document.selection) { 
         seltxt = document.selection.createRange().text; 
     }
    else return;
    return seltxt;
}

function save_highlights(){
    
    var highlights_to_save = Array();
    
    var data = {
        'action': 'highlight_save_highlights',
        'progNonce' : highlight_vars.ajax_nonce,
		'book_id' : highlight_vars.book_id,
		'chapter_id' :highlight_vars.chapter_id,
        'highlights' : highlights_to_save
    };
    
    console.log(data);
    
    jQuery.post(highlight_vars.ajax_url, data, function(response) {
		console.log('Got this from the server: ' + response);
	});
}