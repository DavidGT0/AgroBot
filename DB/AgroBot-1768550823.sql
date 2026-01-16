CREATE TABLE IF NOT EXISTS `Users` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL DEFAULT '255',
	`email` varchar(255) NOT NULL UNIQUE DEFAULT '255',
	`userName` varchar(255) NOT NULL UNIQUE DEFAULT '255',
	`password` varchar(255) NOT NULL DEFAULT '255',
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Categories` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`vegetables` varchar(255) NOT NULL DEFAULT '255',
	`Fruits` varchar(255) NOT NULL DEFAULT '255',
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Products` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(255) NOT NULL DEFAULT '255',
	`category_id` int NOT NULL,
	`user_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Weights` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`product_id` int NOT NULL,
	`weight` float NOT NULL,
	`Weighing_date` datetime NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `Categories` ADD CONSTRAINT `Categories_fk3` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE `Products` ADD CONSTRAINT `Products_fk2` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk3` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);
ALTER TABLE `Weights` ADD CONSTRAINT `Weights_fk1` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`);

ALTER TABLE `Weights` ADD CONSTRAINT `Weights_fk2` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`);