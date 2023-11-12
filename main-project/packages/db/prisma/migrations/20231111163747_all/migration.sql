/*
  Warnings:

  - You are about to drop the column `status` on the `messages` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "FriendStatus" ADD VALUE 'Banned';

-- AlterTable
ALTER TABLE "friends" ADD COLUMN     "bannedBy" TEXT;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'offline';
