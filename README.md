# Introduction
•	This is a small, fast, and easy-to-use JavaScript library. \
•	The purpose behind creating this library is to simplify complex tasks like Ajax, HTML document traversal and manipulation, event handling, and form validation.
# Features
•	List of key features:\
•	Simplifies Ajax requests.\
•	Facilitates HTML document traversal and manipulation.\
•	Streamlines event handling.\
•	Provides tools for form validation.
# Getting Started
Download the JSRock.js and styles.css file\
Include this files in your code using script and link tag
```
<script src=’js/JSRock.js’></script>
<link rel=’stylesheet’ href=’css/styles.css’>

```
# Usage
## Ajax Requests
#### 1.	Sending GET type request without data
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
The ajax function facilitates the initiation of Ajax requests. It expects a JSON object as an argument. This JSON object should contain the following properties:\
**url:** Specifies the target URL for the request.\
**methodType:** Can be either GET or POST\
**success:** A callback function triggered upon a successful request. It receives one argument, namely the data returned from the server side.\
**failure:** A callback function activated in case of a failed request.
#### 2.	GET type request with data
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
**data** : Data to be sent to the server.
#### 3.	POST Type request without data
```
$$$.ajax({
“url” : “getData”,
“methodType” : “POST”,
“success” : function(responseData){},
“failure” : function(){}
});
```
#### 4.	POST Type request with data
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

## Fill combo box
```
$$$(“comboBox_id”).fillComboBox(obj);
obj : JSON Object
How to use : 
$$$(“comboBox_id”).fillComboBox({
“dataSource” : data,
“text” : “city”,
“value” : “code”,
“firstOption” : {
“text” : “<select city>”,
“value” : -1
}
});
```
**dataSource:** (Required)\
The data used to populate the combo box. It can be an array.\
**text:** (Required)\
The name of the property in the dataSource object whose value is to be set as the text attribute of the option tag.\
**value:** (Required)\
The name of the property in the dataSource object whose value is to be set as the value attribute of the option tag.\
**firstOption:** (Optional)\
The first option to be displayed in the combo box. This option will be selected by default.
## Accordian Pane
```
<script>
$$$.onDocumentLoaded(function(){
$$$.toAccordian("accord1");
});
</script>
</head>
<body>
<div id=”accord1”>
<h3>Heading 1</h3>
<div>
1 whatever whatever
2 whatever whatever
3 whatever whatever
4 whatever whatever
5 whatever whatever
6 whatever whatever
7 whatever whatever
</div>

<h3>Heading 2</h3>
<div>
11 whatever whatever
22 whatever whatever
33 whatever whatever
44 whatever whatever
55 whatever whatever
66 whatever whatever
77 whatever whatever
</div>

<h4>Heading 3</h4>
<div>
111 whatever whatever
222 whatever whatever
333 whatever whatever
444 whatever whatever
555 whatever whatever
666 whatever whatever
777 whatever whatever
</div>
</div>
<div id='accord2' accordian=’true’>
<h2>Cool 1</h2>
<div>
1 Cool cool
2  Cool cool
3  Cool cool
4  Cool cool
</div>
<h6>Cool 2</h6>
<div>
11 Cool cool
22 Cool cool
33 Cool cool
44 Cool cool
55 Cool cool
66 Cool cool
</div>
<h1>Cool 3</h1>
<div>
111 Cool cool
222 Cool cool
333 Cool cool
444 Cool cool
555 Cool cool
</div>
</div>
</body>
```
**Output :** 
<img src="/screenshots/accordion.png">
