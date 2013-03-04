
	  // check if user is logged in by accessing sign in page
	  function loginVer() 
		{ 
		$.ajax
		({
		async: false,
		type: 'GET',
		url: 'https://pod.cscf.me/users/sign_in',
		success: function(data) 
		{
		var matches = data.match('You are already signed in.'); // regex to extract it,
		// if there are no matches, it must be a self message 
		tok = matches[1];
		result = tok;
		alert(result);
		}
		});	
		return result;
		}
	    var authenticity_token = getToken();
		//alert(authenticity_token);
		//alert(username);
		//alert(password);
	 // utf8=%E2%9C%93&authenticity_token=JVMo0sD9Qww93i58KCe98vrrZpuHKqYQ4CPO8RMFXAc%3D&user%5Busername%5D=sam&user%5Bpassword%5D=worth22&commit=Sign+in
	  
	  
	  