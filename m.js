const item = document.getElementById("item")
const addButton = document.getElementById("submit")
const todolistparent = document.querySelector(".todolist")
let listArray = JSON.parse(localStorage.getItem("task")) || []
const alldone = document.querySelector(".finishall")


addButton.addEventListener("click", () => {
   if(item.value != ""){
     writeItem()
    appendItem()
   }
   else if(item.value ==''){
    let alertdiv = document.querySelector(".alertdiv")
    let alerttext = document.querySelector(".alerttext")
    let alertcon = document.querySelector(".alertcon")
    let x = document.querySelector(".x")
     alertdiv.style.display = "flex"
     alertcon.style.display = "flex"
     alerttext.textContent = "Enter A List"
    alertcon.addEventListener("click", (e) =>{
        if(e.target === alertcon){
            alertdiv.style.display = "none"
        alertcon.style.display = "none"
        }
        else if(e.target === alertdiv){
            return
        }
    })
     x.addEventListener("click", () =>{
        alertdiv.style.display = "none"
        alertcon.style.display = "none"
    })
   }
})
// let alertbox = () => {
// alertdiv.addEventListener("click", () =>{
//     alertdiv.style.display = "flex"
// })
// }


let writeItem = () => {
    let listObject = {
        text: item.value,
        completed: false
    }

    listArray.unshift(listObject)
    localStorage.setItem("task", JSON.stringify(listArray))
}

 //finish all logic
                   // if(e.target.className === "fa-solid fa-arrow-up-from-bracket"){
                   let  compAll = document.getElementById("finishall")
                   compAll.addEventListener("click", () => {
                    listArray.forEach(list => {
                list.completed = !list.completed
                localStorage.setItem("task", JSON.stringify(listArray))
                appendItem()

                    });
                })  
                   // }

//append item logic
//update my array, save it to local storage, update my ui with localstorage

let appendItem = () => {
todolistparent.innerHTML = ""
    for(let i = 0; i< listArray.length; i++){
        document.querySelector("p").style.display = "none"
        let todoListItem = document.createElement("li")
        let todoListItemSpan = document.createElement("span")
        todoListItem.append(todoListItemSpan)  
        let editspan = document.createElement("input")
        todoListItem.append(editspan)
        editspan.style.display = "none"      
        todoListItemSpan.textContent = listArray[i].text
        todoListItem.style = `
            display: flex;
    justify-content: space-between;
    align-items: center;
    `
            if(listArray[i].completed){
            todoListItem.style =`
                    opacity: 0.5;
    text-decoration: line-through;
    padding: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
                `
        }


    let iconCon = document.createElement("div")
    let anothericonCon = document.createElement("div")
    anothericonCon.innerHTML += `<i class="fa-solid fa-xmark"></i><i class="fa-regular fa-circle-check"></i>`
    anothericonCon.style = `
    display: none;
    gap: 8px;
    justify-content: center;
    align-items: center;
        `


    iconCon.innerHTML += `<i class="fa-solid fa-pen-to-square"></i>`
    iconCon.innerHTML += `<i class="fa-solid fa-trash"></i>`
    iconCon.innerHTML += `<i class="fa-solid fa-check"></i>`
        iconCon.style = `
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
            `
       
            todoListItem.append(iconCon)
            todoListItem.append(anothericonCon)
        todolistparent.append(todoListItem)

        iconCon.addEventListener("click", (e) => {
// 





//edit logic 1/2


if(e.target.className === "fa-solid fa-pen-to-square"){
    todoListItemSpan.style.display="none"
    editspan.style.display = "flex"
    iconCon.style.display="none"
    anothericonCon.style.display="flex"
    console.log("i was clicked")
    let newtext = `${listArray[i].text}`
    editspan.value = newtext
    
}

anothericonCon.addEventListener("click", (e) => {
    //edit logic 2/2
        if(e.target.className === "fa-regular fa-circle-check"){
                       listArray[i].text = editspan.value
            localStorage.setItem("task", JSON.stringify(listArray))
            appendItem()
    todoListItemSpan.style.display="flex"
    editspan.style.display = "none"
    iconCon.style.display="flex"
    anothericonCon.style.display="none"
        }
//cancel edit logic
if(e.target.className === "fa-solid fa-xmark"){
           listArray[i].text = listArray[i].text
            localStorage.setItem("task", JSON.stringify(listArray))
            appendItem()
    todoListItemSpan.style.display="flex"
    editspan.style.display = "none"
    iconCon.style.display="flex"
    anothericonCon.style.display="none"
}



        })


 //complete logic
            if(e.target.className === "fa-solid fa-check"){
                listArray[i].completed = !listArray[i].completed
                localStorage.setItem("task", JSON.stringify(listArray))
                appendItem()
            }
                //delete logic
            if (e.target.className === "fa-solid fa-trash"){
            listArray.splice(i, 1)
            localStorage.setItem("task", JSON.stringify(listArray))
        appendItem()
    }

})
//end of delete logic
    }
    item.value = ""

}



appendItem()

