type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

let products: Product[] = [];
let productId = 0;

// Cargar productos desde localStorage al iniciar
const loadProducts = () => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
        products = JSON.parse(savedProducts);
        productId = products.length ? products[products.length - 1].id + 1 : 0;
        displayInventory();
    }
};

// Guardar productos en localStorage
const saveProducts = () => {
    localStorage.setItem("products", JSON.stringify(products));
};

const addProduct = () => {
    const productInput = document.getElementById("productInput") as HTMLInputElement;
    const priceInput = document.getElementById("priceInput") as HTMLInputElement;
    const categoryInput = document.getElementById("categoryInput") as HTMLInputElement;
    const productName = productInput.value.trim();
    const productPrice = parseFloat(priceInput.value);
    const productCategory = categoryInput.value.trim();

    if (productName && !isNaN(productPrice) && productCategory) {
        const newProduct: Product = { id: productId++, name: productName, price: productPrice, category: productCategory };
        products = [...products, newProduct];
        productInput.value = '';
        priceInput.value = '';
        categoryInput.value = '';
        displayInventory();
        saveProducts();
    }
};

const displayInventory = () => {
    const inventoryList = document.getElementById("inventory-list");
    const inventoryReport = document.getElementById("inventory-report");

    inventoryList!.innerHTML = "<h2>Lista de Inventario:</h2>";
    products.forEach(product => {
        inventoryList!.innerHTML += `
            <p>
                ${product.name} - $${product.price.toFixed(2)} - ${product.category}
                <button onclick="removeProduct(${product.id})">Eliminar</button>
            </p>`;
    });

    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    const categoryCount = products.reduce((count, product) => {
        count[product.category] = (count[product.category] || 0) + 1;
        return count;
    }, {} as { [key: string]: number });

    inventoryReport!.innerHTML = `
        <h3>Informe del Inventario</h3>
        <p>Valor Total: $${totalValue.toFixed(2)}</p>
        <p>Categorías:</p>
        <ul>${Object.entries(categoryCount).map(([category, count]) => `<li>${category}: ${count}</li>`).join('')}</ul>`;
};

const removeProduct = (productId: number) => {
    products = products.filter(product => product.id !== productId);
    displayInventory();
    saveProducts();
};

// Inicializar las tareas cargadas desde localStorage
loadProducts();

(window as any).addProduct = addProduct;
(window as any).removeProduct = removeProduct;
