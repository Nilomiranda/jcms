CREATE TABLE `apiKeys` (
	`value` text NOT NULL,
	`name` text NOT NULL,
	`userId` text(255) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`profilePictureUrl` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `apiKeys_userId_unique` ON `apiKeys` (`userId`);