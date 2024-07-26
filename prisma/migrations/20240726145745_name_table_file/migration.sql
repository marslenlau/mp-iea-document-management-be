/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "file" (
    "id" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "is_picture" BOOLEAN NOT NULL,
    "status" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);
