/*
  Warnings:

  - You are about to drop the column `guildId` on the `te_users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationId` on the `te_users` table. All the data in the column will be lost.
  - Added the required column `guildId` to the `te_user_verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "te_users" DROP CONSTRAINT "te_users_verificationId_fkey";

-- DropIndex
DROP INDEX "te_users_verificationId_unique";

-- AlterTable
ALTER TABLE "te_user_verification" ADD COLUMN     "guildId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "te_users" DROP COLUMN "guildId",
DROP COLUMN "verificationId";

-- CreateTable
CREATE TABLE "te_guilds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuildToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToUser_AB_unique" ON "_GuildToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToUser_B_index" ON "_GuildToUser"("B");

-- AddForeignKey
ALTER TABLE "te_user_verification" ADD FOREIGN KEY ("userId") REFERENCES "te_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "te_user_verification" ADD FOREIGN KEY ("guildId") REFERENCES "te_guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToUser" ADD FOREIGN KEY ("A") REFERENCES "te_guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuildToUser" ADD FOREIGN KEY ("B") REFERENCES "te_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
