const textInput = document.querySelector("input");
const btnInsert = document.querySelector(".divInsert button");
const btnDeleteAll = document.querySelector(".header button");
const ul = document.querySelector("ul");

let itensDB = []

// Delete All items

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

// Input Event

textInput.addEventListener("keypress", e => {
  if(e.key == "Enter" && textInput.value != ""){
    setItemDB()
  }
});

// Event Click

btnInsert.onclick = () => {
  if(textInput.value != "") {
    setItemDB()
  }
}

// Set Item Function

function setItemDB() {
  if(itensDB.length >= 20) {
    alert("Limite máximo de 20 itens atingido!")
    return
  }

  itensDB.push({"item" : textInput.value, "status": ""})
  updateDB()
}

// Update DB on local storage

function updateDB() {
  localStorage.setItem("todolist", JSON.stringify(itensDB))
  loadItens()
}

// Load items

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem("todolist")) ?? [];
  itensDB.forEach((item, i) => {
    insertItemScreen(item.item, item.status, i)
  });
}

// Insert Items on Screen

function insertItemScreen(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  textInput.value = "";
}

// function done checkbox

function done(chk, i) {
  if (chk.checked) {
    itensDB[i].status = "checked"
  } else {
    itensDB[i].status = ""
  }

  updateDB()
}

// remove items

function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB()
}

loadItens();