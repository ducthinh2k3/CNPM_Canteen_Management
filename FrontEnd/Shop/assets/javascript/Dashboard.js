const openShopping = document.querySelector(".shopping"),
    closeShopping = document.querySelector(".closeShopping"),
    body = document.querySelector("body"),
    list = document.querySelector(".list"),
    listCard = document.querySelector(".listCard"),
    total = document.querySelector(".total"),
    quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [];

async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:3000/api/admin/dashboard')
        const data = await res.json();
        products = data;
        initApp();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

let listCards = [];
let cartItems = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "http://localhost:3000/images/products/${value.HinhAnh}">
            <div class ="title">${value.TenSP}</div>
            <div class="price">${value.GiaBan.toLocaleString()}</div>
            <div class="btn">
                <button class="add">Thêm món</button>
                <a href="Review.html?id=${value.MaSP}" "color"="white" "text-decoration"="none">
                    <button class="detail">Đánh giá</button>
                </a>
            </div>
        `;
        list.appendChild(newDiv)
    })

    document.querySelectorAll('.add').forEach((button, key) => {
        button.addEventListener('click', () => addToCard(key));
    });
}

fetchProducts();

const addToCard = key => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);

        cartItems.push({
            productId: listCards[key].MaSP,
            quantity: listCards[key].quantity,
        });
        // Lưu cartItems vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    reloadCard()
}


const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.GiaBan;
        count = count + value.quantity;

        if (value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "http://localhost:3000/images/products/${value.HinhAnh}"></div>
                <div class = "cardTitle">${value.TenSP}</div>
                <div class = "cardPrice">${value.GiaBan.toLocaleString()}</div>

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

        // Chuyển đổi total thành số và lưu vào localStorage
        const numericTotal = parseFloat(total.innerText.replace(/\./g, '')); // Xóa dấu phẩy và chuyển đổi thành số
        localStorage.setItem("NumericSubTotal", numericTotal);
    })
}

const changeQuantity = (key, quantity) => {
    const indexToUpdate = cartItems.findIndex(item => item.productId === listCards[key].MaSP);

    if (quantity == 0) {
        if (indexToUpdate  !== -1) {
            cartItems.splice(indexToUpdate , 1);
        }

        delete listCards[key];
        total.innerText = 0;
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].GiaBan = quantity * products[key].GiaBan;

        if (indexToUpdate  !== -1) {
            // Nếu sản phẩm có trong cartItems, cập nhật số lượng
            cartItems[indexToUpdate ].quantity = quantity;
        } else {
            // Nếu không có trong cartItems, thêm mới vào
            cartItems.push({
                productId: listCards[key].MaSP,
                quantity: quantity,
            });
        }
    }
    // Lưu cartItems vào localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    reloadCard()
}

function detail() {
    window.open("Review.html");
}

//Search Product
var searchInput = document.querySelector('.search input')
searchInput.addEventListener('input', function (e) {
    let txtSearch = e.target.value.trim().toLowerCase()
    let listProductDOM = document.querySelectorAll('.item')
    listProductDOM.forEach(item => {
        if (item.innerText.toLowerCase().includes(txtSearch)) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
})

function ThanhToan() {
    window.open("index1.html");
}
