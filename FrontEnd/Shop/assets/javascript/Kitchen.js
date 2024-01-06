//--NOT COMPLETE (LEFT) SCREEN
async function loadProductLeft() {
    try {
        const res = await fetch('http://localhost:3000/api/shop/kitchen/NotComplete')
        const DataNotComplete = await res.json();
        //console.log("NotData: ", DataNotComplete);
        var contentContainer = document.querySelector('.content');
        contentContainer.innerHTML = "";
        //Load product
        var products = document.querySelector('.content')
        DataNotComplete.forEach(item => {
            var newProduct = document.createElement('div')
            newProduct.classList.add('row')
            newProduct.innerHTML = `
          <div class="STT col-1">${item.STT}</div>
          <div class="Name col-4">
              <p>${item.TenSp}</p>
          </div>
          <div class="Quality col-4 ">
              <p>${item.SoLuong}</p>
          </div>
          
          <div class="col-1">
              <button type="button" class="btn btn-outline-danger" onclick="CompleteProduct(${item.STT},${item.MaSP})">
                  <i class="fa-solid fa-angles-right"></i>
              </button>
          </div>
      `
            products.appendChild(newProduct)
        })

    } catch (error) {
        console.log(error);
    }
}
loadProductLeft();

//Complete Product
async function CompleteProduct(itemSTT, itemMaSP) {
    try {
        await fetch(`http://localhost:3000/api/shop/kitchen/notifyComplete/?STT=${itemSTT}&MaSP=${itemMaSP}`)
        window.location.href = 'http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html';
    } catch (error) {
        console.log(error);
    }

}

//--COMPLETE PRODUCT (RIGHT) SCREEN
async function loadProductRight() {
    try {
        const res = await fetch('http://localhost:3000/api/shop/kitchen/Complete')
        const DataComplete = await res.json();
        //console.log("Data: ", DataComplete);
        //Clear
        var contentContainer = document.querySelector('.contentRight');
        contentContainer.innerHTML = "";
        //Load product
        var productsRight = document.querySelector('.contentRight')
        let count = 1;
        DataComplete.forEach(item => {
            var newProduct = document.createElement('div')
            newProduct.classList.add('row')
            newProduct.innerHTML = `
            <div class= "STT col-1" > ${item.STT}</div >
            <div class="Name col-4">
                <p>${item.TenSp}</p>
            </div>
            <div class="Quality col-4 ">
                <p>${item.SoLuong}</p>
            </div>
           
             <div class="col-1">
                <button type="button" class="btn btn-outline-danger" onclick="MoveBackProduct(${item.STT},${item.MaSP})">
                    <i class="fa-solid fa-angles-left"></i>
                </button>
            </div>
        `
            productsRight.appendChild(newProduct)
        })
    } catch (error) {
        console.log(error);
    }
}
loadProductRight();

//Move back product
async function MoveBackProduct(itemSTT, itemMaSP) {
    try {
        await fetch(`http://localhost:3000/api/shop/kitchen/notifyNotComplete/?STT=${itemSTT}&MaSP=${itemMaSP}`)
        window.location.href = 'http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html';
    } catch (error) {
        console.log(error);
    }
}

// document.getElementById("logOut").addEventListener("click", function () {
//     // Chuyển đến trang HTML khác (thay đổi đường dẫn)
//     window.location.href = "http://127.0.0.1:5500/FrontEnd/Auth/Login.html";
// });
// async function logOut() {
//     try {
//         await fetch(`http://localhost:3000/api/auth/logout`);
//     } catch (error) {
//         console.log(error);
//     }
// }
// <div class="col-1">
//               <button type="button" class="btn_delete_left btn btn-outline-info" onclick="editProductLeft(${item.STT})">
//                     <i class="fa-solid fa-pencil"></i>
//               </button>
//           </div>
//           <div class="col-1">
//           <button type="button" class="btn_delete_right btn btn-outline-info" onclick="editProductRight(${item.MaSp})">
//               <i class="fa-solid fa-pencil"></i>
//           </button>
//        </div>