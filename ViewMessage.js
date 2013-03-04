// Populate view message with a message in Diaspora inbox
 
 
 
var username = '';
var subject = '';
var dateTime = '';
var content= ''; 
var replyMessage='';

var token = getToken();

// variable to hold request
var request;
 
$.getJSON("https://pod.cscf.me/conversations.json", function(json) {
    $.each(json, function(arrayID,message) {
        $.each(message, function() {
                // for every message, extract author of message,
        $.ajax({
            async: true,
            type: 'GET',
            url: 'https://pod.cscf.me/conversations/' +message.conversation.id,
            success: function(data) {
                var matches = data.match(/" class='author from' >(.*)<\/a>/); // regex to extract it,																			// if there are no matches, it must be a self message
				var matches2 = data.match(/<div class='ltr'>\n<p>(.*)<\/p>/); //regex to extract message content,
                if (matches != null) {
                    username = matches[1];
                }
                else {
                     username = "Me";
                }
           
        subject = message.conversation.subject;
		username = username;
		dateTime = message.conversation.updated_at;
		content = matches2[1]; 
 
 
 
        document.getElementById('testSubject').value = subject;
		document.getElementById('userField').value = username;
		document.getElementById('dateTime').value = dateTime;
		document.getElementById('ContentArea').value = content;
		
		//Grab content of new reply message 
		document.getElementById('contentReply').value = replyMessage;
		
		var request1

		// bind to the submit event of our form
		$("#send").submit(function(event){
			// abort any pending request
			if (request1) {
				request1.abort();
			}
			// setup some local variables
			var $form = $(this);
			// let's select and cache all the fields
			var $inputs = $form.find("input, select, button, textarea");
			
			var utf = "%E2%9C%93"; 
			var token = getToken();
			var replyContent = $('#contentReply').val();
			var reply = "Reply";
			var data = new FormData();
			data.append('utf8', utf);
			data.append('authenticity_token', token);
			data.append('message[text]', replyContent);
			data.append('commit', reply);
			
			 // fire off the request to /form.php
				var request1 = $.ajax({
					url: 'https://pod.cscf.me/conversations/9/messages',
					type: "post",
					data: data,
					
					processData: false,
					contentType: false,
					async: false,

				});

				// callback handler that will be called regardless
				// if the request failed or succeeded
				request.always(function () {
					// reenable the inputs
					$inputs.prop("disabled", false);
				});

				// prevent default posting of form
				event.preventDefault();
			});
                                   }
								   });       
 
        });
    });
	
});

function getToken() 
{ 
$.ajax({
			async: false,
			type: 'GET',
			url: 'https://pod.cscf.me/conversations',
			success: function(data) {
				var matches = data.match(/<meta content="(.*)" name="csrf-token" \/>/); // regex to extract it,
				// if there are no matches, it must be a self message 
				tok = matches[1];
				result = tok;
				}
			});	
		return result;
	}		

var url = $.url(true).fparam('messageid');
console.log(url);	
