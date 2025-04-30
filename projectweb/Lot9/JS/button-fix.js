/**
 * Solution pour les boutons non réactifs - Gretris
 */

// Attendre le chargement complet de la page
window.addEventListener('load', function () {
    console.log('Initialisation du correctif pour les boutons...');

    // 1. Corriger les boutons avec attributs onclick
    function fixOnclickButtons() {
        const buttonsWithOnclick = document.querySelectorAll('button[onclick], .menu-button[onclick]');
        console.log(`Boutons avec onclick trouvés: ${buttonsWithOnclick.length}`);

        buttonsWithOnclick.forEach(button => {
            // Sauvegarder l'action onclick originale
            const originalOnclick = button.getAttribute('onclick');

            // Supprimer l'attribut onclick pour éviter les doublons
            button.removeAttribute('onclick');

            // Ajouter un écouteur direct
            button.addEventListener('pointerdown', function (e) {
                console.log('Bouton cliqué:', this.textContent.trim());

                // Feedback visuel immédiat
                this.classList.add('button-active');

                // Exécuter l'action originale
                if (originalOnclick.includes('window.location.href')) {
                    const hrefMatch = originalOnclick.match(/window\.location\.href=[\'\"]([^\'\"]+)[\'\"]/);
                    if (hrefMatch && hrefMatch[1]) {
                        window.location.href = hrefMatch[1];
                    }
                } else {
                    // Pour les autres types d'actions
                    new Function(originalOnclick).call(this);
                }
            }, { capture: true });
        });
    }

    // 2. Corriger les boutons de menu sans onclick
    function fixMenuButtons() {
        const menuButtons = document.querySelectorAll('.menu-button:not([onclick])');
        console.log(`Boutons de menu sans onclick trouvés: ${menuButtons.length}`);

        menuButtons.forEach(button => {
            // Ajouter un écouteur direct
            button.addEventListener('pointerdown', function (e) {
                console.log('Bouton de menu cliqué:', this.textContent.trim());

                // Feedback visuel immédiat
                this.classList.add('button-active');
                setTimeout(() => this.classList.remove('button-active'), 200);
            }, { capture: true });
        });
    }

    // 3. Correction spéciale pour les boutons de jeu
    function fixGameButtons() {
        const restartButton = document.getElementById('restartButton');
        const homeButton = document.getElementById('homeButton');

        if (restartButton) {
            // Supprimer les écouteurs existants
            const newRestartBtn = restartButton.cloneNode(true);
            restartButton.parentNode.replaceChild(newRestartBtn, restartButton);

            newRestartBtn.addEventListener('pointerdown', function (e) {
                console.log('Bouton restart cliqué');
                this.classList.add('button-active');

                if (typeof restartGame === 'function') {
                    restartGame();
                } else if (window.restartGame) {
                    window.restartGame();
                } else {
                    // Fallback au rechargement
                    window.location.reload();
                }
            }, { capture: true });
        }

        if (homeButton) {
            const newHomeBtn = homeButton.cloneNode(true);
            homeButton.parentNode.replaceChild(newHomeBtn, homeButton);

            newHomeBtn.addEventListener('pointerdown', function (e) {
                console.log('Bouton home cliqué');
                this.classList.add('button-active');
                window.location.href = 'home.php';
            }, { capture: true });
        }
    }

    // 4. Éviter les interférences avec les écouteurs globaux
    // Modifier la fonction fixGlobalEventHandlers comme suit:
    function fixGlobalEventHandlers() {
        // Créer un écouteur d'événement global qui s'exécute avant les autres
        document.addEventListener('click', function (event) {
            // Ignorer les clics sur les boutons pour éviter les conflits
            // SAUF pour le bouton d'engrenage des paramètres
            if ((event.target.tagName === 'BUTTON' ||
                event.target.classList.contains('menu-button') ||
                event.target.closest('button') ||
                event.target.closest('.menu-button'))
                && !event.target.classList.contains('settings-gear')
                && !event.target.closest('.settings-gear')) {

                // Éviter d'interférer avec les clics de boutons ordinaires
                event.stopPropagation();
            }
        }, { capture: true, passive: false });
    }

    // Ajouter cette nouvelle fonction dans le fichier button-fix.js
    function fixSettingsGear() {
        const settingsGear = document.getElementById('settingsGear');
        const settingsDropdown = document.getElementById('settingsDropdown');

        if (settingsGear && settingsDropdown) {
            // Supprimer les écouteurs existants
            const newGearBtn = settingsGear.cloneNode(true);
            settingsGear.parentNode.replaceChild(newGearBtn, settingsGear);

            // Ajouter de nouveaux écouteurs
            newGearBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                settingsDropdown.classList.toggle('show');
                console.log('Menu déroulant toggled:', settingsDropdown.classList.contains('show'));
            }, { capture: false });

            // S'assurer que le clic ailleurs ferme le menu
            document.addEventListener('click', function (event) {
                if (!newGearBtn.contains(event.target) && !settingsDropdown.contains(event.target)) {
                    settingsDropdown.classList.remove('show');
                }
            }, { capture: false });
        }
    }

    // Puis appelez cette fonction à la fin du script avec les autres:
    fixSettingsGear();

    // Exécuter toutes les fonctions de correction
    fixOnclickButtons();
    fixMenuButtons();
    fixGameButtons();
    fixGlobalEventHandlers();

    // Marquer que les boutons sont améliorés
    document.body.classList.add('buttons-enhanced');
    console.log('Correctif des boutons appliqué');
});