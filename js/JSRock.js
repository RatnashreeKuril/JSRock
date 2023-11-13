function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id : "+cid;
return new JSRockElement(element);

}

$$$.model={
"onStartup" : [],
"accordians" : [],
"modals" : []
}

// modal specific code starts here
$$$.modals={};

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid) 
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}
function Modal(cref)
{
var objectAddress=this;
this.beforeOpening=null;
this.afterOpening=null;
this.beforeClosing=null;
this.afterClosing=null;
var contentReference=cref;


this.getContentId=function(){
return contentReference.id;
};

var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;
}
contentIndex++;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("jsrock_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("jsrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);

var headerDivision=document.createElement("div");
headerDivision.style.background="#F0E6FA";
headerDivision.style.right="0";
headerDivision.style.height="40px";
headerDivision.style.padding="8px";
headerDivision.style.borderTopLeftRadius="8px";
headerDivision.style.borderTopRightRadius="8px";
modalDivision.appendChild(headerDivision);



if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");

let xpos=sz.indexOf("x");
if(xpos==-1) sz.indexOf("X");
if (xpos==-1) throw "In case of modal size should be specified as widhtxheight";
if(xpos==0 || xpos==sz.length-1) throw "In case of modal size should be specified as widhtxheight";
let width=sz.substring(0,xpos);
width=parseInt(width)+20;
let height=sz.substring(xpos+1);
modalDivision.style.width=(width)+"px";
height=parseInt(height)+80;
modalDivision.style.height=(height)+"px";
}

else
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}


if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;

}


if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}
if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}


var contentDivision=document.createElement("div");
//contentDivision.style.border="1px solid black";
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-126)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="8px";
contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display='block';
contentReference.style.visibility='visible';
modalDivision.appendChild(contentDivision);

var footerDivision=document.createElement("div");
footerDivision.style.background="#E6F0FA";
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="8px";
footerDivision.style.borderBottomLeftRadius="8px";
footerDivision.style.borderBottomRightRadius="8px";
modalDivision.appendChild(footerDivision);

if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}



var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add("jsrock_closeButton");
var closeButtonMarker=document.createElement("img");
closeButtonMarker.src="/JSRock/images/cross.png";
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}

if(contentReference.hasAttribute("beforeOpening"))
{
var oo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=oo;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var oo=contentReference.getAttribute("beforeClosing");
this.beforeClosing=oo;
}

if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
}
if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;
}







this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(this.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display='block';
modalDivision.style.display='block';
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalDivision.style.display="none";
modalMaskDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
};
}

}// Modal class ends here



// modal specific code ends here







$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
var x;
var myInterval;
if($$$.model.accordians[accordianIndex].expandedIndex==panelIndex+1)
{
x=40;

myInterval=setInterval(function(){
x--;
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.height=x+"vh";
if(x==0) 
{
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display="none";
clearInterval(myInterval);
}
},10);
$$$.model.accordians[accordianIndex].expandedIndex=-1;
return;
}
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display="none";

var height=$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.height;

$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.height="0vh";
x=1;
myInterval=setInterval(function(){
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.height=x+"vh";
x++;
if(x==40) 
{
clearInterval(myInterval);
}
},10);
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}


$$$.toAccordian=function(accord)
{
var panels=[];
var expandedIndex=-1;
if((typeof accord)=='string')
{
accord=document.getElementById(accord);
}
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
if(children[x].nodeName=="H3" ||
children[x].nodeName=="H2" ||
children[x].nodeName=="H1" || 
children[x].nodeName=="H4" ||
children[x].nodeName=="H5" ||
children[x].nodeName=="H6")
{
children[x].classList.add("jsrock_accord_heading");
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
children[x].classList.add("jsrock_accord_panel");
panels[panels.length]=children[x];
}
}
if(panels.length%2!=0) throw "Headings and division malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3" &&
panels[x].nodeName!="H2" && 
panels[x].nodeName!="H1" && 
panels[x].nodeName!="H4" && 
panels[x].nodeName!="H5" && 
panels[x].nodeName!="H6") throw "Headings and division malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Headings and division malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}

$$$.model.accordians[accordianIndex]={
"panels" : panels,
"expandedIndex" : -1
};




};
$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Expected function, found "+(typeof func)+" in call to onDocumentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}

$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let i;
let t=null;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}

// setting up modal part starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}
// setting up modal part ends here

}// end of initFramework


function JSRockElement(element)
{
this.element=element;
this.html=function(content){
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;

}
return null;
};// html function ends
this.value=function(content){
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
};// value function ends

this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on a SELECT type object only";
if(!jsonObject["dataSource"]) throw "dataSource property is missing in call to fillComboBox";
let dataSource=jsonObject["dataSource"];

if((typeof dataSource)!="object") throw "dataSource property should be a collection type in call to fillComboBox";
if(!jsonObject["text"]) throw "text property is missing in call to fillComboBox";
let text=jsonObject["text"];
if((typeof text)!="string") throw "text property should be of string type in call to fillComboBox";
if(!dataSource[0][text]) throw "invalid text property in call to fillComboBox";

