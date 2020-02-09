const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
pendingList = document.querySelector(".js-pendingList"),
finishedList = document.querySelector(".js-finishedList");
const PENDING_LS = "pendingList";
const FINISHED_LS = "finishedList";

let toDos = [];
let toFinished = [];
function moveToDo(event){
    //클릭된 버튼 구분:버튼이 있는 리스트
    const btn = event.target;
    const li = btn.parentNode;
    if(li.parentNode === pendingList){//기존 리스트에 있던 걸 제거
        pendingList.removeChild(li);
        finishedList.appendChild(li);
        //내부함수에서 정의한 조건에 맞는 cleanToDos array 생성
        const cleanToDos = toDos.filter(function(toDo){
        //toDo.id 와 li.id의 데이터 타입이 달라 비교가 안되므로 데이터 타입을 맞춰준다
            return toDo.id !== parseInt(li.id);
        });
        const addFinished = toDos.filter(function(toDo){
            return toDo.id === parseInt(li.id);
        });
        //update
        toDos = cleanToDos;
        toFinished.push(addFinished[0]);        
    }else{
        finishedList.removeChild(li);
        pendingList.appendChild(li);
        const addToDos = toFinished.filter(function(toDo){
        //toDo.id 와 li.id의 데이터 타입이 달라 비교가 안되므로 데이터 타입을 맞춰준다
            return toDo.id === parseInt(li.id);
        });
        const cleanFinished = toFinished.filter(function(toDo){
            return toDo.id !== parseInt(li.id);
        });
        //update
        toDos.push(addToDos[0]);
        toFinished = cleanFinished; 
    }
    saveToDo();
}
function deleteToDo(event){
    //클릭된 버튼 구분:버튼이 있는 리스트
    const btn = event.target;
    const li = btn.parentNode;
    console.dir(li);
    if(li.parentNode === pendingList){
        pendingList.removeChild(li);
        //내부함수에서 정의한 조건에 맞는 cleanToDos array 생성
        const cleanToDos = toDos.filter(function(toDo){
            //toDo.id 와 li.id의 데이터 타입이 달라 비교가 안되므로 데이터 타입을 맞춰준다
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanToDos;
    }else{
        finishedList.removeChild(li);

        const cleanFinished = toFinished.filter(function(toDo){
            //toDo.id 와 li.id의 데이터 타입이 달라 비교가 안되므로 데이터 타입을 맞춰준다
            return toDo.id !== parseInt(li.id);
        });
        toFinished = cleanFinished;
    }
    saveToDo();
}
function saveToDo(){
    /*
    localStorage는 value 값을 String 형태로만 저장하므로 
    객체를 저장하기 위해서는 String 형태로 변환하여 저장하여야 한다.
    */
   localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
   localStorage.setItem(FINISHED_LS, JSON.stringify(toFinished));
}
function paintPendingList(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    //delete
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    //move
    checkBtn.innerText="✅";
    checkBtn.addEventListener("click", moveToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const pendingObj={
        text:text,
        id:newId
    };
    toDos.push(pendingObj);
    saveToDo();

}
function paintFinishedList(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    //delete
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    //move
    checkBtn.innerText="✅";
    checkBtn.addEventListener("click", moveToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    finishedList.appendChild(li);
    const finishedObj={
        text:text,
        id:newId
    };
    toFinished.push(finishedObj);
    saveToDo();

}

function handleSubmit(event){
    event.preventDefault();
    const text = toDoInput.value;
    //화면에 업데이트
    paintPendingList(text);
    toDoInput.value = "";
}

function loadToDoList(){
    const loadedPendingList = localStorage.getItem(PENDING_LS);
    const loadedFinishedList = localStorage.getItem(FINISHED_LS);
    if(loadedPendingList !== null){
        const parsedToDos = JSON.parse(loadedPendingList);
        parsedToDos.forEach(function(toDo) {
            paintPendingList(toDo.text);
        });
    }
    if(loadedFinishedList !== null){
        const parsedFinisheds = JSON.parse(loadedFinishedList);
        parsedFinisheds.forEach(function(toDo) {
            paintFinishedList(toDo.text);
        });
    }
}
function init(){
    loadToDoList();
    //event를 input 태그에서 받지않고 form에서 받는다
    toDoForm.addEventListener("submit",handleSubmit);
}
init();