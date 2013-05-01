	
	
		$("#decrypt").click(function()
			{
			var message = $('#ContentArea').text();
			var password = $('#pass').val();
			//Decrypt message prior to posting back to content area
			try {
				var decrypted = sjcl.decrypt(password, message);
				$('#ContentArea').css("background-color", "#c4ffc9");
			    $('#ContentArea').html(decrypted); 
			}
			catch(err)
			{
			alert('Your password is incorrect!');
			}
				

			//message.text(decrypted);
			}
			);
