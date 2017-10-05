$(function () {
	$(document).ready(function () {
		highlighterMenu()
		
	});
	
	function highlighterMenu() {
        if($("#user_settings").length>0){
           $("#user_settings").append('<div><p><label><input type="checkbox" id="highlight_activate" name="activate" value="activate" checked>use highlighter</label></p></div>');
        }else{ //for downwards compadibility
            $(".third-block-wrap").append('<div class="third-block clearfix"><h2>Highlighter</h2><p><label><input type="checkbox" id="highlight_activate" name="activate" value="activate" checked>use highlighter</label></p><p><button id="highlight_summary">show all highlights</button></p></div><p></p>');
        }


		if (highlight_vars.settings.indexOf("false") != -1) {
			$("#highlight_activate").prop('checked', false);
			//$("#highlight_summary").hide();
		}

		$("#highlight_activate").change(function () {
			/*
            if (this.checked) {
				$("#highlight_summary").show();
			} else {
				$("#highlight_summary").hide();
			}
            */

			var data = {
				'action': 'highlight_save_settings',
				'progNonce': highlight_vars.ajax_nonce,
				'active': $(this).is(':checked')
			};

			//console.log(data);

			jQuery.post(highlight_vars.ajax_url, data, function (response) {
				console.log(response);
				if (response <= 0) {
					console.warn("failed to save");
					console.log(data);
					console.log(response);
				}
			});
		});
	}
});
