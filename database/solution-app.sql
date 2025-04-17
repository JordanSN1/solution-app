CREATE DATABASE IF NOT EXISTS solution;
USE solution;

-- Création des tables
CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT 0,
    is_restaurant_owner BOOLEAN DEFAULT 0
);

CREATE TABLE restaurants (
    id_restaurant INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    ville VARCHAR(50) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE plats (
    id_plat INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    isCharity BOOLEAN DEFAULT 0,
    id_restaurant INT NOT NULL,
    FOREIGN KEY (id_restaurant) REFERENCES restaurants(id_restaurant)
);

CREATE TABLE reservations (
    id_reservation INT PRIMARY KEY AUTO_INCREMENT,
    reservation_date DATETIME NOT NULL,
    id_user INT NOT NULL,
    id_restaurant INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_restaurant) REFERENCES restaurants(id_restaurant)
);

CREATE TABLE appartenir (
    id_plat INT,
    id_reservation INT,
    quantite INT DEFAULT 1,
    PRIMARY KEY (id_plat, id_reservation),
    FOREIGN KEY (id_plat) REFERENCES plats(id_plat),
    FOREIGN KEY (id_reservation) REFERENCES reservations(id_reservation)
);

CREATE TABLE dons (
    id_dons INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT,
    amount DECIMAL(10,2) NOT NULL,
    donation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_restaurant INT NOT NULL,
    id_user INT NOT NULL,
    FOREIGN KEY (id_restaurant) REFERENCES restaurants(id_restaurant),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

-- Indexes optionnels pour améliorer les performances
CREATE INDEX idx_restaurants_ville ON restaurants(ville);
CREATE INDEX idx_plats_restaurant ON plats(id_restaurant);