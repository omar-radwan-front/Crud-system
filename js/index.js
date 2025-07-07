
                          // input  1
var prodectName = document.getElementById("prodectName");
var prodectPrice = document.getElementById("prodectPrice");
var prodectCatagory = document.getElementById("prodectCatagory");
var prodectDiscraption = document.getElementById("prodectDiscraption");
var prodectImage = document.getElementById("prodectImage");
var searchProducts=document.getElementById("searchProducts")
var btnAdd = document.getElementById("add");
var btnUpdate = document.getElementById("upd");
// console.log(prodectName,prodectPrice,prodectCatagory,prodectDiscraption,prodectImage);
 

var productlist ; 
if (localStorage.getItem("products")==null) {
   productlist =[];
} else {
  productlist=JSON.parse(localStorage.getItem("products"))
  display(productlist)
}
//  add product 2
function addproduct() {
  var imgName =prodectImage.files[0].name;         //name of photo 
  var product = {
    code : prodectName.value,
    price : prodectPrice.value,
    catagory : prodectCatagory.value,
    discraption : prodectDiscraption.value,
    imag : `images/${imgName}`                  //file name images only to turn 
  }
  if (prodectName.classList.contains("is-valid") && prodectPrice.classList.contains("is-valid")&& prodectCatagory.classList.contains("is-valid")&& prodectDiscraption.classList.contains("is-valid") ) {
     productlist.push(product);
 localStorage.setItem("products",JSON.stringify(productlist));  
  clear()
 
  display(productlist)

  } else {
    alert("not valid data")
  }

}
// display products 3
function display(anyArray) {
  var cartona ="";
  for (var  i = 0; i < anyArray.length; i++) {
  cartona+=`    <div class="col-md-6 col-lg-4">
      <div class="box my-2">
        <div class="boximg">        <img src=${anyArray[i].imag} alt="" class="w-100"></div>

        <div class="item p-1">
          <h4 class="h2 fw-bold">code : <span class="  fs-3 ">${anyArray[i].code} </span> </h4>
          <p class="text-black fw-bold fs-5">price :  <span class="  fs-5 ">${anyArray[i].price} </span> </p>
          <p class="text-black fw-bold fs-5"> Catagory :  <span class="  fs-3 ">${anyArray[i].catagory} </span></p>
          <p class="text-black fw-bold fs-5">discraption :  <span class="  fs-3 ">${anyArray[i].discraption} </span></p>
        </div>
        <button onclick="deleteproduct(${i})" class="btn btn-outline-danger form-control">Delete <i class="fas fa-trash"></i></button>
        <button onclick="edit(${i})" class="btn btn-outline-danger form-control">Update <i class="fas fa-pen"></i></button>
      </div>
    </div>`
    
    
  }
  document.getElementById("row").innerHTML=cartona;
}
// Delet product 4
function deleteproduct(deleteindex) {
  productlist.splice(deleteindex,1);
   localStorage.setItem("products",JSON.stringify(productlist));
  display(productlist)
   btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none")
  clear()

}
//  searchProducts 5
function searchProduct() {
  var word =searchProducts.value;
  var cartona="";
  var searchProd =[]
  for (var i = 0; i < productlist.length; i++) {
    
    if (productlist[i].code.toLowerCase().includes(word.toLowerCase())) {
      searchProd.push(productlist[i]);
    }
}
  if (searchProd=="") {
    document.getElementById("row").innerHTML=`<h2 class=" rounded-1 w-100 bg-dark fw-bold text-white text-center">no items</h2> `;
  } else {
      document.getElementById("row").innerHTML=searchProd;
      display(searchProd)
  }
}
// update  6
var myindex;                   //use variable in function Update 
function edit(index) {
 myindex=index;                 // return the same index 
  prodectName.value =productlist[index].code;
  prodectPrice.value =productlist[index].price;
  prodectCatagory.value =productlist[index].catagory;
  prodectDiscraption.value =productlist[index].discraption;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none")
  //then you should data to get be is valid 
  prodectName.classList.add("is-valid");
  prodectPrice.classList.add("is-valid");
  prodectCatagory.classList.add("is-valid");
  prodectDiscraption.classList.add("is-valid");
}
function update( ) {
productlist[myindex].code =  prodectName.value   //myindex  return the same index  to send the same element
productlist[myindex].price =prodectPrice.value
productlist[myindex].catagory =  prodectCatagory.value 
productlist[myindex].discraption = prodectDiscraption.value 
 if (prodectName.classList.contains("is-valid") && prodectPrice.classList.contains("is-valid")&& prodectCatagory.classList.contains("is-valid")&& prodectDiscraption.classList.contains("is-valid") ){   // if data contains class name the  "is valid " job the code 
  display(productlist)
 localStorage.setItem("products",JSON.stringify(productlist));
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none")
 }
 else {
    alert("not valid data")
  }
  clear()
}

// regex inputs  7
function validInputs(element) {
  var regex = {
    prodectName :/^[A-Z][a-z]{2,10}$/,
    prodectPrice :/^[1-9][0-9]{3,}$/,
    prodectCatagory : /^(Toshiba|hp|dell|appl)$/i,
    prodectDiscraption :/^\w{2,}$/
  }
  var result = regex[element.id].test(element.value);
  if (result==true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");

    
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
     element.nextElementSibling.classList.remove("d-none");
  }
} 
// clear values of Input  8

function clear() {
prodectName.value = null;
prodectName.classList.remove("is-valid")  // to remove "is-valid" of inputs

prodectPrice.value = null;  
prodectPrice.classList.remove("is-valid") 

prodectCatagory.value = null; 
prodectCatagory.classList.remove("is-valid")  

prodectDiscraption.value = null;  
prodectDiscraption.classList.remove("is-valid") 

prodectImage.value = null;  
}



