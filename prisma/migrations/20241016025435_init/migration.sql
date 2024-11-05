/*
  Warnings:

  - You are about to drop the column `first_lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `second_lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `second_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `lastname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_lastname",
DROP COLUMN "first_name",
DROP COLUMN "second_lastname",
DROP COLUMN "second_name",
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
