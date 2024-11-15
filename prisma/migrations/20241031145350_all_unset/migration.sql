/*
  Warnings:

  - Made the column `hash` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Points` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `UserChallenges` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("createdAt", "hash", "height", "id", "url", "userId", "width") SELECT "createdAt", "hash", "height", "id", "url", "userId", "width" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE UNIQUE INDEX "Photo_hash_key" ON "Photo"("hash");
CREATE TABLE "new_Points" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Points_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Points" ("dateAdded", "description", "id", "points", "userId") SELECT "dateAdded", "description", "id", "points", "userId" FROM "Points";
DROP TABLE "Points";
ALTER TABLE "new_Points" RENAME TO "Points";
CREATE TABLE "new_UserChallenges" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "completionDate" DATETIME,
    CONSTRAINT "UserChallenges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserChallenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserChallenges" ("challengeId", "completionDate", "id", "status", "userId") SELECT "challengeId", "completionDate", "id", "status", "userId" FROM "UserChallenges";
DROP TABLE "UserChallenges";
ALTER TABLE "new_UserChallenges" RENAME TO "UserChallenges";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
