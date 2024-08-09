-- CreateTable
CREATE TABLE "RoutePoint" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoutePoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
