# Introduction
•	This is a small, fast, and easy-to-use JavaScript library. <br>
•	The purpose behind creating this library is to simplify complex tasks like Ajax, HTML document traversal and manipulation, event handling, and form validation.
# Features
•	List of key features:<br>
•	Simplifies Ajax requests.<br>
•	Facilitates HTML document traversal and manipulation.<br>
•	Streamlines event handling.<br>
•	Provides tools for form validation.<br>
# Getting Started
Download the JSRock.js and styles.css file<br>
Include this files in your code using script and link tag<br>
```
<script src=’js/JSRock.js’></script>
<link rel=’stylesheet’ href=’css/styles.css’>

```
# Usage
## Ajax Requests
1.	Sending GET type request without data
```
function populateDesignations()
{
$$$.ajax({
“url” : “getDesignations”,
“methodType” : “GET”,
“success” : function(responseData){
fillComboBox(JSON.parse(responseData));
},
“failure” : function(){
alert(“Opps something went wrong, please try again later”);
}
});
}
```
The ajax function facilitates the initiation of Ajax requests. It expects a JSON object as an argument. This JSON object should contain the following properties:<br><br>
**url:** Specifies the target URL for the request.<br>
**methodType:** Can be either GET or POST<br>
**success:** A callback function triggered upon a successful request. It receives one argument, namely the data returned from the server side.<br>
**failure:** A callback function activated in case of a failed request.<br>
2.	GET type request with data
```
$$$.ajax({
“url” : “getData”,
“methodType” : “GET”,
“data” : {
“code” : code
},
“success” : function(responseData){
},
“failure” : function(){}
});
```
**data** : Data to be sent to the server.<br>
3.	POST Type request without data
```
$$$.ajax({
“url” : “getData”,
“methodType” : “POST”,
“success” : function(responseData){},
“failure” : function(){}
});
```
<br>
4.	POST Type request with data
```
$$$.ajax({
“url” : “getData”,
“methodType” : “GET”,
“data” : someData,
“sendJSON” : true,
“success” : function(responseData){
},
“failure” : function(){
}
});
```
**sendJSON** : When sendJSON is set to true then the data will be sent in the form of JSON object. Alternatively the data will be encoded in query string format and then sent to the server

