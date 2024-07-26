-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "is_picture" BOOLEAN NOT NULL,
    "status" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);
