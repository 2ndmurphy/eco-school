/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN "hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Photo_hash_key" ON "Photo"("hash");
