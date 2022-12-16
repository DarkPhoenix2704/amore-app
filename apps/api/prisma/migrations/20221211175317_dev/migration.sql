/*
  Warnings:

  - Added the required column `collegeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pronoun` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `partnerPronoun` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Pronoun" AS ENUM ('He/Him', 'She/Her', 'They/Them');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "collegeId" TEXT NOT NULL,
DROP COLUMN "pronoun",
ADD COLUMN     "pronoun" "Pronoun" NOT NULL,
DROP COLUMN "partnerPronoun",
ADD COLUMN     "partnerPronoun" "Pronoun" NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_id_key" ON "College"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
