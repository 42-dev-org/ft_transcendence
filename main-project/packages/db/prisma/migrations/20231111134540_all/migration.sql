-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Accepted');

-- CreateEnum
CREATE TYPE "ConversationTypes" AS ENUM ('Group', 'Single');

-- CreateEnum
CREATE TYPE "AchivementGrade" AS ENUM ('Bronze', 'Silver', 'Gold', 'Platnium');

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
    "profileImage" TEXT NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png',
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "roles" "Roles"[] DEFAULT ARRAY['User']::"Roles"[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "type" "ConversationTypes" NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "messages" (
    "uid" TEXT NOT NULL,
    "content" TEXT,
    "sender_uid" TEXT,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "media_uid" TEXT,
    "conversation_uid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "friends" (
    "uid" TEXT NOT NULL,
    "user1uid" TEXT NOT NULL,
    "user2uid" TEXT NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Achivement" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "grade" "AchivementGrade" NOT NULL,

    CONSTRAINT "Achivement_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "_conversations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_owned-conversations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "medias_url_key" ON "medias"("url");

-- CreateIndex
CREATE INDEX "medias_uid_idx" ON "medias"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- CreateIndex
CREATE INDEX "users_uid_idx" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "messages_media_uid_key" ON "messages"("media_uid");

-- CreateIndex
CREATE UNIQUE INDEX "_conversations_AB_unique" ON "_conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_conversations_B_index" ON "_conversations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_owned-conversations_AB_unique" ON "_owned-conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_owned-conversations_B_index" ON "_owned-conversations"("B");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_uploader_uid_fkey" FOREIGN KEY ("uploader_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uid_fkey" FOREIGN KEY ("sender_uid") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_media_uid_fkey" FOREIGN KEY ("media_uid") REFERENCES "medias"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "Conversation"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user1uid_fkey" FOREIGN KEY ("user1uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user2uid_fkey" FOREIGN KEY ("user2uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owned-conversations" ADD CONSTRAINT "_owned-conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owned-conversations" ADD CONSTRAINT "_owned-conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
