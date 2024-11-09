document.addEventListener('DOMContentLoaded', function () {
    const cart = [];

    const cartItemsContainer = document.getElementById('cart-items');// Get the container for the shopping cart item list
    const totalPriceElement = document.getElementById('total-price');// Get the element that displays the total price
    const shoppingCar = document.getElementById('shopping-car');// Gets the elements of the overall cart container

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');

            const courseNameP = document.createElement('p');
            courseNameP.textContent = `${item.courseName} x${item.quantity}`; 
            courseNameP.classList.add('course-name');

            const priceInfo = `Aud ${item.price.toFixed(2)}`;  
            const priceContainer = document.createElement('div');
            const priceP = document.createElement('p');
            priceP.textContent = priceInfo;
            priceP.classList.add('price');

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.dataset.index = index;
            removeBtn.addEventListener('click', removeFromCart);

            cartItemDiv.appendChild(courseNameP);
            cartItemDiv.appendChild(priceContainer);
            cartItemDiv.appendChild(removeBtn);

            priceContainer.appendChild(priceP);  

            cartItemsContainer.appendChild(cartItemDiv);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);// Calculate the total price

        if (cart.length === 0) {
            shoppingCar.style.display = 'none';
        } else {
            shoppingCar.style.display = 'block';
        }
    }

    function addToCart(event) {
        const courseElement = event.target.parentElement.parentElement;
        const courseName = courseElement.querySelector('p:first-of-type').textContent;
        const priceStr = courseElement.querySelector('p:last-of-type').textContent.match(/\d+/)[0];
        const price = parseFloat(priceStr);

        let cartItem = cart.find(item => item.courseName === courseName);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cartItem = { courseName, price, quantity: 1 };
            cart.push(cartItem);
        }

        updateCartUI();// Update the shopping cart interface
    }

    function removeFromCart(event) {
        const index = parseInt(event.target.dataset.index);
        cart.splice(index, 1);// Remove the item from the shopping cart array
        updateCartUI();// Update the shopping cart interface
    }

    document.querySelectorAll('.add-car-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        alert(`Total Price: Aud ${totalPrice.toFixed(2)}`);
    });

    document.getElementById('clear-car-btn').addEventListener('click', () => {
        cart.splice(0, cart.length);// Empty the shopping cart array
        updateCartUI();
    });
});



/*register js*/
const btnToo = document.querySelector(".btnToo");

const userNameToo = document.querySelector(".userNameToo");
const passwordToo = document.querySelector(".passwordToo");
const confirmPassword = document.querySelector(".confirmPassword");
const email = document.querySelector(".email");
let userInfoList = [];
if (localStorage.getItem("userInfoList")) {
  userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
}
btnToo?.addEventListener("click", function () {
  if (
    userNameToo.value &&
    passwordToo.value &&
    confirmPassword.value &&
    email.value
  ) {
    if (passwordToo.value !== confirmPassword.value) {
      alert("The password must be the same");
    } else {
      if (userInfoList.length !== 0) {
        let result = userInfoList.some((i) => {
          return (
            i.userName == userNameToo.value &&
            i.password == passwordToo.value
          );
        });
        if (result) {
          alert("You have registered and are about to log in");
          window.open("./singin.html", "_self");
        } else {
          let obj = {
            userName: userNameToo.value,
            password: passwordToo.value,
          };
          userInfoList.push(obj);
          localStorage.setItem(
            "userInfoList",
            JSON.stringify(userInfoList)
          );
          alert("Registration successful, about to go to login");
          window.open("./singin.html", "_self");
        }
      } else {
        let obj = {
          userName: userNameToo.value,
          password: passwordToo.value,
        };
        userInfoList.push(obj);
        localStorage.setItem(
          "userInfoList",
          JSON.stringify(userInfoList)
        );
        alert("Registration successful, about to go to login");
        window.open("./singin.html");
      }
    }
  } else {
    alert("Please complete the registration information");
  }
});



/*singin js*/
// let userInfoListToo = [];
// if (localStorage.getItem("userInfoList")) {
//   userInfoList = JSON.parse(localStorage.getItem("userInfoList"));
// }
const btn = document.querySelector(".btn");
const tip = document.querySelector(".tip");
const userName = document.querySelector(".userName");
const password = document.querySelector(".password");
btn.addEventListener("click", function () {
  console.log(userName.value, password.value);
  if (userName.value && password.value) {
    if (userInfoList.length == 0) {
      tip.style.display = "block";
    } else {
      let result = userInfoList.some((i) => {
        return (
          i.userName == userName.value && i.password == password.value
        );
      });
      if (result) {
        tip.style.display = "none";
        window.open("./shopping.html" ,'_self');
      } else {
        tip.style.display = "block";
      }
    }
  } else {
    tip.style.display = "none";
    alert("Please complete the information ");
  }
});