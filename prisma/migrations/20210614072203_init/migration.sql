-- CreateEnum
CREATE TYPE "Sexuality" AS ENUM ('Straight', 'Gay_Lesbian', 'Bisexual', 'Pansexual', 'Asexual', 'Other');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Non_Binary', 'Other');

-- CreateEnum
CREATE TYPE "VerificationState" AS ENUM ('PreVerify', 'Verifying', 'Denied', 'Denied_Permanent');

-- CreateTable
CREATE TABLE "te_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "verificationId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "te_user_profile" (
    "id" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL DEFAULT E'they/them/their/theirs',
    "about" TEXT,
    "sexuality" "Sexuality" NOT NULL DEFAULT E'Other',
    "gender" "Gender" NOT NULL DEFAULT E'Other',
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "te_user_verification" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "state" "VerificationState" NOT NULL DEFAULT E'PreVerify',
    "channelId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "te_users.discordId_unique" ON "te_users"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "te_users_verificationId_unique" ON "te_users"("verificationId");

-- CreateIndex
CREATE UNIQUE INDEX "te_user_profile_userId_unique" ON "te_user_profile"("userId");

-- AddForeignKey
ALTER TABLE "te_users" ADD FOREIGN KEY ("verificationId") REFERENCES "te_user_verification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "te_user_profile" ADD FOREIGN KEY ("userId") REFERENCES "te_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
