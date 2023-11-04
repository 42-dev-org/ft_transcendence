-- CreateEnum
CREATE TYPE "ConversationTypes" AS ENUM ('Group', 'Single');

-- CreateTable
CREATE TABLE "Conversation" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "type" "ConversationTypes" NOT NULL,
    "profileImage" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("uid")
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
CREATE UNIQUE INDEX "_conversations_AB_unique" ON "_conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_conversations_B_index" ON "_conversations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_owned-conversations_AB_unique" ON "_owned-conversations"("A", "B");

-- CreateIndex
CREATE INDEX "_owned-conversations_B_index" ON "_owned-conversations"("B");

-- AddForeignKey
ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_conversations" ADD CONSTRAINT "_conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owned-conversations" ADD CONSTRAINT "_owned-conversations_A_fkey" FOREIGN KEY ("A") REFERENCES "Conversation"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_owned-conversations" ADD CONSTRAINT "_owned-conversations_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
