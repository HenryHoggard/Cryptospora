var  to =  document.getElementsByName('username')
var subject = document.getElementsByName('title')
var content = document.getElementsByName('content')

$("sendmessage").click(function(data){
			$.POST("wk3.org/conversations", {
				"authenticity_token":"vGShXUOy4i5C/z53CFCs/zmLfpwUMPewekY/uXTb/hI=",
				"contact_autocomplete": "",
				"contact_ids": " ,,16633",
				"conversation[subject]": " It Worked!",
				"conversation[text]": " hahah",
				"commit":"Send",
		});
    });
