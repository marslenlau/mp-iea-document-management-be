-- CreateTable
CREATE TABLE "resolution" (
    "id" SERIAL NOT NULL,
    "dr_date" TIMESTAMP(3) NOT NULL,
    "nro" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "id_file" INTEGER NOT NULL,
    "id_document" INTEGER NOT NULL,
    "id_instrument" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resolution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "resolution" ADD CONSTRAINT "resolution_id_file_fkey" FOREIGN KEY ("id_file") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resolution" ADD CONSTRAINT "resolution_id_document_fkey" FOREIGN KEY ("id_document") REFERENCES "document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resolution" ADD CONSTRAINT "resolution_id_instrument_fkey" FOREIGN KEY ("id_instrument") REFERENCES "instrument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resolution" ADD CONSTRAINT "resolution_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
