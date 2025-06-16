-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: anaissuh
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_submitted` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `users` (`id`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,10,5,'approved','2025-05-13 16:58:18','2025-05-13 17:58:18'),(2,9,2,'pending','2025-05-13 21:17:48','2025-05-13 22:17:48'),(3,9,4,'pending','2025-05-13 21:17:51','2025-05-13 22:17:51'),(4,2,6,'pending','2025-05-13 22:35:21','2025-05-13 23:35:21');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtype` varchar(100) DEFAULT NULL,
  `price_label` varchar(50) DEFAULT NULL,
  `beds` int(11) DEFAULT NULL,
  `baths` int(11) DEFAULT NULL,
  `ber` varchar(10) DEFAULT NULL,
  `landlord_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `landlord_id` (`landlord_id`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`landlord_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'39 Claremont Crescent, Glasnevin, Dublin 11','Semi-detached House','?595,000',4,2,'E1',1),(2,'Apartment 5, The Maples, Dunstaffnage Hall, Saint Bri, Stillorgan, Co. Dublin','Apartment','1,686/Monthly',1,1,'A1',3),(3,'131 Grianan Fidh, Aiken\'s Village, Sandyford, Dublin 18','Terrace House','?595,000',4,3,'C1',4),(4,'Unit 1E, Three Rock Road, Sandyford, Dublin 18','Office','?700/Monthly',0,1,'D2',5),(5,'Apartment 9, Caldragh, Saval Park Road, Co. Du, Dalkey, Co. Dublin','Apartment','?2,652/Monthly',1,1,'A2',2),(6,'Apartment 33, The Bay, Merrion Road, Dublin 4','Apartment','?2,400/Monthly',3,1,'B3',3),(7,'16, cois glaisin rise, counnty meath','Apartment','2500/monthly',3,3,'A3',3),(9,'Apartment 404, Block 1A, Griffith Halls of Residence, Dublin 08, D08 CC67','Apartment','2800/month',2,2,'A3',4);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `display_order` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_images_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` VALUES (1,1,'1/1.jpg',0),(2,1,'1/10.jpg',0),(3,1,'1/11.jpg',0),(4,1,'1/12.jpg',0),(5,1,'1/13.jpg',0),(6,1,'1/2.jpg',0),(7,1,'1/3.jpg',0),(8,1,'1/4.jpg',0),(9,1,'1/5.jpg',0),(10,1,'1/6.jpg',0),(11,1,'1/7.jpg',0),(12,1,'1/8.jpg',0),(13,1,'1/9.jpg',0),(14,2,'2/1.jpg',0),(15,2,'2/10.jpg',0),(16,2,'2/11.jpg',0),(17,2,'2/12.jpg',0),(18,2,'2/13.jpg',0),(19,2,'2/14.jpg',0),(20,2,'2/15.jpg',0),(21,2,'2/16.jpg',0),(22,2,'2/17.jpg',0),(23,2,'2/2.jpg',0),(24,2,'2/3.jpg',0),(25,2,'2/4.jpg',0),(26,2,'2/5.jpg',0),(27,2,'2/6.jpg',0),(28,2,'2/7.jpg',0),(29,2,'2/8.jpg',0),(30,2,'2/9.jpg',0),(31,3,'3/1.jpg',0),(32,3,'3/10.jpg',0),(33,3,'3/11.jpg',0),(34,3,'3/12.jpg',0),(35,3,'3/13.jpg',0),(36,3,'3/14.jpg',0),(37,3,'3/15.jpg',0),(38,3,'3/16.jpg',0),(39,3,'3/17.jpg',0),(40,3,'3/2.jpg',0),(41,3,'3/3.jpg',0),(42,3,'3/4.jpg',0),(43,3,'3/5.jpg',0),(44,3,'3/6.jpg',0),(45,3,'3/7.jpg',0),(46,3,'3/8.jpg',0),(47,3,'3/9.jpg',0),(48,4,'4/1.jpg',0),(49,4,'4/2.jpg',0),(50,4,'4/3.jpg',0),(51,4,'4/4.jpg',0),(52,4,'4/5.jpg',0),(53,5,'5/1.jpg',0),(54,5,'5/10.jpg',0),(55,5,'5/11.jpg',0),(56,5,'5/12.jpg',0),(57,5,'5/13.jpg',0),(58,5,'5/14.jpg',0),(59,5,'5/15.jpg',0),(60,5,'5/16.jpg',0),(61,5,'5/17.jpg',0),(62,5,'5/18.jpg',0),(63,5,'5/19.jpg',0),(64,5,'5/2.jpg',0),(65,5,'5/20.jpg',0),(66,5,'5/21.jpg',0),(67,5,'5/22.jpg',0),(68,5,'5/23.jpg',0),(69,5,'5/24.jpg',0),(70,5,'5/25.jpg',0),(71,5,'5/3.jpg',0),(72,5,'5/4.jpg',0),(73,5,'5/5.jpg',0),(74,5,'5/6.jpg',0),(75,5,'5/7.jpg',0),(76,5,'5/8.jpg',0),(77,5,'5/9.jpg',0),(78,6,'6/1.jpg',0),(79,6,'6/10.jpg',0),(80,6,'6/11.jpg',0),(81,6,'6/12.jpg',0),(82,6,'6/2.jpg',0),(83,6,'6/3.jpg',0),(84,6,'6/4.jpg',0),(85,6,'6/5.jpg',0),(86,6,'6/6.jpg',0),(87,6,'6/7.jpg',0),(88,6,'6/8.jpg',0),(89,6,'6/9.jpg',0);
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('landlord','tenant','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Tristan ','Caine','0875638465','tristan@gmail.com','$2b$10$28WdIl/H2..9PR7Wur/H6eDS0Cghj.RWVe6Db3eRLV5X7QF08CgmW','landlord'),(2,'Morana','Vitalio','0875643654','morana@gmail.com','$2b$10$njUGyKz6MRvVUVEDxyy8oe24YyeflvkUybZHqqiqu03TM.PEph4u.','tenant'),(3,'Dante','Maroni','0857364758','dante@gmail.com','$2b$10$1/qKXHYWvac8inz0htc6r.V/lDZjqUuZb01CZFALJLWv2qcB4qU.y','landlord'),(4,'Aaron','Warner','0853573314','aaron@gmail.com','$2b$10$JqRVXa4VqvoBW9KexapD8.I1o5uKhc2qEP2Tdrik05WRGMPuV7eFm','landlord'),(5,'Henry','Cavil','0875364573','henry@gmail.com','$2b$10$uHvCXswdxTtJyL.XkJtY1ufZm6R0lCWQ98cGUsVHxFPp2bG0VzU/2','landlord'),(8,'Amara ','Vitalio','0837236548','amara@gmail.com','$2b$10$C52c1WPhArZWWrPQvaJ7TOM.ScqFPLi/NKSc07.jp01McUPynFIyW','tenant'),(9,'James','Dwight ','0842356726','jdwight@gmail.com','$2b$10$74JR9auOl3d96VZZWqOlz.ORtEgzys433FSY670cPrU3zRPpxXHnq','tenant'),(10,'Nick ','Mane','0843762527','nick@gmail.com','$2b$10$XYauXNMzeA7wmYpX5v9Wm.PbG57zF4xi9J9lRdvYOZfvOAIDS9Rjq','tenant'),(11,'Roshesh','Kumar','0834275638245','rosh@anaissuhlettings.ie','$2b$10$ubaaESI5Na.7Sc5jmx408.lkEBz3WXb3TqnyF97j7A23BP9Imsy16\n','admin'),(12,'Preet','Geet','0834275635','preet@anaissuhlettings.ie','$2b$10$Ly2uUsXPG7XwQczds30nJ.ScugW0dvWfHwwUh3BTrQfgImv5xg2QG','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'anaissuh'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14  0:15:20
