-- CreateEnum
CREATE TYPE "CitizenType" AS ENUM ('PF', 'PJ');

-- CreateTable
CREATE TABLE "Citizen" (
    "id" SERIAL NOT NULL,
    "createdByInstanceId" INTEGER NOT NULL,
    "legalResponsibleName" TEXT,
    "legalResponsibleCpf" TEXT,
    "companyName" TEXT,
    "fantasyName" TEXT,
    "cnpj" VARCHAR(14),
    "userId" INTEGER NOT NULL,
    "type" "CitizenType" NOT NULL DEFAULT 'PF',
    "createdById" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAccess" TIMESTAMP(3),

    CONSTRAINT "Citizen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Citizen_cnpj_key" ON "Citizen"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Citizen_userId_key" ON "Citizen"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_createdByInstanceId_fkey" FOREIGN KEY ("createdByInstanceId") REFERENCES "Instance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Citizen" ADD CONSTRAINT "Citizen_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
