-- CreateTable
CREATE TABLE "DateResponse" (
    "id" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "dateTime" TIMESTAMP(3),
    "activity" TEXT,
    "activityOption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DateResponse_pkey" PRIMARY KEY ("id")
);
