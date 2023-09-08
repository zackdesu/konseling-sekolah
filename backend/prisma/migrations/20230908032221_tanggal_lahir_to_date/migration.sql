/*
  Warnings:

  - You are about to alter the column `tanggalLahir` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `tanggalLahir` DATETIME(3) NOT NULL;
