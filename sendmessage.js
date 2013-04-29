// variable to hold request
var request;
var tok;
var matches;
var name;
var regex = /{\\"value\\":\\"([^"]*)\\",\\"name\\":\\"([^"]*)\\"}/g			//need to sort out the REGEX so it goes through each name and ID seeing if it equals ID
var steganography = false;
var encryption = false;

// bind to the submit event of our form
$("#send").submit(function (event) 
{
    // abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
	var $form = $(this);
    // let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
	var token = getToken();
	var id = $('#id').val();
	var subject = $('#subject').val();
	var text = $('#textarea').val();
	var utf = "%E2%9C%93";
	var cont = "";
	var com = "Send";
	var recipientID = "";
	recipientID = checkRecipient(id);
	
	if (recipientID != "notfound")
	{
		if (steganography == true && encryption == false)
		{
			var stegPassword = $('#stegpass').val();
			if (stegPassword)
			{
			
			
				alert("STEGO IT");
			}
			else
			{
				alert("Please enter a password for Steganography");
				$('#send')[0].reset();
			}
		}
		else if (steganography == false && encryption == true)
		{
			var encryptPassword = $('#encryptpass').val();
			if (encryptPassword)
			{
			
			
				alert("ENCRYPT IT");
			}
			else
			{
				alert("Please enter a password for Encyption");
				$('#send')[0].reset();
			}
		}
		else
		{
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
			alert("Message Sent");
			$('#send')[0].reset();
		}
	}	
	else
	{
		alert("Could not find Username or Pod address please try again");
	}
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
		}
	});	
	return tok;
}

function encryptMessage(password, text) {
    var encrypted = sjcl.encrypt(password,text);
    console.log(encrypted);
  //  encrypted =jQuery.parseJSON(encrypted);
    var decrypted = sjcl.decrypt(password, encrypted);
    console.log("decrypt" + decrypted);
    return encrypted;
    

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
			result = "notfound";
			while ((matches = regex.exec(data)) !== null)
			{
				var name = matches[2];
				if(name == ID)
				{
					result = matches[1];
				}
			}
		}	
    });

	return result;
}

$("input[type='radio']").change(function()
{
   
	if ($(this).val()=="steg")
	{
		$("#image").show();
		$("#stegpass").show();
		$("#encryptpass").hide();
		steganography = true;
		encryption = false;
	}
	else if ($(this).val()=="encrypt")
	{
		$("#image").hide();
		$("#stegpass").hide();
		$("#encryptpass").show();
		steganography = false;
		encryption = true;

	}
	else
	{
		$("#image").hide(); 
		$("#stegpass").hide(); 
		$("#encryptpass").hide(); 
		steganography = false;
		encryption = false;
	}
});