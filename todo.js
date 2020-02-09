const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input");
toDoList = document.querySelector(".js-toDoList");
const TODOS_LS = 'todos';
let toDos = [];


function deleteToDo(event){
    //클릭된 버튼 구분:버튼이 있는 리스트
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //내부함수에서 정의한 조건에 맞는 cleanToDos array 생성
    const cleanToDos = toDos.filter(function(toDo){
        //toDo.id 와 li.id의 데이터 타입이 달라 비교가 안되므로 데이터 타입을 맞춰준다
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    /*
    localStorage는 value 값을 String 형태로만 저장하므로 
    객체를 저장하기 위해서는 String 형태로 변환하여 저장하여야 한다.
    */
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        //localStorage에 든 값들을 화면 리스트에 추가한다
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();