/*
  Warnings:

  - You are about to drop the column `organizationHierarchyId` on the `PublicAgentSector` table. All the data in the column will be lost.
  - You are about to drop the `OrganizationHierarchy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicAgentSector" DROP CONSTRAINT "PublicAgentSector_organizationHierarchyId_fkey";

-- AlterTable
ALTER TABLE "PublicAgentSector" DROP COLUMN "organizationHierarchyId",
ADD COLUMN     "accessLevelId" INTEGER;

-- DropTable
DROP TABLE "OrganizationHierarchy";

-- CreateTable
CREATE TABLE "AccessLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AccessLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PublicAgentSector" ADD CONSTRAINT "PublicAgentSector_accessLevelId_fkey" FOREIGN KEY ("accessLevelId") REFERENCES "AccessLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
