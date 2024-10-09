import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { createClient } from '@supabase/supabase-js';
import './TournamentView.css'; // Ajoutez un fichier CSS pour le style personnalisé

// Initialisation de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TournamentDraw = () => {
  const [athletes, setAthletes] = useState([]);
  const [bracket, setBracket] = useState([]);

  // Charger les athlètes depuis la base de données
  useEffect(() => {
    const fetchAthletes = async () => {
      const { data, error } = await supabase.from('athlete_club').select('last_name, club');
      if (error) {
        message.error('Erreur lors de la récupération des athlètes.');
        console.error('Erreur:', error);
      } else {
        setAthletes(data);
      }
    };

    fetchAthletes();
  }, []);

  // Mélange aléatoire des athlètes
  const shuffleAthletes = (athletes) => {
    let shuffled = [...athletes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Générer un arbre de tournoi à partir des athlètes
  const generateDraw = (athletes) => {
    let shuffled = shuffleAthletes(athletes);

    // Retirer la condition qui évite les affrontements entre athlètes du même club

    const bracketData = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      bracketData.push({
        key: i / 2,
        player1: shuffled[i]?.last_name,
        player2: shuffled[i + 1]?.last_name,
        club1: shuffled[i]?.club,
        club2: shuffled[i + 1]?.club,
        winner: null, // On met à jour après les matchs
      });
    }

    return bracketData;
  };

  // Gérer le clic pour générer l'arbre de tournoi
  const handleGenerateBracket = () => {
    if (athletes.length < 2) {
      message.warning('Pas assez d\'athlètes pour générer un tournoi.');
      return;
    }

    const generatedBracket = generateDraw(athletes);
    setBracket(generatedBracket);
    message.success('Arbre de tournoi généré avec succès.');
  };

  // Fonction pour choisir un gagnant (simulé)
  const selectWinner = (index, winner) => {
    const updatedBracket = [...bracket];
    updatedBracket[index].winner = winner;
    setBracket(updatedBracket);
  };

  return (
    <div className="tournament-view">
      <h2>Arbre de tournoi</h2>
      
      {/* Bouton pour générer le tournoi */}
      <Button type="primary" onClick={handleGenerateBracket} style={{ marginBottom: '20px' }}>
        Générer l'arbre de tournoi
      </Button>

      {/* Afficher l'arbre de tournoi généré */}
      <div className="bracket-container">
        {bracket.length > 0 && bracket.map((match, index) => (
          <div key={index} className="bracket-match">
            <div className={`player ${match.winner === match.player1 ? 'winner' : ''}`}>
              {match.player1} <span className="club">({match.club1})</span>
            </div>
            <div className="versus">vs</div>
            <div className={`player ${match.winner === match.player2 ? 'winner' : ''}`}>
              {match.player2} <span className="club">({match.club2})</span>
            </div>
            <div className="actions">
              <Button onClick={() => selectWinner(index, match.player1)}>Gagnant: {match.player1}</Button>
              <Button onClick={() => selectWinner(index, match.player2)}>Gagnant: {match.player2}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentDraw;
