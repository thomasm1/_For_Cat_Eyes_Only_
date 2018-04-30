var newItemCounter = 1;
 var tmmList = document.getElementById("tmm-list");
// var tmmList = document.querySelector("#tmm-list");

var tmmButton = document.getElementById("tmm-button");
var tmmHeadline = document.getElementById("tmm-headline");

// var listItems = document.getElementById("tmm-list").getElementsByTagName("li");
var listItems = document.getElementById("tmm-list").querySelectorAll("tmm-list li");

tmmList.addEventListener("click", activateItem);

function activateItem(e) { 
    if (e.target.nodeName == "LI"){
        tmmHeadline.innerHTML = e.target.innerHTML;
        for (i = 0;i < e.target.parentNode.children.length; i++) {
    //      e.target.parentNode.children[i].classList.remove("active");
            e.target.parentNode.children[i].classList.remove("active");
        }
    e.target.classList.add("active");
    }
}
tmmButton.addEventListener("click", createNewItem);

function createNewItem() {
    tmmList.innerHTML += " <hr><li>new tmmIdea #" + newItemCounter + "</li>";
    newItemCounter++;
}