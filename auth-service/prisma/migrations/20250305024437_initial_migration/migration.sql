-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "access" TEXT,
    "refresh" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_user_id_key" ON "tokens"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Ensure the pgcrypto extension is enabled for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Insert roles
INSERT INTO roles (id, name) VALUES
(gen_random_uuid(), 'admin'),
(gen_random_uuid(), 'user');

-- Retrieve the inserted role IDs
WITH role_data AS (
    SELECT id FROM roles WHERE name = 'admin' LIMIT 1
),
user_role_data AS (
    SELECT id FROM roles WHERE name = 'user' LIMIT 1
)

-- Insert users with different roles and hashed passwords
INSERT INTO users (id, name, email, password, role_id) 
VALUES 
(gen_random_uuid(), 'John Admin', 'john@admin.com', '$2b$10$pRWi/6AX3HWh2M8ogbmXyua1Qw.SdQQjNEL4yIyRa/cFsnS9ILTbK', (SELECT id FROM role_data)),
(gen_random_uuid(), 'Jane User', 'jane@user.com', '$2b$10$wGpwWKoTG3mFW0/Pp9KeFu/emeKvL9dmQFL9KuV.IHxE1.amZUjtq', (SELECT id FROM user_role_data));