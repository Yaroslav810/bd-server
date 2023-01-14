-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_detailed` DROP FOREIGN KEY `event_detailed_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_detailed_static` DROP FOREIGN KEY `event_detailed_static_event_detailed_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_link` DROP FOREIGN KEY `event_link_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_static` DROP FOREIGN KEY `event_static_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_tag` DROP FOREIGN KEY `event_tag_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `event_tag` DROP FOREIGN KEY `event_tag_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `item_for_event` DROP FOREIGN KEY `item_for_event_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `item_for_event` DROP FOREIGN KEY `item_for_event_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_link` DROP FOREIGN KEY `user_link_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_on_event` DROP FOREIGN KEY `user_on_event_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_on_event` DROP FOREIGN KEY `user_on_event_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `user_link` ADD CONSTRAINT `user_link_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_on_event` ADD CONSTRAINT `user_on_event_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_on_event` ADD CONSTRAINT `user_on_event_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_static` ADD CONSTRAINT `event_static_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_link` ADD CONSTRAINT `event_link_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_detailed` ADD CONSTRAINT `event_detailed_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_tag` ADD CONSTRAINT `event_tag_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_tag` ADD CONSTRAINT `event_tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_detailed_static` ADD CONSTRAINT `event_detailed_static_event_detailed_id_fkey` FOREIGN KEY (`event_detailed_id`) REFERENCES `event_detailed`(`event_detailed_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_for_event` ADD CONSTRAINT `item_for_event_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_for_event` ADD CONSTRAINT `item_for_event_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;
