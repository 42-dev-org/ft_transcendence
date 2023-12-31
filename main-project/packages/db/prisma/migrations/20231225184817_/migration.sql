-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('User');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Accepted');

-- CreateEnum
CREATE TYPE "ConversationTypes" AS ENUM ('Group', 'Single');

-- CreateEnum
CREATE TYPE "ChatVisibility" AS ENUM ('Public', 'Private', 'Protected');

-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('Pending', 'Accepted', 'Banned');

-- CreateEnum
CREATE TYPE "AchivementGrade" AS ENUM ('Bronze', 'Silver', 'Gold', 'Platnium');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('INVITING', 'WAITING', 'STARTING', 'ENDING');

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
    "points" DECIMAL(65,30) NOT NULL,
    "roles" "Roles"[] DEFAULT ARRAY['User']::"Roles"[],
    "status" TEXT NOT NULL DEFAULT 'offline',

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "MutedConversation" (
    "uid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,
    "conversationUid" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "until" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MutedConversation_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ConversationTypes" NOT NULL,
    "visibility" "ChatVisibility" NOT NULL DEFAULT 'Public',
    "password" TEXT,
    "profileImage" TEXT,
    "userUid" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "messages" (
    "uid" TEXT NOT NULL,
    "content" TEXT,
    "sender_uid" TEXT,
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
    "status" "FriendStatus" NOT NULL DEFAULT 'Pending',
    "bannedBy" TEXT,

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
CREATE TABLE "GameOnUsers" (
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameOnUsers_pkey" PRIMARY KEY ("gameId","userId")
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_banned-conversations" (
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
CREATE UNIQUE INDEX "MutedConversation_userUid_conversationUid_key" ON "MutedConversation"("userUid", "conversationUid");

-- CreateIndex
CREATE UNIQUE INDEX "friends_user1uid_user2uid_key" ON "friends"("user1uid", "user2uid");

-- CreateIndex
CREATE UNIQUE INDEX "friends_user2uid_user1uid_key" ON "friends"("user2uid", "user1uid");

-- CreateIndex
CREATE UNIQUE INDEX "_conversations_AB_unique" ON "_conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_conversations_B_index" ON "_conversations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_owned-conversations_AB_unique" ON "_owned-conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_owned-conversations_B_index" ON "_owned-conversations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_banned-conversations_AB_unique" ON "_banned-conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_banned-conversations_B_index" ON "_banned-conversations"("B");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_uploader_uid_fkey" FOREIGN KEY ("uploader_uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutedConversation" ADD CONSTRAINT "MutedConversation_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutedConversation" ADD CONSTRAINT "MutedConversation_conversationUid_fkey" FOREIGN KEY ("conversationUid") REFERENCES "Conversation"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uid_fkey" FOREIGN KEY ("sender_uid") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "Conversation"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user1uid_fkey" FOREIGN KEY ("user1uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_user2uid_fkey" FOREIGN KEY ("user2uid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameOnUsers" ADD CONSTRAINT "GameOnUsers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GameOnUsers" ADD CONSTRAINT "GameOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owned-conversations" ADD CONSTRAINT "_owned-conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owned-conversations" ADD CONSTRAINT "_owned-conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_banned-conversations" ADD CONSTRAINT "_banned-conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_banned-conversations" ADD CONSTRAINT "_banned-conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
