CREATE TABLE `publications` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`name` text NOT NULL,
	`status` text DEFAULT 'DRAFT' NOT NULL,
	`userId` text(255) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `publications_userId_unique` ON `publications` (`userId`);