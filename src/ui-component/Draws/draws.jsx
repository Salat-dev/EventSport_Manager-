import React, { useState } from 'react';

function TirageAuSort({ equipes }) {
  const [resultats, setResultats] = useState([]);

  const handleTirage = (typeTirage) => {
    // Logique de tirage au sort ici
    // ... dans la fonction handleTirage

 const handleTirage = (typeTirage) => {
    let nouveauxResultats = [];
  
    if (typeTirage === 'matchs') {
      // Mélanger le tableau des équipes
      const equipesMelangees = equipes.sort(() => 0.5 - Math.random());
      // Créer les paires
      for (let i = 0; i < equipesMelangees.length; i += 2) {
        nouveauxResultats.push(`${equipesMelangees[i]} vs ${equipesMelangees[i + 1]}`);
      }
    } else if (typeTirage === 'classement') {
      const indexAleatoire = Math.floor(Math.random() * equipes.length);
      nouveauxResultats = [equipes[indexAleatoire]];
    }
  
    setResultats(nouveauxResultats);
  };
    setResultats(nouveauxResultats);
  };

  return (
    <div>
      <button onClick={() => handleTirage('matchs')}>Tirage par matchs</button>
      <button onClick={() => handleTirage('classement')}>Classement direct</button>
      <ul>
        {resultats.map((resultat, index) => (
          <li key={index}>{resultat}</li>
        ))}
      </ul>
    </div>
  );
}
export default TirageAuSort;

