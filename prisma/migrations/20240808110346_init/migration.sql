-- DropForeignKey
ALTER TABLE "Split" DROP CONSTRAINT "Split_raceId_fkey";

-- AddForeignKey
ALTER TABLE "Split" ADD CONSTRAINT "Split_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;
