describe('EventForm Component Test', () => {
    beforeEach(() => {
      // Visite la page du formulaire d'évènement
      cy.visit('/url-de-la-page-evenements'); // Remplacez par l'URL de la page où le composant EventForm est rendu
    });
  
    it('Remplit et soumet le formulaire d\'évènement avec succès', () => {
      // Remplir les champs du formulaire
      cy.get('input[name="title"]').type('Championnat National');
      cy.get('textarea[name="description"]').type('Le tournoi de l\'année avec des compétitions nationales.');
      
      // Sélectionner les épreuves
      cy.get('input[type="checkbox"][value="KATA"]').check();
      cy.get('input[type="checkbox"][value="KUMITE"]').check();
      
      // Remplir les autres champs
      cy.get('input[name="location"]').type('Paris');
      
      // Sélectionner la période de l'évènement
      cy.get('.ant-picker').first().click();
      cy.get('.ant-picker-cell-inner').contains('15').click();
      cy.get('.ant-picker-cell-inner').contains('20').click();
      
      // Sélectionner la date limite
      cy.get('.ant-picker').last().click();
      cy.get('.ant-picker-cell-inner').contains('10').click();
      
      // Remplir les champs supplémentaires
      cy.get('input[name="transport"]').type('Bus');
      cy.get('input[name="hebergement"]').type('Hôtel 3 étoiles');
      cy.get('input[name="medical_team"]').type('Equipe médicale présente sur place');
  
      // Soumettre le formulaire
      cy.get('button[type="submit"]').click();
      
      // Vérifier la notification de succès
      cy.get('.ant-notification-notice-message').should('contain', 'Évènement crée avec succès!');
    });
  });
  