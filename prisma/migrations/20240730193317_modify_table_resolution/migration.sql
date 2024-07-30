/*
  Warnings:

  - You are about to drop the column `dr_date` on the `resolution` table. All the data in the column will be lost.
  - Added the required column `doc_date` to the `resolution` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resolution" DROP COLUMN "dr_date",
ADD COLUMN     "doc_date" TIMESTAMP(3) NOT NULL;
