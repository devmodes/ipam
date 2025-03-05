-- CreateTable
CREATE TABLE "ip_addresses" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "comment" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ip_addresses_pkey" PRIMARY KEY ("id")
);
