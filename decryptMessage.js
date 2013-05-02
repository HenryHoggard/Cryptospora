/*

We have used the following code to help us with the steganography of the images below are the relevant links

https://github.com/oakes/PixelJihad/blob/master/UNLICENSE
https://github.com/oakes/PixelJihad/blob/master/README
https://github.com/oakes/PixelJihad

*/

var maxMessageSize = 1000;       
	
$("#decrypt").click(function()
{
	var message = $('#ContentArea').text();
	var password = $('#pass').val();
	//Decrypt message prior to posting back to content area
	try 
	{
		var decrypted = sjcl.decrypt(password, message);
		$('#ContentArea').css("background-color", "#c4ffc9");
		$('#ContentArea').html(decrypted);
	}
	catch(err)
	{
	console.log('Your password is incorrect!');
	}
});


$("#desteg").click(function()
{
	destego();
	$("#preview").hide();
});

function destego() 
{
    var pic = ($('img[alt="image"]').attr('src'));
    var img2 = ($('img[alt="image"]'));
    var reader =  '<img src="'+pic+'">';
 
    document.getElementById('preview').style.display = 'block';
    document.getElementById('preview').src = pic;
 
	// read the data into the canvas element
	var img = new Image();
	img.src=pic;
	console.log(img);     
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.canvas.width = img.width;
	ctx.canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	decode();
};
 
// encode the image and save it
 
// decode the image and display the contents if there is anything
var decode = function() 
{
   // var password = document.getElementById('pass').value;
    var password = $("#pass").val();
    var passwordFail = 'Password is incorrect or there is nothing here.';
    console.log(password);
    // decode the message with the supplied password
    var ctx = document.getElementById('canvas').getContext('2d');
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log(sjcl.hash.sha256.hash(password));
    var message = decodeMessage(imgData.data, sjcl.hash.sha256.hash(password));
    // try to parse the JSON
    var obj = null;
    console.log(imgData);
       
        console.log("message" +message);
    try {
        obj = JSON.parse(message);
    } catch (e) {
        // display the "choose" view
 
        if (password.length > 0) {
            console.log(passwordFail);
        }
    }
    // display the "reveal" view
    if (obj) {
 
        // decrypt if necessary
        if (obj.ct) {
            try {
                obj.text = sjcl.decrypt(password, message);
            } catch (e) {
                console.log(passwordFail);
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
        $('#ContentArea').css('background-color', '#c4ffc9');
        document.getElementById('ContentArea').innerHTML = escHtml(obj.text);
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
 
// returns the message encoded in the CanvasPixelArray 'colors'
var decodeMessage = function(colors, hash) 
{
    // this will store the color values we've already read from
    var history = [];
 
    // get the message size
    var messageSize = getNumberFromBits(colors, history, hash);
 
    // exit early if the message is too big for the image
    if ((messageSize + 1) * 16 > colors.length * 0.75) 
	{
        return '';
    }
 
    // exit early if the message is above an artificial limit
    if (messageSize === 0 || messageSize > maxMessageSize) 
	{
        return '';
    }
 
    // put each character into an array
    var message = [];
    for (var i = 0; i < messageSize; i++) 
	{
        var code = getNumberFromBits(colors, history, hash);
        message.push(String.fromCharCode(code));
    }
 
    // the characters should parse into valid JSON
    return message.join('');
};