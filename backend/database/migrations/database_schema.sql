/* Database Schema and Constraints Initialization Script

  File Name: database_schema_v4.sql

  Description
  - This script is intended for the initialization of the database, including the creation of all required table structures and foreign key constraints.

  Version
  - Version: 4.1
  - Date: November 11th, 2023

  Author
  - Lisi Cao
  
  Instructions
  - This SQL script should be run as a whole for setting up the database schema and constraints.
  - Ensure to backup existing data before running this script to prevent any data loss.

-*/
-- Create database 
CREATE DATABASE IF NOT EXISTS fsd10_tango;

-- use fsd10_tango database
USE fsd10_tango;

-- Set foreign key checks to 0
SET FOREIGN_KEY_CHECKS=0;

-- Drop tables if they already exist
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `ingredients`;
DROP TABLE IF EXISTS `recipes`;
DROP TABLE IF EXISTS `recipe_ingredients`;
DROP TABLE IF EXISTS `reviews`;

-- Set foreign key checks to 1
SET FOREIGN_KEY_CHECKS=1;

/* Create tables */


CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login_date` TIMESTAMP,
  `profile_image_path` VARCHAR(255),
  `category` VARCHAR(50),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `ingredients` (
  `ingredient_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `img_path` VARCHAR(200),
  `description` TEXT,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `recipes` (
  `recipe_id` INT NOT NULL AUTO_INCREMENT,
  `recipe_name` VARCHAR(100) NOT NULL,  
  `user_id` INT NOT NULL,
  `cooking_time` INT,
  `step_instruction` TEXT,
  `description` TEXT,
  `recipe_image_path` VARCHAR(255),  
  `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `recipe_ingredients` (
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `quantity` VARCHAR(50),
  `measurement_unit` VARCHAR(50),
  PRIMARY KEY (`recipe_id`, `ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `recipe_id` INT NOT NULL,
  `comment` TEXT NOT NULL,
  `rating` DECIMAL(10, 2) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_favorites` (
  `favorite_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`favorite_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_recipe_images` (
  `image_id` INT NOT NULL AUTO_INCREMENT,
  `recipe_id` INT NOT NULL,
  `image_path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`image_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Add foreign keys */
-- Note: Foreign key constraints are added after all tables are created to prevent errors.
ALTER TABLE `users`
ADD `username` VARCHAR(50),
ADD `bio` TEXT,
ADD `location` VARCHAR(100);

ALTER TABLE `recipes`
  ADD CONSTRAINT `fk_recipes_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE;

ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `fk_recipe_ingredients_recipes`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipes` (`recipe_id`)
    ON DELETE CASCADE,
  ADD CONSTRAINT `fk_recipe_ingredients_ingredients`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `ingredients` (`ingredient_id`)
    ON DELETE CASCADE;


ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_recipes`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipes` (`recipe_id`)
    ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE;


