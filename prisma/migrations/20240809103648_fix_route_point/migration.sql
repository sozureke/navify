/*
  Warnings:

  - You are about to drop the column `longtitude` on the `RoutePoint` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `RoutePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutePoint" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
