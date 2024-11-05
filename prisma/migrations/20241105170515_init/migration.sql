-- CreateTable
CREATE TABLE "savings_goals" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "percentaje" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "savings_goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "savings_goals" ADD CONSTRAINT "savings_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
