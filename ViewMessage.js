// Populate view message with a message in Diaspora inbox



var username = '';
var subject = '';


$.getJSON("https://pod.cscf.me/conversations.json", function(json) {

	        $.each(json, function(arrayID,message) {
            $.each(message, function() {
                // for every message, extract author of message,


				$.ajax({
				async: true,
				type: 'GET',
				url: 'https://pod.cscf.me/conversations/' +message.conversation.id,
				success: function(data) {
								var matches = data.match(/" class='author from' >(.*)<\/a>/); // regex to extract it,
								// if there are no matches, it must be a self message 
								if (matches != null) {
									username = matches[1];
								}
								else {
									username = "Me";   
								}
					
				subject =  message.conversation.subject;
				
					
					
					
				document.getElementById('testSubject').value = subject;
			}
			}				
					