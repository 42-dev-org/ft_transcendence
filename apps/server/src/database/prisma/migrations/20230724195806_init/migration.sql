-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profileImage" SET DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png',
ALTER COLUMN "coverImage" DROP NOT NULL;
