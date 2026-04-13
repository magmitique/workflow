-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `company_size` VARCHAR(191) NULL,
    `sector` VARCHAR(191) NULL,
    `need_type` VARCHAR(191) NULL,
    `budget_range` VARCHAR(191) NULL,
    `timeline` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `source` VARCHAR(191) NULL,
    `pages_viewed` JSON NULL,
    `time_on_site` INTEGER NULL,
    `referrer` VARCHAR(191) NULL,
    `utm_source` VARCHAR(191) NULL,
    `utm_medium` VARCHAR(191) NULL,
    `utm_campaign` VARCHAR(191) NULL,
    `utm_term` VARCHAR(191) NULL,
    `utm_content` VARCHAR(191) NULL,
    `status` ENUM('NEW', 'CONTACTED', 'MEETING', 'PROPOSAL', 'WON', 'LOST') NOT NULL DEFAULT 'NEW',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `leads_status_idx`(`status`),
    INDEX `leads_created_at_idx`(`created_at`),
    INDEX `leads_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lead_notes` (
    `id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `lead_id` VARCHAR(191) NOT NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `lead_notes_lead_id_idx`(`lead_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `excerpt` TEXT NULL,
    `cover_image` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(3) NULL,
    `author_id` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NULL,
    `meta_description` TEXT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_slug_key`(`slug`),
    INDEX `articles_status_published_at_idx`(`status`, `published_at`),
    INDEX `articles_slug_idx`(`slug`),
    INDEX `articles_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    UNIQUE INDEX `tags_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_tags` (
    `article_id` VARCHAR(191) NOT NULL,
    `tag_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`article_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_studies` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `client_name` VARCHAR(191) NOT NULL,
    `client_anonymous` BOOLEAN NOT NULL DEFAULT false,
    `sector` VARCHAR(191) NULL,
    `tech_stack` JSON NULL,
    `context` TEXT NULL,
    `challenge` TEXT NULL,
    `solution` TEXT NULL,
    `testimonial_quote` TEXT NULL,
    `testimonial_author` VARCHAR(191) NULL,
    `testimonial_role` VARCHAR(191) NULL,
    `cover_image` VARCHAR(191) NULL,
    `architecture_diagram` VARCHAR(191) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT',
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `case_studies_slug_key`(`slug`),
    INDEX `case_studies_status_idx`(`status`),
    INDEX `case_studies_featured_idx`(`featured`),
    INDEX `case_studies_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `case_study_results` (
    `id` VARCHAR(191) NOT NULL,
    `case_study_id` VARCHAR(191) NOT NULL,
    `metric` VARCHAR(191) NOT NULL,
    `before` VARCHAR(191) NOT NULL,
    `after` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lead_notes` ADD CONSTRAINT `lead_notes_lead_id_fkey` FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lead_notes` ADD CONSTRAINT `lead_notes_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_tags` ADD CONSTRAINT `article_tags_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article_tags` ADD CONSTRAINT `article_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `case_study_results` ADD CONSTRAINT `case_study_results_case_study_id_fkey` FOREIGN KEY (`case_study_id`) REFERENCES `case_studies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
