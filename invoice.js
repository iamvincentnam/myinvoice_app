
/* I think the most important part of my project is the JS code. Although I'm impressed by the outocme of my effort in CSS and HTML, yet, I i'm imressed because its the JS Code that powers this app's functionality and dynamics. 

therefore, above each block of code or sections, I added a comment as part of my documentation implementation in order to ensure readability*/


// const alert_message =alert("This is odinukwe invoice");


const invoiceContainer = document.querySelector('.invoiceContainer');
setTimeout(()=>{
   invoiceContainer.classList.remove('blur_property');

},0)

// Select the necessary HTML elements so that we can work with them
const productList = document.querySelector('#lists');
let desc =productList.querySelector('.desc');
let qty =productList.querySelector('.qty');
const form = document.querySelector('#form');

/* Add an event listener to the form submit event basically, all the code in this function should run if a submit action is initiated*/
form.addEventListener('submit',(e)=>{
    e.preventDefault();

// Get the values of the product name and quantity input fields
    const productName = form.elements.product.value;
    const qtyValue = form.elements.qty.value; 

 // Generate a random rate and calculate the subtotal price
   let randomRate = Math.floor(Math.random() * 90) + 50;
   randomRate = Math.floor(randomRate/ 5) * 5;
    // rounds the number down to the nearest multiple of 5
    if(randomRate % 10 !== 10){
      // checks if the number is not already divisible by 10
      randomRate=Math.floor (randomRate/10) *10
    }
   const  subTotalPrice = randomRate * qtyValue;
   const  rate =randomRate;

   // Create a new list item with the product name, rate, quantity, and subtotal price
    const list_item = document.createElement('li');
    list_item.classList.add('litems');
    list_item.innerHTML = `<span class="desc"> ${productName} </span>  
    <span class="rate">&#8358 ${rate.toFixed(2)}</span>
    <span class="qty" >${qtyValue}</span>
    <span class="price">&#8358 ${subTotalPrice.toFixed(2)} </span>`;

 // Add the list item to the product list or UL if the user entered values in the boxes respectively
     if(productName && qtyValue){
    productList.appendChild(list_item);;
   // Add a delete icon to the list item  whose func is created somewhere else in this code.      
    list_item.appendChild(deleteIconFunc())

    // Update the subtotal amount, total quantity, and total item count
            subTotalAmountFunc();
            calculateTotalQuantity(); 
            caculateTotalItem(); 
           
            }   
      // Reset the form input fields
            form.reset();
 });
// Create a delete icon and return it as an HTML element.
 function deleteIconFunc(){
   const image= document.createElement('img');
   image.src ='./icons/icons8-trash-32.png';
   const deleteIconspan = document.createElement('span');
   deleteIconspan.classList.add('del');
   deleteIconspan.appendChild(image);
   deleteIconspan.addEventListener('click',()=>{
      deleteIconspan.parentElement.remove();
      subTotalAmountFunc();
      calculateTotalQuantity(); 
      caculateTotalItem();
     
   });
   return deleteIconspan;
 }

// Calculate the sum totalquantity of all the items added.
 function calculateTotalQuantity(){
    const quantityCount = document.querySelector('#qtycount_value');
    let totalQty = 0;
    const itemqty_count = document.querySelectorAll('.qty');
    itemqty_count.forEach((quantity)=>{
     const quntityValue =parseFloat(quantity.textContent);
     totalQty+= quntityValue;
    });
    quantityCount.textContent= totalQty; 

 }
 // Calculate the number  of all the items added ie number of list items.
 function caculateTotalItem(){
   let itemCount_value = document.querySelector('#itemcount_value');
   let totalItems=0;
   const items = document.querySelectorAll('.desc');
  for(let i=0; i< items.length; i++){
   totalItems = i+1;
  }
  itemCount_value.textContent= totalItems;

 }

//  This is a realtime date code whose output is dynamically displayed in the html
 const htmlDate = document.querySelector('.date');
const dateObject = new Date();
// make the month interger returned to be in strings
const month = dateObject.toLocaleString('default', {month:'long'});
const dateNumber =  dateObject.getDate();
const year = dateObject.getFullYear();
let dayOfWeekIndex =dateObject.getDay();
htmlDate.textContent =` ${dateNumber} ${month}, ${year}`;


// Get hold of the input and its parent  container. 
const enterpaymentInput = document.querySelector('#enterpayment');
let data ='';
const cash = document.querySelector('#cash');

// when the customer is about to pay, his payment amount is inputed. this code  dynamically reflects the the input value of the amount enterd in the html. 
enterpaymentInput.addEventListener('input',(e)=>{
   e.preventDefault();
  data = e.target.value.trim();
  data = parseFloat(data);
  cash.textContent = '₦'.concat(data.toFixed(2));

  //if the data in the input is being cleared, the cash.textContent usually return Nan. the check below makes it to be 0;
 if(!data){
   cash.textContent = '₦'.concat(0);
 }
});

//Get hold of #subtotal_value container.
const subTotalprice = document.querySelector('#subtotal_value');

// this function calculates the sum total of all the prices of items
function subTotalAmountFunc(){
   // Get hold of all the prices in the list.
   const Allprices = document.querySelectorAll('.price');
   let intialPrice =0;
   Allprices.forEach((price)=>{
   const priceText = price.textContent;
   // Trying to convert the value to number since it has the '₦' symbol in it.
   const priceValue = parseFloat(priceText.replace('₦','').trim());
   
   //this calcualte the sum total of all the prices and is stored in the initial price variable.
   intialPrice += priceValue;
   });
   let count =0;
   let intervalId =setInterval(()=>{
      count+=10;
      console.log(count)
      if(count == intialPrice){
         clearInterval(intervalId)
      }
       //get the value of the total price into the html. 
   subTotalprice.textContent =intialPrice.toFixed(2);
   clearInterval(intervalId)
   },100);

  

}

const insufficientBal=document.querySelector('#insufficientBalance');
const myBalance = document.querySelector('#balance-item');
// this function calculates the difference between  subtotal price of the items and the cash value.
function enterpaymentFunc(){
 cash.textContent = '₦'.concat(data);
 //Get hold of the value of the subtotal Price since it is in a string. 
 const intialPrice = parseFloat(subTotalprice.textContent);

 const enteredCash = parseFloat(data);
 // if the value entered is < the subtotal price
 if(enteredCash >=  intialPrice){
   //save the difference in a variable called difference.
   const difference = enteredCash - intialPrice;
   //the following classlists below should be &removed & added respectively.
   myBalance.classList.remove('mybalance_display_rm');
 insufficientBal.classList.add('balancedisplay');
   //pass the value into the mybalanceFunc() function
   mybalancefunc(difference);
//play audio
audiofunc();
 }
 // if the value entered is >= the subtotal price
 else{
//the following classlists below should be  ad ||removed respectively.
  insufficientBal.classList.remove('balancedisplay'); 
  myBalance.classList.add('mybalance_display_rm');
 }
 //reset the form
 enterpaymentForm.reset();
}


const enterpaymentForm = document.querySelector('#enterpaymentForm');
// enterpaymentFunc() to run when the submit function runs.
enterpaymentForm.addEventListener('submit',(e)=>{
   e.preventDefault();
  enterpaymentFunc();
});


// render in the html the value of the difference between the subtotal price and the value entered
function mybalancefunc(difference){
    myBalance.textContent =  '₦'.concat(difference.toFixed(2));   
}
function audiofunc(){
  const audioElement= document.createElement('audio');
audioElement.id='audio-player';
audioElement.src ='./home-printer.mp3';
audioElement.play();
}

