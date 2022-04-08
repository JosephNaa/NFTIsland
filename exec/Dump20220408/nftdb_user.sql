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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nickname` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `profile_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0x1b828aa19b03e7c6cf5633be4a0d4d5f7be5e5fb','UmxWpt7Tbxoz6Uz','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f2596e19-e353-4f7f-9afc-eb22582121ca.png'),('0x20f997f732fd72c92f9fb0906a6e85f05d307c8e','마이클','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/dc063b76-bef5-40b0-8b49-707d9238ffb4.png'),('0x39410f7d3ca6f9f880ddbcd5337416d0ec343923','hhhhhhdong','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/62353c22-9b94-433b-a590-95ade5ade141.JPG'),('0x76d7d3176ea7d79490576d2a8714d76d8cb69349','hjyoon','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/b6c4eddc-1f37-428f-b29d-2ca70623405e.jpg'),('0xb892be1537d4ee6b9f8ff81533a995ef2a099c63','Ompv2yFU4kJBAK3','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f2596e19-e353-4f7f-9afc-eb22582121ca.png'),('0xd124774f98f7fccab9d733b7fd8f0edc9660cd61','nanana','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/f2596e19-e353-4f7f-9afc-eb22582121ca.png'),('0xdf791410c4f64f20ca01025a73d2a0115353f360','junyong','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/0ebca160-1466-4a8c-bb32-bb796e1552d7.png'),('0xe5460b34dea49d2b3abc8ac9c765517047310bca','끼룽이','https://kgw012-nft-bucket.s3.ap-northeast-2.amazonaws.com/ebee3c8e-671e-4488-b65f-ed6c28f311a8.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
