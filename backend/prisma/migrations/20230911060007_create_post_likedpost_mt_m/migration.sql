/*
  Warnings:

  - You are about to drop the column `likes` on the `datapost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `datapost` DROP COLUMN `likes`;

-- CreateTable
CREATE TABLE `LikedPost` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `postId` VARCHAR(191) NULL,

    UNIQUE INDEX `LikedPost_userId_postId_key`(`userId`, `postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LikedPost` ADD CONSTRAINT `LikedPost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikedPost` ADD CONSTRAINT `LikedPost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `DataPost`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
