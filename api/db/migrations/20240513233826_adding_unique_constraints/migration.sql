/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Instance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `Instance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Instance_uuid_key" ON "Instance"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Instance_domain_key" ON "Instance"("domain");
