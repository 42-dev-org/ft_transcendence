/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Accepted');

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "medias" (
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "mimtype" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uploader_uid" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_changed_at" TIMESTAMP(3),
    "reset_token" TEXT,
    "reset_token_expires_in" TIMESTAMP(3),
    "profileImage" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "roles" "Roles"[] DEFAULT ARRAY['User']::"Roles"[],
    "status" "Status" NOT NULL DEFAULT 'Accepted',
    "ip" TEXT NOT NULL,
    "phone_name" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "medias_url_key" ON "medias"("url");

-- CreateIndex
CREATE INDEX "medias_uid_idx" ON "medias"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_uid_idx" ON "users"("uid");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_uploader_uid_fkey" FOREIGN KEY ("uploader_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
