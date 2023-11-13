/*
Database Table Seeding Script

File Name: database_seeds.sql

Description
    - This script provides the initial data seeding for all the tables in the database.

Version
- Version: 4.0
- Date: November 11th, 2023

Author
- Lisi Cao

Instructions
- This SQL script should be run after the database schema has been initialized.
- Please review the default data and adjust as needed for your application.

*/

-- use fsd10_tango database
USE fsd10_tango;

-- Set foreign key checks to 0
SET FOREIGN_KEY_CHECKS=0;

-- Truncate tables if they already exist
TRUNCATE TABLE `users`;
TRUNCATE TABLE `ingredients`;
TRUNCATE TABLE `recipes`;
TRUNCATE TABLE `recipe_ingredients`;
TRUNCATE TABLE `reviews`;

-- Set foreign key checks to 1
SET FOREIGN_KEY_CHECKS=1;

/* Insert data into tables */

-- Example records for 'users' table
INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `profile_image_path`, `category`) VALUES ('Alice','M', 'alice@email.com', '$2y$10$tPuc1Ky6wRvokSCIA9Kn7usdBBuAUqPrdiDAiWS6az08HzZOkfCyW', '/path/to/image1.jpg', 'admin');
INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `profile_image_path`, `category`) VALUES ('Bob','T', 'bob@email.com', '$2y$10$Ak00HlPFxl9joK4Mcb8G9.wzkRZK256VprgEPNbIsO3yQOPTR/UZO', '/path/to/image2.jpg', 'user');
INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `profile_image_path`) VALUES ('Charlie','C', 'charlie@email.com', '$2y$10$tUhio9IUZ.bmWY1OLRfLiO6gV5fo0NBhThhav8vFfKCrn91iXz2rO', '/path/to/image3.jpg');

-- Example records for 'ingredients' table
INSERT INTO `ingredients` (`name`, `img_path`, `description`) VALUES
('Tomato', '/path/to/tomato.jpg', 'A red juicy fruit used in cooking.'),
('Potato', '/path/to/potato.jpg', 'A starchy tuber, versatile in cooking.'),
('Onion', '/path/to/onion.jpg', 'A bulbous plant used to add flavor.');


-- Example records for 'recipes' table
INSERT INTO `recipes` (`recipe_name`, `user_id`, `cooking_time`, `step_instruction`, `description`, `recipe_image_path`) VALUES
('Tomato Soup', 1, 30, 'Step-by-step instructions for Tomato Soup.', 'A delicious tomato soup.', '/path/to/tomato_soup.jpg'),
('Potato Salad', 2, 20, 'Step-by-step instructions for Potato Salad.', 'A creamy potato salad.', '/path/to/potato_salad.jpg'),
('Onion Pie', 3, 45, 'Step-by-step instructions for Onion Pie.', 'A savory onion pie.', '/path/to/onion_pie.jpg');


-- Example records for 'recipe_ingredients' table
-- Assuming each recipe uses all the ingredients
INSERT INTO `recipe_ingredients` (`recipe_id`, `ingredient_id`, `quantity`, `measurement_unit`) VALUES
(1, 1, '2 cups', 'Cup'),
(1, 2, '1 cup', 'Cup'),
(1, 3, '0.5 cup', 'Cup'),
(2, 1, '1 cup', 'Cup'),
(2, 2, '2 cups', 'Cup'),
(2, 3, '1 cup', 'Cup'),
(3, 1, '1 cup', 'Cup'),
(3, 2, '0.5 cup', 'Cup'),
(3, 3, '2 cups', 'Cup');


-- Example records for 'reviews' table
INSERT INTO `reviews` (`recipe_id`, `comment`, `rating`, `user_id`) VALUES
(1, 'Great taste!', 4.5, 1),
(1, 'Loved it, but a bit salty.', 4, 2),
(1, 'Perfect for dinner.', 5, 3),
(2, 'Very fresh and delightful.', 5, 1),
(2, 'Could use more spices.', 3.5, 2),
(2, 'My family loved it.', 4.5, 3),
(3, 'Unique flavor!', 4, 1),
(3, 'Not to my taste.', 2.5, 2),
(3, 'Very delicious.', 5, 3);

