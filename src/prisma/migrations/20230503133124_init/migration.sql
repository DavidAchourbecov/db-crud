-- DropIndex
DROP INDEX `Users_token_key` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `token` TEXT NOT NULL;
