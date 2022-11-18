-- CreateTable
CREATE TABLE `event_detailed` (
    `event_detailed_id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`event_detailed_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_detailed` ADD CONSTRAINT `event_detailed_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
