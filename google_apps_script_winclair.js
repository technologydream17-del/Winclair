// ============================================================
// GOOGLE APPS SCRIPT — WINCLAIR QUIZ
// À coller dans : script.google.com > Nouveau projet
// ============================================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Créer les en-têtes si la feuille est vide
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Date', 'Prénom', 'Nom', 'Email', 'WhatsApp',
        'Ville', 'Score', 'Pourcentage', 'Niveau', 'Étape', 'Source'
      ]);
      // Mettre en gras les en-têtes
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#1B3A8C').setFontColor('#FFFFFF');
    }

    // Ajouter la ligne de données
    sheet.appendRow([
      data.date || new Date().toLocaleString('fr-FR'),
      data.prenom || '',
      data.nom || '',
      data.email || '',
      data.whatsapp || '',
      data.ville || '',
      data.score || '',
      data.pourcentage || '',
      data.niveau || '',
      data.etape || '',
      data.source || 'Quiz WINCLAIR'
    ]);

    // Retourner succès
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'OK' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ERROR', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fonction de test — exécute manuellement pour tester
function testScript() {
  const fakeData = {
    postData: {
      contents: JSON.stringify({
        prenom: 'Test',
        nom: 'Utilisateur',
        email: 'test@gmail.com',
        whatsapp: '+22507000000',
        ville: 'Abidjan',
        score: '7/10',
        pourcentage: '70%',
        niveau: 'Avancé',
        etape: 'RESULTAT',
        source: 'Quiz WINCLAIR',
        date: new Date().toLocaleString('fr-FR')
      })
    }
  };
  doPost(fakeData);
  Logger.log('Test réussi — vérifie ta Google Sheet !');
}
