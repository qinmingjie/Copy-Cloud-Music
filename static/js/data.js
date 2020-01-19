let xhr = new XMLHttpRequest();
xhr.open("get","http://39.107.87.215/",true);
xhr.onload = function(){
    console.log(xhr.responseText);
}
xhr.send();