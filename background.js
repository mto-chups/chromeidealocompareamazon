let latestPrice = null;  // Stocke le dernier prix récupéré

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message reçu dans le background script:", message);  // Log du message reçu

    if (message.type === "FETCH_AMAZON_PRICE") {
        let productTitle = message.title;
        console.log("Requête pour récupérer le prix de:", productTitle);

        // Appel à ton backend pour obtenir le prix Amazon
        fetch(`http://localhost:3000/amazon-price?query=${encodeURIComponent(productTitle)}`)
            .then(response => {
                console.log("Réponse brute du serveur:", response); // Log de la réponse brute

                if (!response.ok) {
                    throw new Error("Erreur dans la réponse du serveur: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Données JSON reçues du serveur:", data);  // Log des données JSON reçues
                latestPrice = data.price;  // Stocke le dernier prix
                sendResponse({ price: data.price });
            })
            .catch(error => {
                console.error("Erreur lors de la requête au serveur:", error);
                sendResponse({ price: null });
            });
    }

    // Gère la demande de la popup
    if (message.type === "GET_PRICE") {
        sendResponse({ price: latestPrice });
    }
    
    return true; // Important pour rendre la réponse asynchrone
});
