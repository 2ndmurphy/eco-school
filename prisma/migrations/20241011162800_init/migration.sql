/*
  Warnings:

  - You are about to drop the column `userId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Points` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserChallenges` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Video` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserChallenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Photo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("createdAt", "id", "url") SELECT "createdAt", "id", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE TABLE "new_Points" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Points_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Points" ("dateAdded", "description", "id", "points") SELECT "dateAdded", "description", "id", "points" FROM "Points";
DROP TABLE "Points";
ALTER TABLE "new_Points" RENAME TO "Points";
CREATE TABLE "new_UserChallenges" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "completionDate" DATETIME,
    CONSTRAINT "UserChallenges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserChallenges_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserChallenges" ("challengeId", "completionDate", "id", "status") SELECT "challengeId", "completionDate", "id", "status" FROM "UserChallenges";
DROP TABLE "UserChallenges";
ALTER TABLE "new_UserChallenges" RENAME TO "UserChallenges";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Video_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("createdAt", "id", "url") SELECT "createdAt", "id", "url" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
