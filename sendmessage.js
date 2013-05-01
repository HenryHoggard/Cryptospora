// global variable to hold request
window.onload = function() 
{		
	var input = document.getElementById('file');
	input.addEventListener('change', importImage);
};

var importImage = function(e) 
{
	var reader = new FileReader();

    reader.onload = function(event) 
	{
        // set the preview
        document.getElementById('preview').style.display = 'block';
        document.getElementById('preview').src = event.target.result;

        // wipe all the fields clean
       document.getElementById('message').value = '';
        document.getElementById('password').value = '';
        /*document.getElementById('password2').value = '';
        document.getElementById('messageDecoded').innerHTML = '';*/

        // read the data into the canvas element
        var img = new Image();
        img.onload = function() {
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.canvas.width = img.width;
            ctx.canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            decode();
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(e.target.files[0]);
	}

var request;
var tok;
var matches;
var name;
var regex = /{\\"value\\":\\"([^"]*)\\",\\"name\\":\\"([^"]*)\\"}/g	
var steganography = false;
var encryption = false;
var maxMessageSize = 1000;

// bind to the submit event of our form
$("#send").submit(function (event) 
{
    // abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
	var $form = $(this);
    // select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");
	var token = getToken();
	var id = $('#id').val();
	var subject = $('#subject').val();
	var text = $('#textarea').val();
	var utf = "%E2%9C%93";
	var cont = "";
	var com = "Send";
	var recipientID = "";
	//run the checkRecipient function and parse through the ID from the form
	recipientID = checkRecipient(id);
	
	//if the recipient is found
	if (recipientID != "notfound")
	{
		//if the steganography radio button is checked
		if (steganography == true && encryption == false)
		{
			//get the value from the stegpassword text field
			var stegPassword = $('#password').val();
			//if the password is found run steganography
			if (stegPassword)
			{
			
			
			
			
			
			
			
			
			
			
			
			
	
	var imageText = encode();
	
				var data = new FormData();
				data.append('utf8',utf);
				data.append('contact_autocomplete',cont);
				data.append('contact_ids', recipientID);
				data.append('conversation[subject]', subject);
				data.append('conversation[text]', '![image](' +imageText+')');
				data.append('commit',com);
				data.append('authenticity_token', token);
				//runs sendmessage function and parses through data
				sendMessage(data);

			
			
			
			
			
			
			
			
			
				console.log("STEGO IT");
			}
			//if there is no password output error telling user
			else
			{
				console.log("Please enter a password for Steganography");
				//reset the form
				//$('#send')[0].reset();
			}
		}
		//if the encryption radio button is checked
		else if (steganography == false && encryption == true)
		{
			//get the value from the stegpassword text field
			var encryptPassword = $('#encryptpass').val();
			//if the password is found run encryption
			if (encryptPassword)
			{	
				console.log("Encrypted Message Sent");
				text =  encryptMessage(encryptPassword, text);
				var data = new FormData();
				data.append('utf8',utf);
				data.append('contact_autocomplete',cont);
				data.append('contact_ids', recipientID);
				data.append('conversation[subject]', subject);
				data.append('conversation[text]', text);
				data.append('commit',com);
				data.append('authenticity_token', token);
				//runs sendmessage function and parses through data
				sendMessage(data);
			}
			else
			{
				console.log("Please enter a password for Encyption");
				//$('#send')[0].reset();
			}
		}
		else
		{
			console.log("Message Sent");
			var data = new FormData();
			data.append('utf8',utf);
			data.append('contact_autocomplete',cont);
			data.append('contact_ids', recipientID);
			data.append('conversation[subject]', subject);
			data.append('conversation[text]', text);
			data.append('commit',com);
			data.append('authenticity_token', token);
			sendMessage(data);

		}
	}	
	else
	{
		console.log("Could not find Username or Pod address please try again");
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

function encryptMessage(password, text) 
{
	var encrypted = sjcl.encrypt(password,text);
	console.log(encrypted);
	//encrypted =jQuery.parseJSON(encrypted);
	var decrypted = sjcl.decrypt(password, encrypted);
	console.log("decrypt" + decrypted);
	return encrypted;
}

function sendMessage(data)
{
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

	//$('#send')[0].reset();
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
		$("#file").show();
		$("#password").show();
		$("#encryptpass").hide();
		steganography = true;
		encryption = false;
	}
	else if ($(this).val()=="encrypt")
	{
		$("#file").hide();
		$("#password").hide();
		$("#encryptpass").show();
		steganography = false;
		encryption = true;

	}
	else
	{
		$("#file").hide(); 
		$("#password").hide(); 
		$("#encryptpass").hide(); 
		steganography = false;
		encryption = false;
	}
});

// encode the image and save it
function encode() {
    var message = document.getElementById('message').value;
    var password = document.getElementById('password').value;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // encrypt the message with supplied password if necessary
    if (password.length > 0) {
        message = sjcl.encrypt(password, message);
    } else {
        message = JSON.stringify({'text': message});
    }

    // exit early if the message is too big for the image
    var pixelCount = ctx.canvas.width * ctx.canvas.height;
    if ((message.length + 1) * 16 > pixelCount * 4 * 0.75) {
        alert('Message is too big for the image.');
        return;
    }

    // exit early if the message is above an artificial limit
    if (message.length > maxMessageSize) {
        alert('Message is too big.');
        return;
    }

    // encode the encrypted message with the supplied password
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    encodeMessage(imgData.data, sjcl.hash.sha256.hash(password), message);
    ctx.putImageData(imgData, 0, 0);

    // view the new image
    //window.locatio = canvas.toDataURL();
	var hiddenImage = canvas.toDataURL();
	console.log(hiddenImage);
	return hiddenImage;
};

// decode the image and display the contents if there is anything
var decode = function() {
    var password = document.getElementById('password').value;
    var passwordFail = 'Password is incorrect or there is nothing here.';

    // decode the message with the supplied password
    var ctx = document.getElementById('canvas').getContext('2d');
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var message = decodeMessage(imgData.data, sjcl.hash.sha256.hash(password));

    // try to parse the JSON
    var obj = null;
    try {
        obj = JSON.parse(message);
    } catch (e) {
        // display the "choose" view

       // document.getElementById('choose').style.display = 'block';
        //document.getElementById('reveal').style.display = 'none';

        if (password.length > 0) {
            alert(passwordFail);
        }
    }

    // display the "reveal" view
    if (obj) {
        document.getElementById('choose').style.display = 'none';
        document.getElementById('reveal').style.display = 'block';

        // decrypt if necessary
        if (obj.ct) {
            try {
                obj.text = sjcl.decrypt(password, message);
            } catch (e) {
                alert(passwordFail);
            }
        }

        // escape special characters
        var escChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;',
            '\n': '<br/>'
        };
        var escHtml = function(string) {
            return String(string).replace(/[&<>"'\/\n]/g, function (c) {
                return escChars[c];
            });
        };
        document.getElementById('messageDecoded').innerHTML = escHtml(obj.text);
    }
};

// returns a 1 or 0 for the bit in 'location'
var getBit = function(number, location) {
   return ((number >> location) & 1);
};

// sets the bit in 'location' to 'bit' (either a 1 or 0)
var setBit = function(number, location, bit) {
   return (number & ~(1 << location)) | (bit << location);
};

// returns an array of 1s and 0s for a 2-byte number
var getBitsFromNumber = function(number) {
   var bits = [];
   for (var i = 0; i < 16; i++) {
       bits.push(getBit(number, i));
   }
   return bits;
};

// returns the next 2-byte number
var getNumberFromBits = function(bytes, history, hash) {
    var number = 0, pos = 0;
    while (pos < 16) {
        var loc = getNextLocation(history, hash, bytes.length);
        var bit = getBit(bytes[loc], 0);
        number = setBit(number, pos, bit);
        pos++;
    }
    return number;
};

// returns an array of 1s and 0s for the string 'message'
var getMessageBits = function(message) {
    var messageBits = [];
    for (var i = 0; i < message.length; i++) {
        var code = message.charCodeAt(i);
        messageBits = messageBits.concat(getBitsFromNumber(code));
    }
    return messageBits;
};

// gets the next location to store a bit
var getNextLocation = function(history, hash, total) {
    var pos = history.length;
    var loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
    while (true) {
        if (loc >= total) {
            loc = 0;
        } else if (history.indexOf(loc) >= 0) {
            loc++;
        } else if ((loc + 1) % 4 === 0) {
            loc++;
        } else {
            history.push(loc);
            return loc;
        }
    }
};

// encodes the supplied 'message' into the CanvasPixelArray 'colors'
var encodeMessage = function(colors, hash, message) {
    // make an array of bits from the message
    var messageBits = getBitsFromNumber(message.length);
    messageBits = messageBits.concat(getMessageBits(message));

    // this will store the color values we've already modified
    var history = [];

    // encode the bits into the pixels
    var pos = 0;
    while (pos < messageBits.length) {
        // set the next color value to the next bit
        var loc = getNextLocation(history, hash, colors.length);
        colors[loc] = setBit(colors[loc], 0, messageBits[pos]);

        // set the alpha value in this pixel to 255
        // we have to do this because browsers do premultiplied alpha
        // see for example: http://stackoverflow.com/q/4309364
        while ((loc + 1) % 4 !== 0) {
            loc++;
        }
        colors[loc] = 255;

        pos++;
    }
};

// returns the message encoded in the CanvasPixelArray 'colors'
var decodeMessage = function(colors, hash) {
    // this will store the color values we've already read from
    var history = [];

    // get the message size
    var messageSize = getNumberFromBits(colors, history, hash);

    // exit early if the message is too big for the image
    if ((messageSize + 1) * 16 > colors.length * 0.75) {
        return '';
    }

    // exit early if the message is above an artificial limit
    if (messageSize === 0 || messageSize > maxMessageSize) {
        return '';
    }

    // put each character into an array
    var message = [];
    for (var i = 0; i < messageSize; i++) {
        var code = getNumberFromBits(colors, history, hash);
        message.push(String.fromCharCode(code));
    }

    // the characters should parse into valid JSON
    return message.join('');
};