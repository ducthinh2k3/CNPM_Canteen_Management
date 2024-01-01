//--LEFT SCREEN
let mockData = [
    {
        Name: 'Bún chả hà nội',
        MaSp: '1',
        Quality: 1,
    },
    {
        Name: 'Bánh ướt',
        MaSp: '2',
        Quality: 2,
    },
    {
        Name: 'Bánh Canh Giò Heo Tôm',
        MaSp: '3',
        Quality: 3,
    },
    {
        Name: 'Mì Khô Xá Xíu',
        MaSp: '4',
        Quality: 5,
    },
    {
        Name: 'Cơm Tấm Sườn',
        MaSp: '5',
        Quality: 1,
    },
    {
        Name: 'Sinh Tố Bơ',
        MaSp: '6',
        Quality: 4,
    },
    {
        Name: 'Sinh Tố Táo',
        MaSp: '7',
        Quality: 2,
    },
    {
        Name: 'Sinh Tố Dâu',
        MaSp: '8',
        Quality: 1,
    },
    {
        Name: 'Sinh Tố Đào',
        MaSp: '9',
        Quality: 4,
    },
    {
        Name: 'Sinh Tố Táo',
        MaSp: '10',
        Quality: 3,
    },
    {
        Name: 'Sinh Tố Lê',
        MaSp: '11',
        Quality: 2,
    },
    {
        Name: 'Sinh Tố Dưa hấu',
        MaSp: '12',
        Quality: 1,
    }
]


function loadProductLeft() {
    //Clear
    var contentContainer = document.querySelector('.content');
    contentContainer.innerHTML = "";
    //Load product
    var products = document.querySelector('.content')
    let count = 1
    mockData.forEach(item => {
        var newProduct = document.createElement('div')
        newProduct.classList.add('row')
        newProduct.innerHTML = `
        <div class="STT col-1">${count++}</div>
        <div class="Name col-4">
            <p>${item.Name}</p>
        </div>
        <div class="Quality col-4 ">
            <p>${item.Quality}</p>
        </div>
        <div class="col-1">
            <button type="button" class="btn_delete_left btn btn-outline-info" onclick="deleteProductLeft(${item.MaSp})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-outline-danger" onclick="CompleteProduct(${item.MaSp})">
                <i class="fa-solid fa-angles-right"></i>
            </button>
        </div>
    `
        products.appendChild(newProduct)
    })
}
//Load product
loadProductLeft()

//Delete product
function deleteProductLeft(itemId) {
    for (let i = 0; i < mockData.length; i++) {
        if (mockData[i].MaSp == itemId) {
            mockData.splice(i, 1);
            loadProductLeft();
        }
    }
}
//Complete Product
function CompleteProduct(itemId){
    for (let i = 0; i < mockData.length; i++) {
        if (mockData[i].MaSp == itemId) {
            mockData1.push(mockData[i]);
            mockData.splice(i, 1);
            loadProductLeft();
            loadProductRight();
        }
    }
}

//--RIGHT SCREEN
let mockData1 = [
    {
        Name: 'Sinh Tố Bơ',
        MaSp: '6',
        Quality: 4,
    },
    {
        Name: 'Sinh Tố Táo',
        MaSp: '7',
        Quality: 2,
    },
    {
        Name: 'Sinh Tố Dâu',
        MaSp: '8',
        Quality: 1,
    },
    {
        Name: 'Sinh Tố Đào',
        MaSp: '9',
        Quality: 4,
    },
    {
        Name: 'Sinh Tố Táo',
        MaSp: '10',
        Quality: 3,
    },
    {
        Name: 'Sinh Tố Lê',
        MaSp: '11',
        Quality: 2,
    },
    {
        Name: 'Sinh Tố Dưa hấu',
        MaSp: '12',
        Quality: 1,
    }
]

function loadProductRight(){
    //Clear
    var contentContainer = document.querySelector('.contentRight');
    contentContainer.innerHTML = "";
    //Load product
    var productsRight = document.querySelector('.contentRight')
    let count = 1;
    mockData1.forEach(item => {
        var newProduct = document.createElement('div')
        newProduct.classList.add('row')
        newProduct.innerHTML = `
            <div class="STT col-1">${count++}</div>
            <div class="Name col-4">
                <p>${item.Name}</p>
            </div>
            <div class="Quality col-4 ">
                <p>${item.Quality}</p>
            </div>
            <div class="col-1">
                <button type="button" class="btn_delete_right btn btn-outline-info" onclick="deleteProductRight(${item.MaSp})">
                    <i class="fa-solid fa-trash"></i>
                </button>
             </div>
             <div class="col-1">
                <button type="button" class="btn btn-outline-danger" onclick="MoveBackProduct(${item.MaSp})">
                    <i class="fa-solid fa-angles-left"></i>
                </button>
            </div>
        `
        productsRight.appendChild(newProduct)
    })
}
//Load all product right
loadProductRight()

//Delete product Right
function deleteProductRight(itemId) {
    for (let i = 0; i < mockData1.length; i++) {
        if (mockData1[i].MaSp == itemId) {
            mockData1.splice(i, 1);
            loadProductRight();
        }
    }
}
//Move back product
function MoveBackProduct(itemId){
    for (let i = 0; i < mockData1.length; i++) {
        if (mockData1[i].MaSp == itemId) {
            mockData.push(mockData1[i]);
            mockData1.splice(i, 1);
            loadProductLeft();
            loadProductRight();
        }
    }
}

document.getElementById("logOut").addEventListener("click", function() {
    // Chuyển đến trang HTML khác (thay đổi đường dẫn)
    window.location.href = "Login.html";
  });
