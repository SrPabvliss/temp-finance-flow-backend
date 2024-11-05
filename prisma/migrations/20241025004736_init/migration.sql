/*
  Warnings:

  - You are about to drop the column `type` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `incomes` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `incomes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "incomes" DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "expense_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "income_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
