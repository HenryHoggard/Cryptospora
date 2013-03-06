$(function UserLogin() {

			var loginVerify = "";
			$.ajax
			({
			async: false,
			type: 'GET',
			url: 'https://pod.cscf.me/users/sign_in',
			success: function(data) 
			{
			var matches = data.match(/You are already signed in./); // regex to extract it,

			if(matches == "You are already signed in.")
			{
		
				loginVerify = "0";
				window.location.replace("inbox.html");
				//alert(loginVerify);
			}
			else
			{
				loginVerify = "1";
				//alert(loginVerify);
			}
			}
			});	
			return loginVerify;
			
});
