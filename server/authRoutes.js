const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('./db');

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, is_restaurant_owner } = req.body;

    // Vérification des champs obligatoires
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs obligatoires' });
    }

    // Vérifier si l'email existe déjà
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion du nouvel utilisateur
    const [result] = await pool.execute(
      'INSERT INTO users (firstName, lastName, email, password_hash, is_restaurant_owner) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, is_restaurant_owner ? 1 : 0]
    );

    return res.status(201).json({ 
      success: true, 
      message: 'Utilisateur créé avec succès',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'inscription' 
    });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification des champs obligatoires
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs' });
    }

    // Recherche de l'utilisateur par email
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }

    const user = users[0];

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }

    // Supprimer le mot de passe haché des informations à renvoyer
    const { password_hash, ...userInfo } = user;

    return res.status(200).json({
      success: true,
      user: userInfo
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la connexion' 
    });
  }
});

module.exports = router; 