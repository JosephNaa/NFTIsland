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
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `logo_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `payable` bit(1) NOT NULL,
  `user_address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK45o6xn6yyxfxv870i0syrjwux` (`user_address`),
  CONSTRAINT `FK45o6xn6yyxfxv870i0syrjwux` FOREIGN KEY (`user_address`) REFERENCES `user` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES (1,'2022-04-07 21:36:08.911147','2022-04-07 21:36:08.911147','querydsl 정보를 공유하는 커뮤니티입니다.','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ec78b30a-1d3d-4e87-b755-d515e6b57258.png','Querydsl 커뮤니티',_binary '','0xe5460b34dea49d2b3abc8ac9c765517047310bca'),(2,'2022-04-07 21:51:27.807324','2022-04-07 21:51:27.807324','매주 책을 읽고 이야기를 나눠보아요!','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/beae350d-464c-42de-836f-9c961029ad43.png','책책책 책을 읽읍시다!!',_binary '','0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(3,'2022-04-07 22:08:27.016380','2022-04-07 22:08:27.016380','고양이를 키우는 사람들의 커뮤니티','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/3b73c22c-3573-41a6-9743-b61539c78226.jpg','고양이 키우는 사람',_binary '','0x76d7d3176ea7d79490576d2a8714d76d8cb69349'),(4,'2022-04-08 00:45:23.906017','2022-04-08 00:45:23.906017','리액트를 사용하는 프론트엔드 개발자 여러분 정보를 공유합시다!','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/e7c77d2b-f2b5-4ca4-8fb7-3bac3624f59a.png','리액트 스터디',_binary '','0x39410f7d3ca6f9f880ddbcd5337416d0ec343923'),(5,'2022-04-08 04:33:51.433377','2022-04-08 04:33:51.433377','Spring 스터디를 위한 커뮤니티','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/bc622d94-c8bd-4543-81d8-69897d0bc2bb.png','Spring 스터디',_binary '','0xd124774f98f7fccab9d733b7fd8f0edc9660cd61'),(6,'2022-04-08 10:01:00.080858','2022-04-08 10:01:00.080858','삼성 청년 SW아카데미 커뮤니티','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/7590d39a-2d88-4db7-bdee-b641dbb35e00.png','삼성 청년 SW아카데미',_binary '\0','0xdf791410c4f64f20ca01025a73d2a0115353f360'),(7,'2022-04-08 10:04:09.859022','2022-04-08 10:04:09.859022','스터디원은 6명으로 제한합니다','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/26592234-f37f-43c1-ae59-6045bd74a861.jpg','면접 스터디',_binary '','0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(8,'2022-04-08 10:09:46.764412','2022-04-08 10:09:46.764412','블록체인 개발자(현직 & 희망) 커뮤니티','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/05696416-5acb-4494-aaa3-4b349dcd9bc0.png','블록체인 개발자 커뮤니티',_binary '','0x20f997f732fd72c92f9fb0906a6e85f05d307c8e'),(9,'2022-04-08 10:29:31.693037','2022-04-08 10:29:31.693037','채용공고를 공유하는 커뮤니티입니다~~','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/a6e778ae-388b-42f8-88d2-85e173945a37.png','채용공고 방 커뮤니티',_binary '','0xdf791410c4f64f20ca01025a73d2a0115353f360');
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
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
