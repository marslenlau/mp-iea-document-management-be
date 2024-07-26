-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'reader', 'writer');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "description" TEXT,
    "rol" "Role" NOT NULL DEFAULT 'reader',
    "status" BOOLEAN NOT NULL DEFAULT true,
    "id_file" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_id_file_fkey" FOREIGN KEY ("id_file") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
