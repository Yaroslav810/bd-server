-- CreateTable
CREATE TABLE `tag` (
    `tag_id` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_tag` (
    `event_tag_id` VARCHAR(191) NOT NULL,
    `event_id` VARCHAR(191) NOT NULL,
    `tag_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`event_tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_tag` ADD CONSTRAINT `event_tag_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_tag` ADD CONSTRAINT `event_tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
