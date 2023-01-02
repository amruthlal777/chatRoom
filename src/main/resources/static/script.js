var stompClient=null

function connect()
{
	let socket = new SockJS("/server1")
	
	stompClient = Stomp.over(socket)
	
	stompClient.connect({},function(frame){
		
		console.log("connected"+frame);
		
		$("#name-form").addClass('d-none')
		$("#chat-room").removeClass('d-none')
		
		stompClient.subscribe("/topic/return-to",function(response){
			
			showMessage(JSON.parse(response.body))
		});
	});
	
}

function showMessage(message)
{
	$("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`)
}

function sendMessage()
{
	let jsonOb={
		name:localStorage.getItem("name"),
		content:$("#message-value").val()
		
	}
	
	stompClient.send("/app/message",{},JSON.stringify(jsonOb))
	
	$("#message-value").val('')
}
$(document).ready(e=>{
	
	$("#login").click(()=>{
		
		alert("enter")
		let name = $("#name-value").val();
		localStorage.setItem("name",name);
		
		connect();
	});
	
	$("#send-btn").click(()=>{
		
		sendMessage();
	}
	)
	
	$('.my-form').on('keydown', '#message-value', function (e) {
  		var key = e.which;
  		switch (key) {
  		case 13: 
    		sendMessage();
    		break;
  		default:
    		break;
  }
});

$('.login').on('keydown', '#name-value', function (e) {
  		var key = e.which;
  		switch (key) {
  		case 13: 
    				let name = $("#name-value").val();
		localStorage.setItem("name",name);
		
		connect();
    		break;
  		default:
    		break;
  }
});


	
})

