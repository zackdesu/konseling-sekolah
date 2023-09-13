/*
  Warnings:

  - The primary key for the `likedpost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `likedpost` table. All the data in the column will be lost.
  - Made the column `userId` on table `likedpost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postId` on table `likedpost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `likedpost` DROP FOREIGN KEY `LikedPost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `likedpost` DROP FOREIGN KEY `LikedPost_userId_fkey`;

-- AlterTable
ALTER TABLE `likedpost` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `postId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `LikedPost` ADD CONSTRAINT `LikedPost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikedPost` ADD CONSTRAINT `LikedPost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `DataPost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
