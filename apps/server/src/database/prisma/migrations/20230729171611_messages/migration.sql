-- CreateTable
CREATE TABLE "messages" (
    "uid" TEXT NOT NULL,
    "content" TEXT,
    "sender_uid" TEXT,
    "media_uid" TEXT,
    "conversation_uid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "messages_media_uid_key" ON "messages"("media_uid");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_uid_fkey" FOREIGN KEY ("sender_uid") REFERENCES "users"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_media_uid_fkey" FOREIGN KEY ("media_uid") REFERENCES "medias"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "Conversation"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
