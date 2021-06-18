/*
  Warnings:

  - You are about to drop the `te_user_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "te_user_profile" DROP CONSTRAINT "te_user_profile_userId_fkey";

-- AlterTable
ALTER TABLE "te_users" ADD COLUMN     "about" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT E'Other',
ADD COLUMN     "pronouns" TEXT NOT NULL DEFAULT E'they/them/their/theirs',
ADD COLUMN     "sexuality" "Sexuality" NOT NULL DEFAULT E'Other';

-- DropTable
DROP TABLE "te_user_profile";
