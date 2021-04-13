"use strict"

let deleteLi;
const adder = () => {
    const task = document.getElementById("input").value;

    if (task !== "") {
        const newLi = document.createElement("li")
        newLi.className = "list-group-item";

        const newRowDiv = document.createElement("div")
        newRowDiv.className = "row d-flex justify-content-center";

        const newTaskDiv = document.createElement("div");
        newTaskDiv.innerHTML = task;
        newTaskDiv.className = "task col-10 d-flex align-items-center";

        const imgDiv = document.createElement("div")
        imgDiv.className = "col-1 img d-flex align-items-center"

        const newImg = document.createElement("img");
        newImg.src = "close.svg";
        newImg.alt = "remove task";
        newImg.className = "close"
        newImg.setAttribute("data-bs-toggle", "modal");
        newImg.setAttribute("data-bs-target", "#exampleModal");

        imgDiv.append(newImg);
        newRowDiv.append(imgDiv);
        newRowDiv.append(newTaskDiv);
        newLi.append(newRowDiv);

        let lista;
        switch (document.getElementById("selectedList").value) {
            case "maloPilne":
                lista = "maloPilneList";
                break;
            case "pilne":
                lista = "pilneList";
                break;
            case "bardzoPilne":
                lista = "bardzoPilneList";
                break;
        }
        document.getElementById(lista).prepend(newLi);

        let isTaskDone = false;
        newTaskDiv.onclick = () => {
            if (!isTaskDone) {
                newTaskDiv.classList.add("taskIsDone");
                newTaskDiv.classList.remove("col-10");
                newTaskDiv.classList.add("col-7");

                const newTaskIsDoneDiv = document.createElement("div");
                newTaskIsDoneDiv.className = "col-3 date";
                newTaskIsDoneDiv.innerHTML = new Date().toDateString();

                newRowDiv.append(newTaskIsDoneDiv);
            } else {
                newTaskDiv.classList.remove("taskIsDone");
                newRowDiv.getElementsByClassName("date")[0].remove();
                newTaskDiv.classList.remove("col-7");
                newTaskDiv.classList.add("col-10");
            }
            isTaskDone = !isTaskDone
        }

        newImg.onclick = () => deleteLi = newLi;
    }
}

let deletedLi = [];
const removeLi = () => {
    switch (deleteLi.parentNode.id){
        case 'maloPilneList':
            if (typeof deletedLi[0] !== 'undefined')
                deletedLi[0].remove()
            deletedLi[0] = deleteLi
            break;
        case 'pilneList':
            if (typeof deletedLi[1] !== 'undefined')
                deletedLi[1].remove()
            deletedLi[1] = deleteLi
            break;
        case 'bardzoPilneList':
            if (typeof deletedLi[2] !== 'undefined')
                deletedLi[2].remove()
            deletedLi[2] = deleteLi
            break;
    }
    deleteLi.id = 'restore'+deleteLi.parentNode.id + 'hidden'
    deleteLi.style.display = 'none'
}

let localInput;
let lstId;
const search = (input, listId) => {
    let elementString;
    let liNr;
    lstId = listId;
    switch (listId){
        case 'maloPilneList': liNr = 0;
            break;
        case 'pilneList': liNr = 1;
            break;
        case 'bardzoPilneList': liNr = 2;
            break;
    }
    for (const element of document.getElementById(listId).children) {
        if (element === deletedLi[liNr])
            continue

        if (document.getElementById("flexSwitchCheckChecked" + listId).checked) {
            localInput = input
            elementString = element.firstElementChild.children[1].innerHTML
        } else {
            localInput = input.toLowerCase()
            elementString = element.firstElementChild.children[1].innerHTML.toLowerCase()
        }

        if (!elementString.includes(localInput)) {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    }
    document.getElementById("flexSwitchCheckChecked" + listId).onclick = () => search(input, listId)
}

const restoreLi = (id) => {
    switch (id){
        case "restoremaloPilneList":
            deletedLi[0]=undefined
            break;
        case "restorepilneList":
            deletedLi[1]=undefined
            break;
        case "restorebardzoPilneList":
            deletedLi[2]=undefined
            break;
    }
    document.getElementById(id+'hidden').style.display = 'block'
    document.getElementById(id+'hidden').id = ""
    search(localInput,lstId)
}