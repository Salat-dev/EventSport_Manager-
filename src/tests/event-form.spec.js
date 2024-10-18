const { test, expect } = require('@playwright/test');

test.describe('Event Form Tests', () => {

  // Test pour vérifier si la page du formulaire se charge correctement
  test('Page Load and Form Submission', async ({ page }) => {
    // Naviguer vers la page où le formulaire est affiché
    await page.goto('http://localhost:3000/evenement'); // Assurez-vous de remplacer par votre URL.

    // Vérifier que les éléments de base du formulaire sont présents
    await expect(page.locator('text="Titre de l\'évènement"')).toBeVisible();
    await expect(page.locator('text="Description"')).toBeVisible();

    // Remplir le formulaire
    await page.fill('input[name="title"]', 'Tournoi de Karaté');
    await page.fill('textarea[name="description"]', 'Un tournoi de karaté pour tous les niveaux.');
    await page.check('input[value="KATA"]');
    await page.fill('input[name="location"]', 'Paris, France');
    
    // Sélectionner une période avec le RangePicker
    const dateSelector = page.locator('.ant-picker-input input'); // Sélectionne les inputs de la période
    await dateSelector.first().click(); // Ouvrir le date picker
    await page.click('text="20"'); // Sélectionner une date
    await page.click('text="25"'); // Sélectionner une autre date (fin)

    // Sélectionner une date limite d'inscription
    await page.fill('input[name="deadline"]', '2024-12-01');
    
    // Remplir les champs optionnels
    await page.fill('input[name="transport"]', 'Bus');
    await page.fill('input[name="hebergement"]', 'Hotel XYZ');
    await page.fill('input[name="medical_team"]', 'Équipe médicale 1');

    // Soumettre le formulaire
    await page.click('button[type="submit"]');

    // Vérifier la notification de succès
    await expect(page.locator('.ant-notification-notice-success')).toBeVisible();
  });
});
