-- DropForeignKey
ALTER TABLE "Race" DROP CONSTRAINT "Race_userId_fkey";

-- DropForeignKey
ALTER TABLE "RoutePoint" DROP CONSTRAINT "RoutePoint_routeId_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_userId_fkey";

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
