async function loadUpgrades() {
    try {
        const response = await fetch('/js/cards.json');
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();

        const dolereanUpg = data.dolerean || [];
        const dolereanRev = data.reviews || [];

        DisplayUpgCards(dolereanUpg);
        DisplayReviews(dolereanRev);

    }   catch (err) {
        console.error('Error loading JSON:', err);
    }

}

document.addEventListener('DOMContentLoaded', loadUpgrades());

function DisplayUpgCards(dolereanUpg) {
    const container = document.querySelector(".upgrade-cards");
    if (!container) return;
    container.innerHTML = "";

    dolereanUpg.forEach(upgrade => {
        const upgCard = document.createElement("section");

        const cardFigure = document.createElement("figure");
        cardFigure.classList.add("card");
        cardFigure.innerHTML = `
            <img src="${upgrade.image}" alt="${upgrade.title}">
            <figcaption>${upgrade.title}</figcaption>
        `;
        upgCard.appendChild(cardFigure);
        container.appendChild(upgCard);
    });
}

function DisplayReviews(dolereanRev) {
    const container = document.querySelector(".reviews");
    if (!container) return;
    container.innerHTML = "";

    const list = document.createElement("ul");
    list.classList.add("review-list");

    dolereanRev.forEach(review => {
        const dreview = document.createElement("li");

        dreview.textContent = review.review;

        list.appendChild(dreview);
    });

    container.appendChild(list);
}