/*
  Warnings:

  - You are about to drop the column `isOpen` on the `Snippet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "isOpen",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;
