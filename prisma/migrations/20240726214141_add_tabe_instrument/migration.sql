-- CreateTable
CREATE TABLE "instrument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "id_organization" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instrument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "instrument_name_key" ON "instrument"("name");

-- AddForeignKey
ALTER TABLE "instrument" ADD CONSTRAINT "instrument_id_organization_fkey" FOREIGN KEY ("id_organization") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
