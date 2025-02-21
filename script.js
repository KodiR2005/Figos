const products = [
    { 
        type: "Natures Pick",
        name: "Bramley Apple Each",
            code: "34",
                price: "£0.59", 
    },
    {
        type: "Natures Pick",
        name: "Banana Each",
            code: "17",
                price: "£0.16",
    },
    {
        type: "Natures Pick",
        name: "Red Pepper Each",
            code: "275192",
                price: "£0.59"
    },
    {
        type: "Natures Pick",
        name: "Spring Onion", 
            code: "24", 
                price: "£0.69" 
    },
    {
        type: "Natures Pick",
        name: "Small Cucumber", 
            code: "23", 
                price: "£0.89" 
    },
    { 
        type: "Natures Pick",
        name: "Watermelon", 
            code: "30",
            price: "£2.99" 
    },
    { 
        type: "Natures Pick",
        name: "Potato Each", 
            code: "22",
            price: "£0.24" 
    },
    { 
        type: "Natures Pick",
        name: "Sweet Potato Each", 
            code: "33",
            price: "£0.69" 
    },
    { 
        type: "Natures Pick",
        name: "Pinapple", 
            code: "19", 
                price: "£0.99" 
    },
    { 
        type: "Natures Pick",
        name: "Aubergine", 
            code: "21", 
                price: "£0.95" 
    },
    { 
        type: "Natures Pick",
        name: "Grapefruit", 
            code: "4", 
                price: "£0.49" 
    },
    { 
        type: "Natures Pick",
        name: "Butternut Squash", 
            code: "45", 
                price: "£0.95" 
    },
    {
        type: "Natures Pick",
        name: "Swede", 
            code: "7", 
                price: "£0.62" 
    },
    {
        type: "Aldi",
        name: "Disposable Bag", 
            code: "5", 
                price: "£0.10" 
    },
    {
        type: "Aldi",
        name: "Reuseable Bag", 
            code: "9", 
                price: "£0.30" 
    },
    {  type: "Aldi",
        name: "Bag For Life", 
            code: "38", 
                price: "£0.65" 
    },
    { 
        type: "Natures Pick",
        name: "Broccoli", 
            code: "39", 
                price: "£0.79" 
    },
    {
        type: "Ashfields",
        name: "Lamb Chops", 
            code: "386432", 
                price: "£4.99" 
    },
    { 
        type: "Aqua Vale",
        name: "6Pk Spring Water", 
            code: "452105", 
                price: "£2.29" 
    },
    { 
        type: "Aqua Vale",
        name: "12Pk Spring Water", 
            code: "44203", 
                price: "£1.79" 
    },
    { 
        type: "Aqua Vale",
        name: "4Pk Sparkling Water", 
            code: "6189", 
                price: "£1.55" 
    },
    { type: "Grapevine",
        name: "(White) Chardonnay", 
            code: "544229", 
                price: "£3.99" 
    },
    {
        type: "Natures Pick",
        name: "Large Avacado Each", 
            code: "68", 
                price: "£0.95" 
    },
    {
        type: "Natures Pick",
        name: "Red/White Cabbage Each", 
            code: "27", 
                price: "£0.75" 
    },

    // Add more products here
];

const searchBar = document.getElementById("search-bar");
const suggestionsList = document.getElementById("suggestions-list");

const questionBar = document.getElementById("question-bar");
const answerSection = document.getElementById("answer-section");

searchBar.addEventListener("input", function() {
    const query = searchBar.value.toLowerCase();
    suggestionsList.innerHTML = ""; // Clear the suggestions list

    if (query) {
        // Filter products based on whether the query appears anywhere in the product name
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) // This checks if the query is anywhere in the product name
        );

        // If products match, display them
        filteredProducts.forEach(product => {
            const listItem = document.createElement("li");
            listItem.innerHTML = highlightMatch(product.name, query); // Highlight matched part
            listItem.innerHTML += ` <span class="code">${product.code}</span>`; // Append code in red
            listItem.innerHTML += ` <span class="price">${product.price}</span>`; // Append price in blue
            listItem.innerHTML += ` <span class="type">${product.type}</span>`; // Append type in green
        
            suggestionsList.appendChild(listItem);
            if (product.image) {
                const productImage = document.createElement("img");
                productImage.src = product.image;
                productImage.alt = product.name;
                productImage.classList.add("product-image");
                listItem.appendChild(productImage);
            }
        });
    }
});

// Function to highlight the matching part of the product name
function highlightMatch(productName, query) {
    const startIndex = productName.toLowerCase().indexOf(query);
    const endIndex = startIndex + query.length;

    if (startIndex !== -1) {
        // Split the product name into three parts: before the match, the match, and after the match
        const beforeMatch = productName.slice(0, startIndex);
        const match = productName.slice(startIndex, endIndex);
        const afterMatch = productName.slice(endIndex);

        // Return the product name with the matched part highlighted
        return `${beforeMatch}<span class="highlight">${match}</span>${afterMatch}`;
    }

    return productName;
}

// Sort products by price
function sortProductsByPrice() {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
}

// Function to display product details when clicked
function showProductDetails(product) {
    productDetails.style.display = "block"; // Show the details section
    productDetails.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}">
        <p><strong>Code:</strong> ${product.code}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p><strong>Description:</strong> ${product.description}</p>
    `;
}

// Answering questions in the second search bar
        questionBar.addEventListener("input", function() {
    const query = questionBar.value.toLowerCase();
    answerSection.style.display = "none"; // Hide the answer section initially

    if (query) {
        // Simple hardcoded answers based on the question
        const answers = {
            "eggs waste": "A week after (BB) date = WASTE - WITHIN the week after (BB) date = CHARITY - NEVER place in PRODUCE QUALITY - take quality of the eggs into account.",
            "waste": "Damaged bread, chilled chiller products, empty/open ambient/specials products (beyond being taped), empty produce boxes/packets. (See 'eggs waste' for further information)",
            "charity": "Bread, ambient produce, flowers, specials products (beyond being sold). (See 'eggs waste' for further information)",
            "produce quality": "Chilled produce",
            "milk waste": "Expense it",
            "alarm code": "12340 = OFF - 12343 = ON",
            "specials spaces": "Not till 16:00",
            "specials food": "Not till 19:00",
            "till money limit": "£500",
            "till drop": "All 20s, Leave 3 10s",
            "close till": "1 code",
            "logout till": "2 code",
            "add money till": "3 code",
            "Store Number": "CO96",
            "oe": "How many hours we get",
        };

        const answer = answers[query.toLowerCase()];
        if (answer) {
            answerSection.style.display = "block"; // Show the answer section
            answerSection.textContent = answer; // Display the answer
            
            function normalizeQuery(query) {
                // Convert the query to lowercase and remove unnecessary words
                const removeWords = ["what", "is", "the", "to", "of", "a", "an", "on", "for"];
                const normalizedQuery = query.toLowerCase().split(' ').filter(word => !removeWords.includes(word)).join(' ');
            
                return normalizedQuery;
            }
        }
}
    });
