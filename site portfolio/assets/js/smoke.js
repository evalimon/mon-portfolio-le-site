document.addEventListener("DOMContentLoaded", () => {
    // Créer et insérer le conteneur pour la fumée
    let smokeContainer = document.querySelector(".smoke-container");
    if (!smokeContainer) {
        smokeContainer = document.createElement("div");
        smokeContainer.classList.add("smoke-container");
        document.body.appendChild(smokeContainer);
    }

    // Ajouter les styles CSS dynamiquement
    const style = document.createElement("style");
    style.textContent = `
        /* Conteneur principal pour la fumée */
        .smoke-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none; 
            z-index: 9999; /* Place la fumée au-dessus de tout */
            overflow: visible; /* Permet à la fumée de dépasser les limites */
        }

        /* Style des cercles de fumée */
        .smoke {
            position: absolute;
            bottom: -50px; /* Commence en bas de l'écran */
            width: 100px;
            height: 100px;
            background: rgba(179, 67, 53, 0.555); /* Couleur blanche semi-transparente */
            border-radius: 30%;
            filter: blur(20px); /* Flou pour l'effet de fumée */
            animation: rise 8s infinite ease-in-out, drift 8s infinite ease-in-out;
        }

        /* Animation pour faire monter la fumée */
        @keyframes rise {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) scale(1.5);
                opacity: 0;
            }
        }

        /* Animation pour faire zigzaguer la fumée */
        @keyframes drift {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(30px);
            }
            50% {
                transform: translateX(-30px);
            }
            75% {
                transform: translateX(20px);
            }
            100% {
                transform: translateX(-20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Fonction pour créer un cercle de fumée
    function createSmoke() {
        const smoke = document.createElement("div");
        smoke.classList.add("smoke");

        // Position aléatoire
        smoke.style.left = `${Math.random() * 100}vw`;
        smoke.style.animationDelay = `${Math.random() * 5}s`;

        smokeContainer.appendChild(smoke);

        // Supprimer la fumée après l'animation
        setTimeout(() => {
            smoke.remove();
        }, 8000); // Durée de l'animation
    }

    // Générer de la fumée toutes les 2 secondes
    setInterval(createSmoke, 2000);
});