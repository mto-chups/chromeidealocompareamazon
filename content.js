// Récupérer le titre du produit sur la page Idealo
let productTitleElement = document.querySelector('.oopStage-title'); // Sélecteur CSS à ajuster
if (productTitleElement) {
    let productTitle = productTitleElement.innerText;
    console.log('Produit trouvé sur Idealo:', productTitle);

    // Envoyer le nom du produit à background.js pour récupérer le prix sur Amazon
    chrome.runtime.sendMessage({ type: "FETCH_AMAZON_PRICE", title: productTitle }, function(response) {
        console.log("Réponse reçue du background script:", response); // Log de la réponse
        if (response && response.price) {
            afficherPrixAmazon(response.price);
        } else {
            console.log("Aucun prix trouvé ou erreur dans la réponse");
        }
    });
} else {
    console.log("Aucun produit trouvé sur la page Idealo.");
}

// Fonction pour afficher le prix Amazon sur la page Idealo
function afficherPrixAmazon(prix) {
    let div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.padding = '10px';
    div.style.backgroundColor = '#ff9900';
    div.style.color = '#fff';
    div.style.fontSize = '16px';
    div.innerText = `Prix sur Amazon: ${prix} €`;

    document.body.appendChild(div);
    console.log("Prix affiché sur la page:", prix);  // Log du prix affiché
}

