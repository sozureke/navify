/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Period" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "routeId" INTEGER,
    "name" TEXT NOT NULL,
    "distance" INTEGER NOT NULL DEFAULT 0,
    "running_time" INTEGER NOT NULL DEFAULT 0,
    "average_cadence" INTEGER NOT NULL DEFAULT 0,
    "average_pace" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fastest_pace" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "slowest_pace" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "elevation_gain" INTEGER NOT NULL DEFAULT 0,
    "elevation_loss" INTEGER NOT NULL DEFAULT 0,
    "average_hr" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Split" (
    "id" SERIAL NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "time" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "raceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Split_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "coordinates" JSONB NOT NULL,
    "raceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "statistic_period" "Period" NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "total_races" INTEGER NOT NULL DEFAULT 0,
    "total_time" INTEGER NOT NULL DEFAULT 0,
    "average_candence" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Race_routeId_key" ON "Race"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_raceId_key" ON "Route"("raceId");

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
