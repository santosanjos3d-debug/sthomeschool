CREATE TABLE `orderItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`productId` int NOT NULL,
	`productName` varchar(255) NOT NULL,
	`productPrice` int NOT NULL,
	`quantity` int NOT NULL,
	`subtotal` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderNumber` varchar(100) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(255) NOT NULL,
	`customerPhone` varchar(20),
	`shippingAddress` text NOT NULL,
	`shippingCity` varchar(100) NOT NULL,
	`shippingState` varchar(2) NOT NULL,
	`shippingZip` varchar(10) NOT NULL,
	`shippingMethod` varchar(100),
	`shippingCost` int,
	`subtotal` int NOT NULL,
	`total` int NOT NULL,
	`paymentMethod` varchar(50) NOT NULL,
	`paymentStatus` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`imageUrl` varchar(500),
	`weight` int,
	`length` int,
	`width` int,
	`height` int,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
