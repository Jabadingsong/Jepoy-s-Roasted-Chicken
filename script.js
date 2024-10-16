document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.navigation');

    navToggle.addEventListener('click', () => {
        navigation.classList.toggle('active'); // Toggle active class for showing/hiding
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = {}; // To track items in the cart
    const cartItemsContainer = document.querySelector('.cart-items'); // Container for cart items
    const cartTotal = document.querySelector('.total-price'); // Element to display total price
    const checkoutButton = document.querySelector('.checkout'); // Select the checkout button

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemDetails = button.parentElement;
            const itemName = itemDetails.querySelector('h3').innerText;
            const itemPrice = parseFloat(itemDetails.querySelector('.price').innerText.replace('$', ''));

            // Check if item is already in cart
            if (cartItems[itemName]) {
                cartItems[itemName].quantity += 1; // Increase quantity
            } else {
                // Create new item entry
                cartItems[itemName] = {
                    price: itemPrice,
                    quantity: 1,
                    image: itemDetails.previousElementSibling.src // Get the image source
                };
            }

            updateCart(); // Update the cart display
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0; // Initialize total price

        for (const itemName in cartItems) {
            const { price, quantity, image } = cartItems[itemName];
            total += price * quantity; // Calculate total price

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${image}" alt="${itemName}" class="cart-image">
                <div class="cart-details">
                    <h3>${itemName}</h3>
                    <p class="price">$${price.toFixed(2)}</p>
                    <div class="quantity">
                        <button class="decrease">-</button>
                        <span>${quantity}</span>
                        <button class="increase">+</button>
                        <button class="remove">Remove</button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Add event listeners for quantity adjustment
            cartItem.querySelector('.increase').addEventListener('click', () => {
                cartItems[itemName].quantity += 1;
                updateCart();
            });

            cartItem.querySelector('.decrease').addEventListener('click', () => {
                if (cartItems[itemName].quantity > 1) {
                    cartItems[itemName].quantity -= 1;
                } else {
                    delete cartItems[itemName]; // Remove item if quantity is 0
                }
                updateCart();
            });

            cartItem.querySelector('.remove').addEventListener('click', () => {
                delete cartItems[itemName]; // Remove item from cart
                updateCart();
            });
        }

        cartTotal.innerText = `$${total.toFixed(2)}`; // Update total price
    }
});
