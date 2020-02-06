var foodItems = document.querySelectorAll('.food_item');
const foodList = document.querySelectorAll('.food_list');
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const clearBtn = document.querySelector('.clear_btn');
const formInput = document.querySelector('.form_control');
const feedback = document.querySelector('.feedback');
const danger = document.querySelector('.danger');
const success = document.querySelector('.success');
const input = document.getElementById('input');
const checkBtns = document.querySelectorAll('.fa-check-circle');
const deleteBtns = document.querySelectorAll('.fa-edit');

const data = JSON.parse(localStorage.getItem('foods'));









// load local storage


var foodsArray;


if(localStorage.getItem('foods')){
    foodsArray = JSON.parse(localStorage.getItem('foods'))
} else {
    foodsArray = [];
}

foodsArray.forEach(div => {
    liMaker(div)
});

// create li item

function liMaker(text){
   const div = document.createElement('div');
    div.textContent = text;
    div.classList.add('food_item');
    div.draggable = 'true';

    div.addEventListener('dragstart', function (e){
        console.log('cheese');
        draggedItem = div;
        setTimeout(function(){
            div.style.display = 'none';
        }, 0)
    });
    
    div.addEventListener('dragend', function(){
        setTimeout(function() {
            draggedItem.style.display = 'block';
           draggedItem = null;
        }, 0);
    });


    var child1 = document.createElement('span');
    child1.className = 'far fa-check-circle';
    child1.addEventListener('click', checkBtnHandler);
    div.appendChild(child1);
    var child2 = document.createElement('span');
    child2.className = 'far fa-edit';
    child2.addEventListener('click', deleteBtnHandler);
    div.appendChild(child2);
    document.querySelector('.food_list').append(div);

    
}



form.addEventListener('submit', function(e){
    e.preventDefault();

    const value = document.getElementById('input').value;

    if(value == ''){
        document.querySelector('.success').style.display = 'none';
        document.querySelector('.danger').style.display = 'block';
        setTimeout(function(){
            document.querySelector('.danger').style.display = 'none';
        }, 2000)
    } else {
        document.querySelector('.danger').style.display = 'none';
        document.querySelector('.success').style.display = 'block';
        foodsArray.push(input.value)
        localStorage.setItem('foods', JSON.stringify(foodsArray))
        liMaker(input.value);
        input.value = '';
        setTimeout(function(){
            document.querySelector('.success').style.display = 'none';
        }, 2000)
    }

    
   
})


// clear btn functionality

clearBtn.addEventListener('click', function(){
    localStorage.clear()
    item = document.querySelector('.food_list');
    while(item.firstChild){
        item.removeChild(item.firstChild)
    }

    
})

// delete btn functionality

function deleteBtnHandler(e){
    const div = e.currentTarget.parentNode;
    var index = [].indexOf.call(div.parentNode.children, div)
    foodsArray.splice(index, 1);
     localStorage.setItem('foods', JSON.stringify(foodsArray));
    div.parentNode.removeChild(div);
}

function checkBtnHandler(e) {
    const underline = e.currentTarget.parentNode;
    underline.classList.toggle('completed');
  }


// button event listener functionlity


deleteBtns.forEach(function(btn) {
    btn.addEventListener('click', deleteBtnHandler);
  
  });
  
  checkBtns.forEach(function(btn) {
    btn.addEventListener('click', checkBtnHandler);
  });


// drag drop functionality



let draggedItem = null;

foodItems.forEach(function(e, i){

var item = foodItems[i];
item.addEventListener('dragstart', function (e){
    draggedItem = item;
    setTimeout(function(){
        item.style.display = 'none';
    }, 0)
});

item.addEventListener('dragend', function(){
    setTimeout(function() {
        draggedItem.style.display = 'block';
       draggedItem = null;
    }, 0);
});

});


foodList.forEach(function(list){


    list.addEventListener('dragover', function(e){
        e.preventDefault();
    });

    list.addEventListener('dragenter', function(e){
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.2);';
    
    });

    list.addEventListener('dragleave', function(e){
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1);';
    })
   

    list.addEventListener('drop', function(e){
        list.append(draggedItem);
        this.style.backgroundColor = 'rgba(255,255,255, 0.3);';
    });
})


