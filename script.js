// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Search toggle
const searchBtn = document.getElementById('search-btn');
const searchDropdown = document.getElementById('search-dropdown');

searchBtn.addEventListener('click', () => {
    searchDropdown.classList.toggle('hidden');
});

// Cart functionality
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const continueShopping = document.getElementById('continue-shopping');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Toggle cart sidebar
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
    cartSidebar.classList.add('translate-x-0');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-0');
    cartSidebar.classList.add('translate-x-full');
});

continueShopping.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-0');
    cartSidebar.classList.add('translate-x-full');
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Show cart sidebar
        cartSidebar.classList.remove('translate-x-full');
        cartSidebar.classList.add('translate-x-0');
        
        // Animation feedback
        button.textContent = 'Added!';
        button.classList.add('bg-green-600');
        button.classList.remove('bg-yellow-600');
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.classList.remove('bg-green-600');
            button.classList.add('bg-yellow-600');
        }, 1500);
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `Ksh ${totalPrice.toLocaleString()}`;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center py-8 text-gray-500">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'py-6 flex cart-item';
        cartItem.innerHTML = `
            <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-center object-cover">
            </div>
            <div class="ml-4 flex-1 flex flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>${item.name}</h3>
                        <p class="ml-4">Ksh ${item.price.toLocaleString()}</p>
                    </div>
                </div>
                <div class="flex-1 flex items-end justify-between text-sm">
                    <div class="flex items-center border border-gray-300 rounded-md">
                        <button class="decrease-quantity px-2 py-1 text-gray-600" data-id="${item.id}">-</button>
                        <span class="px-2 quantity">${item.quantity}</span>
                        <button class="increase-quantity px-2 py-1 text-gray-600" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item font-medium text-yellow-600 hover:text-yellow-500" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            
            updateCart();
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            item.quantity += 1;
            updateCart();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Initialize empty cart
updateCart();