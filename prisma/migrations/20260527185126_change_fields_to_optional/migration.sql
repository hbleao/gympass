-- AlterTable
ALTER TABLE "check_ins" ALTER COLUMN "validated_at" DROP NOT NULL,
ALTER COLUMN "validated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "gyms" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "latitude" SET DEFAULT 0,
ALTER COLUMN "longitude" SET DEFAULT 0;
