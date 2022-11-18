-- CreateTable
CREATE TABLE `event_detailed_static` (
    `event_detailed_static_id` VARCHAR(191) NOT NULL,
    `event_detailed_id` VARCHAR(191) NOT NULL,
    `static_path` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`event_detailed_static_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_detailed_static` ADD CONSTRAINT `event_detailed_static_event_detailed_id_fkey` FOREIGN KEY (`event_detailed_id`) REFERENCES `event_detailed`(`event_detailed_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
