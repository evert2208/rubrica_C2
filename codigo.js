document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.getElementById("card-container");
    const filter = document.getElementById("filter");

    // Función para cargar las cards desde la API
    async function getCards() {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        const data = await response.json();
        cardContainer.innerHTML = "";

        data.slice(0, 12).forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${item.thumbnailUrl}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>id: ${item.id}</p>
            `;
            cardContainer.appendChild(card);


            const option = document.createElement("option");
            option.value = index;
            option.textContent = item.title;
            filter.appendChild(option);
        });
    }

    getCards();

    filter.addEventListener("change", function() {
        const selectIndex = filter.value;
        const cards = cardContainer.querySelectorAll(".card");

        cards.forEach((card, index) => {
            if (selectIndex === "all" || index === parseInt(selectIndex)) {
                card.style.display = "grid";
            } else {
                card.style.display = "none";
            }
        });
    });
});