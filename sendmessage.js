// variable to hold request
var request;

// bind to the submit event of our form
$("#send").submit(function (event) {
    // abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
	var $form = $(this);
    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

	
	var token = getToken();
	var id = $('#id1').val();
	
	var subject = $('#subject1').val();
	var text = $('#text1').val();
	var utf = "%E2%9C%93";
	var cont = "";
	var com = "Send";
	
	var recipientID = checkRecipient(id);
	
	var data = new FormData();
	data.append('utf8',utf);
	data.append('contact_autocomplete',cont);
	data.append('contact_ids', recipientID);
	data.append('conversation[subject]', subject);
	data.append('conversation[text]', text);
	data.append('commit',com);
	data.append('authenticity_token', token);

    // post the data
    var request = $.ajax
	({
        url: "https://pod.cscf.me/conversations",
        type: "post",
		data:  data,

		processData:false,
	    contentType: false,
		async:false,
    });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () 
	{
        // reenable the inputs
        $inputs.prop("disabled", false);
    });

    // prevent default posting of form
    event.preventDefault();
});


 function getToken() 
 {       
	$.ajax
	({
        async: false,
        type: 'GET',
        url: 'https://pod.cscf.me/conversations',
        success: function(data) 
		{
			var matches = data.match(/<meta content="(.*)" name="csrf-token" \/>/); // regex to extract it,
			// if there are no matches, it must be a self message 
			tok = matches[1];
			result = tok;
		}
	});	
	return result;
}

function checkRecipient(ID)
{
	$.ajax
	({	
        async: false,
		type: 'GET',
        url: 'https://pod.cscf.me/conversations/new',
        success: function(data) 
		{
			var matches;
			var name;
			var regex = /{\\"value\\":\\"([^"]*)\\",\\"name\\":\\"([^"]*)\\"}/g			//need to sort out the REGEX so it goes through each name and ID seeing if it equals ID
			while ((matches = regex.exec(data)) !== null)
			{
				console.log(matches);
				var name = matches[2];
				if(name == ID)
				{
					result = matches[1];
				}
				else
				{
					console.log("FAIL");
					//this sends a message to me only
					//need to add error trapping saying recipient cannot be found!
				}
			}
		}
		
    });

	return result;
}