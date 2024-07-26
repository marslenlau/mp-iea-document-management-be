/*
  Warnings:

  - The primary key for the `file` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `file` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `id_file` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_file_fkey";

-- AlterTable
ALTER TABLE "file" DROP CONSTRAINT "file_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "file_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "id_file",
ADD COLUMN     "id_file" INTEGER;

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_name_key" ON "organization"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_file_fkey" FOREIGN KEY ("id_file") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
