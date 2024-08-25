-- CreateTable
CREATE TABLE "OrganizationHierarchy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "OrganizationHierarchy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicAgentSector" (
    "sectorId" INTEGER NOT NULL,
    "associatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "office" TEXT,
    "publicAgentId" INTEGER NOT NULL,
    "organizationHierarchyId" INTEGER,

    CONSTRAINT "PublicAgentSector_pkey" PRIMARY KEY ("publicAgentId","sectorId")
);

-- AddForeignKey
ALTER TABLE "PublicAgentSector" ADD CONSTRAINT "PublicAgentSector_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicAgentSector" ADD CONSTRAINT "PublicAgentSector_publicAgentId_fkey" FOREIGN KEY ("publicAgentId") REFERENCES "PublicAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicAgentSector" ADD CONSTRAINT "PublicAgentSector_organizationHierarchyId_fkey" FOREIGN KEY ("organizationHierarchyId") REFERENCES "OrganizationHierarchy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
