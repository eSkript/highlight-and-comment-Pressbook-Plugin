$(function () {
	$(document).ready(function () {
        console.log(highlight_vars);
		highlighterMenu();
        showAllHighlightsButton();
	});
    
    function load_highlights() {
        var data = {
            'action': 'load_all_highlights',
            'progNonce': highlight_vars.ajax_nonce
        };

        jQuery.post(highlight_vars.ajax_url, data, function (response) {
            //console.log(response);
            //console.log(JSON.parse(response));
            displayHighlights(JSON.parse(response));
        });
    }
    
    function showAllHighlightsButton(){
        $("#show_highlights").click(load_highlights);
    }
    
    function displayHighlights(data){
        $("#highlight_summary").remove();
            
        $("#highlight_settings").append("<div id='highlight_summary'></div>");
        
        $.each(data,function(chapter,highlight){
            highlight_object = JSON.parse(highlight['data']);
            
            highlight_element(highlight['titel'],highlight['link'],highlight_object);
        });
    }
    
    function highlight_element(chapter,link,highlight){
        //console.log(highlight);
        $("#highlight_summary").append('<div class="highlight_element" data-link="'+link+'"><h4>'+chapter+'</h4></div>');
        
        var this_element = $("#highlight_summary .highlight_element").last();
        
        var last_timestamp = 0;
        
        $.each(highlight,function(index,element){
            var data_timestamp = $($.parseHTML(element[0])[0]).data('timestamp');
            
            this_element.append('<p data-timestamp="'+data_timestamp+'">'+element[1]+'</p>');
            
            this_element.find('p').last().click(function(event){
                follow_highlight(link,data_timestamp);
            }).css( 'cursor', 'pointer' );
            
            if(last_timestamp != data_timestamp && last_timestamp != 0){
                this_element.find('p').last().css('border-top','thin solid gray');
            }
            last_timestamp = data_timestamp;
        });
    }
    
    function follow_highlight(link,timestamp){
        window.location = link+"?highlight_ref="+timestamp;
    }
	
	function highlighterMenu() {
        if($("#user_settings").length>0){
           $("#user_settings").append('<div id="highlight_settings"><p><label><input type="checkbox" id="highlight_activate" name="activate" value="activate" checked>use highlighter</label>&emsp;<button id="show_highlights">show all highlights</button></p></div>');
        }else{ //for downwards compadibility
            $(".third-block-wrap").append('<div class="third-block clearfix"><h2>Highlighter</h2><p><label><input type="checkbox" id="highlight_activate" name="activate" value="activate" checked>use highlighter</label></p></div><p></p>');
        }


		if (highlight_vars.settings.indexOf("false") != -1) {
			$("#highlight_activate").prop('checked', false);
			$("#show_highlights").hide();
		}

		$("#highlight_activate").change(function () {
            if (this.checked) {
				$("#show_highlights").show();
			} else {
				$("#show_highlights").hide();
                $("#highlight_summary").hide();
			}

			var data = {
				'action': 'highlight_save_settings',
				'progNonce': highlight_vars.ajax_nonce,
				'active': $(this).is(':checked')
			};

			//console.log(data);

			jQuery.post(highlight_vars.ajax_url, data, function (response) {
				//console.log(response);
				if (response <= 0) {
					console.warn("failed to save");
					console.log(data);
					console.log(response);
				}
			});
		});
	}
});
