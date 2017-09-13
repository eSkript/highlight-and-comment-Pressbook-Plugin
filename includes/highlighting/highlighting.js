$(function() {
    console.log(highlight_vars);
    var myHighlighter;
    
    if(window.location.href.indexOf("chapter") != -1 && highlight_vars.logged_in){
        setupHighlighter();
    }
    

    function setupHighlighter(){
        $(".entry-content").attr('id', 'highlighter_content');
        var my_content = document.getElementById('highlighter_content');
        myHighlighter = new TextHighlighter(my_content,{onAfterHighlight: function(arr, element) {afterHighlight(arr, element);}});
        loadStoredHighlights();
        //TODO markup for loaded highlights
    }
    
    function afterHighlight(arr, element){
        //console.log(element);
        var respecticeTimestamp = element[0].outerHTML.split("data-timestamp=")[1].split("\"")[1];
        
        doMarkup(respecticeTimestamp);
        
        storeHighlights();
    }
    
    function removeHighlight(timestamp){
        $("span[data-timestamp='"+timestamp+"']").find("a.delete_highlight").remove();
        $("span[data-timestamp='"+timestamp+"']").contents().unwrap();
        storeHighlights();
    }
    
    function loadStoredHighlights() {
        //console.log(highlight_vars.highlight_data);
        myHighlighter.deserializeHighlights(highlight_vars.highlight_data);
        
        var all_timestamps = Array();
        $("span.highlighted").each(function(i,element){
            if($.inArray($(element).data("timestamp"),all_timestamps) == -1){
                all_timestamps.push($(element).data("timestamp"));
            }
        });
        
        $.each(all_timestamps,function(i,value){
            doMarkup(value);
        });
        
    }

    function storeHighlights() {
        
        //replace escapted \" because php removes these
        var serializedHighlights = myHighlighter.serializeHighlights().replace(/\\"/g,"'");
        
        //console.log(serializedHighlights);
    
        var data = {
            'action': 'highlight_save_highlights',
            'progNonce' : highlight_vars.ajax_nonce,
            'book_id' : highlight_vars.book_id,
            'chapter_id' :highlight_vars.chapter_id,
            'highlight_data' : serializedHighlights
        };

        console.log(data);

        jQuery.post(highlight_vars.ajax_url, data, function(response) {
            console.log('Got this from the server: ' + response);
        });
        //TODO ajax save highlights
    }
    
    function doMarkup(timestamp){
        $("span[data-timestamp='"+timestamp+"']").hover(function() {
            $("span[data-timestamp='"+timestamp+"']").addClass("hover");
            $("span[data-timestamp='"+timestamp+"'] a").removeClass("hidden");
        }, function() {
            $("span[data-timestamp='"+timestamp+"']").removeClass("hover");
            $("span[data-timestamp='"+timestamp+"'] a").addClass("hidden");
        });

        $("span[data-timestamp='"+timestamp+"']").last().append("<a href='javascript:alert('test');' class='delete_highlight hidden' alt='Delete'><div><img src='"+highlight_vars.media_url+"minus.png"+"'></div></a>");

        $("span[data-timestamp='"+timestamp+"']").last().find("a.delete_highlight").click( function(e) {e.preventDefault(); removeHighlight(timestamp); return false; } );
    }
    
    //helper functions 
    Array.prototype.last = function() {return this[this.length-1];}

});