if(!jsonObject["value"]) throw "value property is missing in call to fillComboBox";
let value=jsonObject["value"];
if((typeof value)!="string") throw "value property should be of string type in call to fillComboBox";
if(!dataSource[0][value]) throw "invalid value property in call to fillComboBox";
var obj;
let firstOption;
if(jsonObject["firstOption"])
{
firstOption=jsonObject["firstOption"];
if((typeof firstOption)!="object") throw "firstOption property should be a collection in call to fillComboBox";
if(!firstOption["text"]) throw "text property is missing in firstOption in call to fillComboBox";
let firstOptionText=firstOption["text"];
if((typeof firstOptionText)!="string") throw "text property should be of string type in firstOption in call to fillComboBox";
if(!firstOption["value"]) throw "value property is missing in firstOption in call to fillComboBox";
let firstOptionValue=firstOption["value"];
if((typeof firstOptionValue)!="string") throw "value property should be of string type in firstOption in call to fillComboBox";
obj=document.createElement("option");
obj.text=firstOptionText;
obj.value=firstOptionValue;
this.element.appendChild(obj);
}
for(var i=0;i<dataSource.length;i++)
{
obj=document.createElement("option");
obj.text=dataSource[i][text];
obj.value=dataSource[i][value];
this.element.appendChild(obj);
}



};// fillComboBox ends

this.isValid=function(obj){
if((typeof obj)!="object") throw "Invalid argument has been passed to function : isValid";

var formElement;
var validations;
var len;
var errorPane;
var errorPaneId;
var error;
var isValid=true;
for(k in obj)
{
if((typeof obj[k])!="object") throw "Expected object against "+k+" "+(typeof obj[k])+" found";
validations=obj[k];
formElement=this.element.elements[k];
if(validations["error-pane"]) 
{
errorPaneId=validations["error-pane"];
if((typeof errorPaneId)!="string") throw "error-pane should be of string type";
errorPane=document.getElementById(errorPaneId);
if(!(errorPane)) throw "Invalid error-pane : "+errorPaneId;
errorPane.innerHTML="";
}

for(key in validations)
{
if(key=="required")
{
if(validations[key]==true)
{
if(!(formElement.value))
{
if(!(validations["error"])) throw "error property is required";
error=validations["error"];
if(!(typeof error)=="object") throw "error should be of object type";
if(!(error["required"])) throw "error to be displayed is not specified against required";
if(!(typeof error["required"])=="string") throw "error to be displayed should be of string type";
if(validations["display-alert"])
{
alert(error["required"]);
}
else
{
if(!(errorPane)) throw "error-pane is required";
errorPane.innerHTML=error["required"];
}
isValid=false;

}

}
} // required
if(key=='max-length')
{
len=formElement.value.trim().length;
maxLen=validations[key];
if((typeof maxLen)!="number") throw "max-length should be a number";
if(len>maxLen)
{
if(!(validations["error"])) throw "error property is required";
error=validations["error"];
if(!(typeof error)=="object") throw "error should be of object type";
if(!(error["max-length"])) throw "error to be displayed is not specified against max-length";
if(!(typeof error["max-length"])=="string") throw "error to be displayed should be of string type";
if(validations["display-alert"])
{
alert(error["max-length"]);
}
else
{
if(!(errorPane)) throw "error-pane is required";
errorPane.innerHTML=error["max-length"];
}
isValid=false;
}
} // max-length
if(key=="invalid")
{
if((typeof formElement.value)!="string") throw "invalid property cannot be applied to : "+formElement;
value=formElement.value;
if(value==validations[key])
{
if(!(validations["error"])) throw "error property is required";
error=validations["error"];
if(!(typeof error)=="object") throw "error should be of object type";
if(!(error["invalid"])) throw "error to be displayed is not specified against invalid";
if(!(typeof error["invalid"])=="string") throw "error to be displayed should be of string type";
if(validations["display-alert"])
{
alert(error["invalid"]);
}
else
{
if(!(errorPane)) throw "error-pane is required";
errorPane.innerHTML=error["invalid"];
}
isValid=false;
}
}// invalid
if(key=="required-state")
{
if((typeof formElement.checked)!="boolean") throw "required-state property cannot be applied to : "+formElement;
checked=formElement.checked;
if(!(checked==validations[key]))
{
if(!(validations["error"])) throw "error property is required";
error=validations["error"];
if(!(typeof error)=="object") throw "error should be of object type";
if(!(error["required-state"])) throw "error to be displayed is not specified against required-state";
if(!(typeof error["required-state"])=="string") throw "error to be displayed should be of string type";
if(validations["display-alert"])
{
alert(error["required-state"]);
}
else
{
if(!(errorPane)) throw "error-pane is required";
errorPane.innerHTML=error["required-state"];
}
isValid=false;
}
}// required-state


} // loop on validations

} // loop on obj
return isValid;

}; // isValid function ends






}// class JSRockElement ends



$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be a function in call to ajax";
}

let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be a function in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}

};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;

}

xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
} // get part ends here
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}

};
let jsonData={};
let sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!="boolean") throw "sendJSON property should be of boolean type in call to ajax";
let queryString="";
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString="";
let qsName;
let qsValue;
let xx=0;
jsonData=jsonObject["data"];
for(k in jsonData)
{
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}

}
xmlHttpRequest.open('POST',url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xmlHttpRequest.send(queryString);
}
}
}

window.addEventListener('load',function(){
$$$.initFramework();
});