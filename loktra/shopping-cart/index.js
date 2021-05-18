const showCarts = async() => {
    const $cartList = document.querySelector(".cart-list");

    try {
        // fetch cart data
        const cartsData = await fetchCarts();

        const carts = cartsData.map(({ id, imageUrl, name, price, quantity }) => {
            return `
                <article class="cart-item">
                    <div class="cart-img">
                        <img src="${imageUrl}" />
                        <div class="cart-quantity"></div>
                    </div>
                    <div class="cart-info">
                        <h1>${name}</h1>
                        <span>${price}</span>
                        <span>Remove</span>
                    </div>
                </article>
            `;
        });

        $cartList.innerHTML = carts.join("");
    } catch (e) {
        console.error(e);
    }
};

const fetchCarts = async() => {
    const res = await fetch("src/assets/data/data.json");
    const data = await res.json();
    return data;
};

document.addEventListener("DOMContentLoaded", showCarts);