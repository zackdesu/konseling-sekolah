-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "realname" TEXT NOT NULL,
    "role" TEXT,
    "description" TEXT,
    "email" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mbti" TEXT,
    "img" TEXT,
    "phonenumber" TEXT,
    "token" VARCHAR(600),
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isCounselor" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataPost" (
    "id" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "anonym" BOOLEAN NOT NULL,
    "post" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT,

    CONSTRAINT "DataPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedPost" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DataQuotes" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "accountId" TEXT,

    CONSTRAINT "DataQuotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LikedPost_userId_postId_key" ON "LikedPost"("userId", "postId");

-- AddForeignKey
ALTER TABLE "DataPost" ADD CONSTRAINT "DataPost_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedPost" ADD CONSTRAINT "LikedPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "DataPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataQuotes" ADD CONSTRAINT "DataQuotes_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
