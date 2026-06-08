CREATE TABLE `adminSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`usedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `adminSessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `adminSessions_token_unique` UNIQUE(`token`)
);
