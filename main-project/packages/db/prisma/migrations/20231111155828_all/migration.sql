/*
  Warnings:

  - A unique constraint covering the columns `[user1uid,user2uid]` on the table `friends` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user2uid,user1uid]` on the table `friends` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('Pending', 'Accepted');

-- AlterTable
ALTER TABLE "friends" ADD COLUMN     "status" "FriendStatus" NOT NULL DEFAULT 'Pending';

-- CreateIndex
CREATE UNIQUE INDEX "friends_user1uid_user2uid_key" ON "friends"("user1uid", "user2uid");

-- CreateIndex
CREATE UNIQUE INDEX "friends_user2uid_user1uid_key" ON "friends"("user2uid", "user1uid");
