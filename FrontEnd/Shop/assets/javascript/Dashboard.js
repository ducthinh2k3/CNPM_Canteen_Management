const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "Bún Chả Hà Nội",
        "image":"bún chả.jfif",
        "price": 26000
    },
    {
        "id": 2,
        "name": "Bánh Ướt",
        "image":"bánh ướt.jfif",
        "price": 23000
    },
    {
        "id": 3,
        "name": "Cơm Gà Nướng",
        "image":"cơm gà nướng.jpg",
        "price": 27000
    },
    {
        "id": 4,
        "name": "Bánh Canh Tôm Thịt",
        "image":"bánh canh tôm thịt.jfif",
        "price": 24000
    },
    {
        "id": 5,
        "name": "Mì Hoành Thánh",
        "image":"mì hoành thánh.jpg",
        "price": 22000
    },
    {
        "id": 6,
        "name": "Cơm Tấm Sườn",
        "image":"cơm tấm sườn.jfif",
        "price": 28000
    },
    {
        "id": 7,
        "name": "Mì Khô Xá Xíu",
        "image":"mì khô xá xíu.jfif",
        "price": 25000
    },
    {
        "id": 8,
        "name": "Sinh Tố Bơ",
        "image":"sinh tố bơ.jpg",
        "price": 15000
    },
    {
        "id": 9,
        "name": "Trà Đào",
        "image":"trà đào.jpg",
        "price": 18000
    }
]


let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "Images/${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <div class="btn">
                <button class="add" onclick = "addToCard(${key})">Thêm món</button>
                <a href="Review.html" "color"="white" "text-decoration"="none">
                    <button class="detail">Đánh giá</button>
                </a>
            </div>
        `;
        list.appendChild(newDiv)
    })
}

initApp()


const addToCard = key => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice= 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity;

        if(value != null) {
            let newDiv = document.createElement("li");      
            newDiv.innerHTML = `
                <div><img src = "Images/${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#61BBE1;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#61BBE1;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}

function detail() {
    window.open("Review.html");
  }

  //Search Product
  var searchInput = document.querySelector('.search input')
  searchInput.addEventListener('input',function(e){
      let txtSearch =e.target.value.trim().toLowerCase()
      let listProductDOM =document.querySelectorAll('.item')
      listProductDOM.forEach(item=>{
          if(item.innerText.toLowerCase().includes(txtSearch)){
               item.classList.remove('hide')
          }else{
              item.classList.add('hide')
          }
      })
  })

  function ThanhToan() {
    window.open("index1.html");
  }