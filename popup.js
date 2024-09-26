document.addEventListener('DOMContentLoaded', function () {
    console.log("Popup ouverte, demande de prix envoyée.");
    
    // Envoie une requête au background pour récupérer le prix
    chrome.runtime.sendMessage({ type: "GET_PRICE" }, function(response) {
        console.log("Réponse reçue dans la popup:", response); // Ajoute un log pour voir la réponse

        if (response && response.price) {
            document.getElementById('price-display').innerText = `Prix sur Amazon: ${response.price} €`;
        } else {
            document.getElementById('price-display').innerText = "Prix non disponible";
            console.log("Erreur: Aucun prix reçu ou problème dans la réponse.");
        }
    });
});
