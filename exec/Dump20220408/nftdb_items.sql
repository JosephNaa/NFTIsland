-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: j6d107.p.ssafy.io    Database: nftdb
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `token_id` bigint NOT NULL,
  `item_description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `item_title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `item_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `on_sale_yn` bit(1) DEFAULT NULL,
  `community_id` bigint DEFAULT NULL,
  `owner_address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`token_id`),
  KEY `FKp7o689lgkb8vlj0qb65k2pq40` (`community_id`),
  KEY `FKgi1sbuafhqyq05ptca44kan4v` (`owner_address`),
  CONSTRAINT `FKgi1sbuafhqyq05ptca44kan4v` FOREIGN KEY (`owner_address`) REFERENCES `user` (`address`),
  CONSTRAINT `FKp7o689lgkb8vlj0qb65k2pq40` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (0,'Querydsl 커뮤니티를 이용하기 위해 필요한 NFT입니다.\nNFTIsland를 통해 제작되었습니다.','Querydsl Badge#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/a6406dcf-c06a-47bf-8c82-2b9af023be16.png',_binary '\0',1,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(1,'Querydsl 커뮤니티를 이용하기 위해 필요한 NFT입니다.\nNFTIsland를 통해 제작되었습니다.','Querydsl Badge#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/a6406dcf-c06a-47bf-8c82-2b9af023be16.png',_binary '',1,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(2,'Querydsl 커뮤니티를 이용하기 위해 필요한 NFT입니다.\nNFTIsland를 통해 제작되었습니다.','Querydsl Badge#3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/a6406dcf-c06a-47bf-8c82-2b9af023be16.png',_binary '',1,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(3,'Querydsl 커뮤니티를 이용하기 위해 필요한 NFT입니다.\nNFTIsland를 통해 제작되었습니다.','Querydsl Badge#4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/a6406dcf-c06a-47bf-8c82-2b9af023be16.png',_binary '\0',1,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(4,'Querydsl 커뮤니티를 이용하기 위해 필요한 NFT입니다.\nNFTIsland를 통해 제작되었습니다.','Querydsl Badge#5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/a6406dcf-c06a-47bf-8c82-2b9af023be16.png',_binary '\0',1,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(5,'책벌레 NFT','나는야 책벌레~ #1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/274e6e42-ea87-42ee-8c24-12369a752500.png',_binary '\0',2,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(6,'책벌레 NFT','나는야 책벌레~ #2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/274e6e42-ea87-42ee-8c24-12369a752500.png',_binary '\0',2,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(7,'책벌레 NFT','나는야 책벌레~ #3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/274e6e42-ea87-42ee-8c24-12369a752500.png',_binary '\0',2,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(8,'책벌레 NFT','나는야 책벌레~ #4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/274e6e42-ea87-42ee-8c24-12369a752500.png',_binary '',2,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(9,'책벌레 NFT','나는야 책벌레~ #5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/274e6e42-ea87-42ee-8c24-12369a752500.png',_binary '\0',2,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(10,'책벌레 NFT','나는야 책벌레~ #6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/274e6e42-ea87-42ee-8c24-12369a752500.png',_binary '\0',2,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(11,'.','고양이#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f3aee871-4f69-4ca5-801f-77ce45ce2dfc.jpg',_binary '\0',3,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(12,'.','러시안 블루#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/30ee32a8-f424-4ce2-9324-2dd4eb96a6ca.jpg',_binary '\0',3,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(13,'.','샴#3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f243a7d3-08a4-4dd9-84b6-b122807867c5.jpg',_binary '',3,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(14,'.','랙돌#4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/448fbe2b-3206-4091-a456-dbdab300d6c2.jpg',_binary '\0',3,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(15,'.','터키시 앙고라#5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/056a8f93-2b5d-4506-a7c8-755e3085f1b3.jpg',_binary '\0',3,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(16,'.','스핑크스#6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/d041cba5-64a6-4cbd-9385-3fc1b77ebcb2.jpg',_binary '',3,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(17,'.','벵골#7','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/9688f2fb-9ae8-4d47-9089-9f2f232c6923.jpg',_binary '',3,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(18,'.','페르시안#8','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/aff1f4cf-adc3-4b88-8d87-786270fad889.jpg',_binary '',3,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(19,'Spring NFT ','Spring NFT#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(20,'Spring NFT ','Spring NFT#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(21,'Spring NFT ','Spring NFT#3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(22,'Spring NFT ','Spring NFT#4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(23,'Spring NFT ','Spring NFT#5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(24,'Spring NFT ','Spring NFT#6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(25,'Spring NFT ','Spring NFT#7','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(26,'Spring NFT ','Spring NFT#8','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(27,'Spring NFT ','Spring NFT#9','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/cf6c8d55-32b0-4b64-8c02-6b6557929868.png',_binary '\0',5,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(28,'SSAFY NFT','SSAFY#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(29,'SSAFY NFT','SSAFY#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(30,'SSAFY NFT','SSAFY#3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(31,'SSAFY NFT','SSAFY#4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(32,'SSAFY NFT','SSAFY#5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(33,'SSAFY NFT','SSAFY#6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(34,'SSAFY NFT','SSAFY#7','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(35,'SSAFY NFT','SSAFY#8','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(36,'SSAFY NFT','SSAFY#9','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/57d0cfb7-b594-48ab-a751-bf0c2a641d3a.png',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(37,'**6명 한정**','면접 스터디원#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e4eee64e-ec4f-41c6-8d6f-8fd95e276bfa.jpg',_binary '\0',7,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(38,'**6명 한정**','면접 스터디원#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e4eee64e-ec4f-41c6-8d6f-8fd95e276bfa.jpg',_binary '\0',7,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(39,'**6명 한정**','면접 스터디원#3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e4eee64e-ec4f-41c6-8d6f-8fd95e276bfa.jpg',_binary '\0',7,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(40,'**6명 한정**','면접 스터디원#4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e4eee64e-ec4f-41c6-8d6f-8fd95e276bfa.jpg',_binary '\0',7,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(41,'**6명 한정**','면접 스터디원#5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e4eee64e-ec4f-41c6-8d6f-8fd95e276bfa.jpg',_binary '\0',7,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(42,'**6명 한정**','면접 스터디원#6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e4eee64e-ec4f-41c6-8d6f-8fd95e276bfa.jpg',_binary '',7,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(43,'SSAFY NFT','SSAFY#10','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(44,'SSAFY NFT','SSAFY#11','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(45,'SSAFY NFT','SSAFY#12','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(46,'SSAFY NFT','SSAFY#13','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(47,'SSAFY NFT','SSAFY#14','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(48,'SSAFY NFT','SSAFY#15','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(49,'SSAFY NFT','SSAFY#16','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(50,'SSAFY NFT','SSAFY#17','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(51,'SSAFY NFT','SSAFY#18','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ededf27f-16f3-41b4-9d8f-f9d9e37a1007.jpg',_binary '\0',6,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(52,'블록체인 개발자 커뮤니티 NFT','블록체인 개발자#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c6a105f5-d7d3-4005-b5a1-cf94b0d98484.png',_binary '\0',8,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(53,'블록체인 개발자 커뮤니티 NFT','블록체인 개발자#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c6a105f5-d7d3-4005-b5a1-cf94b0d98484.png',_binary '',8,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(54,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '\0',4,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(55,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '\0',4,'0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(56,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '\0',4,'0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(57,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '\0',4,'0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(58,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '',4,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(59,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '\0',4,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(60,'리액트 사용자들 끼리 정보를 공유 해요','리액트 사용자 #7','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/13575e47-f37e-49ec-8e09-d25b80894c4f.png',_binary '\0',4,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(61,'Duck NFT','Duck#1','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(62,'Duck NFT','Duck#2','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(63,'Duck NFT','Duck#3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(64,'Duck NFT','Duck#4','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(65,'Duck NFT','Duck#5','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(66,'Duck NFT','Duck#6','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(67,'Duck NFT','Duck#7','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(68,'Duck NFT','Duck#8','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(69,'Duck NFT','Duck#9','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0e4fd82c-2490-4b33-9252-56c5ed599a2f.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(70,'Duck NFT','Duck#10','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(71,'Duck NFT','Duck#11','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '\0',9,'0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(72,'Duck NFT','Duck#12','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(73,'Duck NFT','Duck#13','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(74,'Duck NFT','Duck#14','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(75,'Duck NFT','Duck#15','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(76,'Duck NFT','Duck#16','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(77,'Duck NFT','Duck#17','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(78,'Duck NFT','Duck#18','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/1fa0c57d-8ecb-45e4-b1da-da648410fe5e.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(79,'Duck NFT','Duck#19','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(80,'Duck NFT','Duck#20','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(81,'Duck NFT','Duck#21','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(82,'Duck NFT','Duck#22','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(83,'Duck NFT','Duck#23','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '\0',9,'0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(84,'Duck NFT','Duck#24','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(85,'Duck NFT','Duck#25','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(86,'Duck NFT','Duck#26','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(87,'Duck NFT','Duck#27','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/37845a07-cdfe-471d-a3e9-18b3b0a3bd10.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(88,'Duck NFT','Duck#28','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(89,'Duck NFT','Duck#29','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(90,'Duck NFT','Duck#30','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(91,'Duck NFT','Duck#31','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(92,'Duck NFT','Duck#32','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(93,'Duck NFT','Duck#33','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(94,'Duck NFT','Duck#34','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(95,'Duck NFT','Duck#35','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360'),(96,'Duck NFT','Duck#36','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/c2557375-1aed-48a4-b22b-5ee0772150e1.png',_binary '\0',9,'0xdf791410c4f64f20ca01025a73d2a0115353f360');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:22:36