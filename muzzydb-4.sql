-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2019 at 08:18 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `muzzydb`
--
CREATE DATABASE IF NOT EXISTS `muzzydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `muzzydb`;

-- --------------------------------------------------------
--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `type` int(11) DEFAULT NULL,
  `idowner` int(11) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--
INSERT INTO `comment` (`id`, `iduser`, `type`, `idowner`, `rate`, `content`, `time`) VALUES
(35, 1, 1, 11, 4, 'hello', '2019-11-13 21:20:08');
-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `idshop` int(11) NOT NULL,
  `discount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `idshop`, `discount`) VALUES
(1, 8, 95),
(2, 9, 90),
(3, 10, 85),
(4, 11, 90),
(5, 12, 90),
(6, 13, 95),
(7, 14, 90),
(8, 15, 75),
(9, 16, 80),
(10, 17, 80);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `fullname` varchar(256) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `subject` text DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `fullname`, `email`, `subject`, `content`) VALUES
(1, 'Trần Minh Thiện', '3@gmail.com', 'Đánh giá dịch vụ', 'Đánh giá dịch vụ good');

-- --------------------------------------------------------

--
-- Table structure for table `reserve`
--

CREATE TABLE `reserve` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `roomID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reserve`
--

INSERT INTO `reserve` (`id`, `type`, `roomID`, `userID`, `startTime`, `endTime`) VALUES
(1, 'shop', 10, 22, '07:00:00', '08:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `idinstructor` int(11) NOT NULL,
  `idshop` int(11) NOT NULL,
  `timestart` datetime DEFAULT NULL,
  `timeend` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `fee` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `idinstructor`, `idshop`, `timestart`, `timeend`, `status`, `fee`) VALUES
(7, 7, 8, '2019-11-07 09:00:00', '2019-11-07 11:00:00', 0, 25),
(8, 8, 17, '2019-11-07 08:00:00', '2019-11-07 10:00:00', 0, 50),
(9, 9, 13, '2019-11-07 09:00:00', '2019-11-07 10:00:00', 0, 29),
(10, 10, 15, '2019-11-07 09:00:00', '2019-11-07 11:00:00', 0, 99),
(11, 9, 9, '2019-11-07 09:00:00', '2019-11-07 10:00:00', 0, 49),
(12, 10, 10, '2019-11-07 14:00:00', '2019-11-07 16:00:00', 0, 19);

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `dateopening` date DEFAULT NULL,
  `timeopen` time DEFAULT NULL,
  `timeclose` time DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `idowner` int(11) DEFAULT NULL,
  `url_image` text DEFAULT NULL,
  `rate` int(11) NOT NULL,
  `discount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id`, `name`, `address`, `dateopening`, `timeopen`, `timeclose`, `description`, `image`, `idowner`, `url_image`, `rate`, `discount`) VALUES
(8, 'OZ Coffee House ', '273/46 Nguyễn Văn Đậu, phường 11, quận Bình Thạnh, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', 'Test descript 1', NULL, 15, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 4, 30),
(9, 'Terrace Cafe', '65 Lê Lợi, Tầng Trệt Saigon Center, Quận 1, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 16, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 2, 30),
(10, 'XBIZZ Studio & Coffee', '346 Lê Hồng Phong, phường 1, quận 10, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 17, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 1, 30),
(11, 'Oasis Cafe ', '176/1B Lê Văn Sỹ, Phường 10, Quận Phú Nhuận, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 16, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 5, 30),
(12, 'Say Acoustic', '60 Trần Minh Quyền, Phường 11, Quận 10, Hồ Chí Minh', '2020-07-10', '06:30:00', '23:00:00', NULL, NULL, 16, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 3, 30),
(13, 'Lily’s Garden Caffee', '114 Đường số 6, Phường Tam Phú, quận Thủ Đức, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 15, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 2, 30),
(14, 'The Coffee Ship ', '759 Trần Xuân Soạn, P.Tân Hưng, Q.7, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 17, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 5, 30),
(15, 'Blank Lounge', 'Tầng 75 và 76 tòa nhà Landmark 81, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 15, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 4, 30),
(16, 'EON Café', '50/51/52, Bitexco Financial Tower, 2 Hải Triều, Quận 1, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 17, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 2, 30),
(17, 'Chill Skybar', 'AB Tower, Tầng 26, 76A Lê Lai, Phường Bến Thành, Quận 1, Hồ Chí Minh', '2020-07-10', '06:00:00', '23:00:00', NULL, NULL, 15, '\"/muzzy/public/image/12.jpeg\";\r\n\"/muzzy/public/image/detail_1.jpg\";\r\n\"/muzzy/public/image/detail_2.jpg\";\r\n\"/muzzy/public/image/detail_3.jpg\";\r\n\"/muzzy/public/image/detail_4.jpg\";\r\n\"/muzzy/public/image/detail_5.jpg\";\r\n\"/muzzy/public/image/detail_6.jpg\";\r\n\"/muzzy/public/image/detail_7.jpg\";\r\n\"/muzzy/public/image/detail_8.jpg\";\r\n\"/muzzy/public/image/detail_9.jpg\";\r\n\"/muzzy/public/image/detail_10.jpg\";', 3, 30);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phonenumber` int(11) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `imageurl` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fullname`, `username`, `password`, `phonenumber`, `address`, `role`, `imageurl`) VALUES
(1, 'No Nut November', 'levannhat', 'nhat123', 1234569, 'Hà Nội', 1, NULL),
(2, 'Vu Kieu Hai Hoa', 'vukieuhaihoa', 'hoa123', 123456, 'Hồ Chí Minh', 1, NULL),
(3, 'Tran Quoc Hoa', 'tranquochoa', 'qhoa123', 123456, 'Hồ Chí Minh', 1, NULL),
(4, 'Vu Khac Tinh', 'vukhactinh', 'tinh123', 123456, 'Hồ Chí Minh', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_foreign` (`iduser`);


--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_foreign_discount` (`idshop`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);


--
-- Indexes for table `reserve`
--
ALTER TABLE `reserve`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_foreign_schedule` (`idshop`),
  ADD KEY `user_foreign_schedule` (`idinstructor`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_shop_foreign` (`idowner`);
--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;


--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


--
-- AUTO_INCREMENT for table `reserve`
--
ALTER TABLE `reserve`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--


--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `user_foreign` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`);


--
-- Constraints for table `discount`
--
ALTER TABLE `discount`
  ADD CONSTRAINT `shop_foreign_discount` FOREIGN KEY (`idshop`) REFERENCES `shop` (`id`);


--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `shop_foreign_schedule` FOREIGN KEY (`idshop`) REFERENCES `shop` (`id`);

--
-- Constraints for table `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `owner_shop_foreign` FOREIGN KEY (`idowner`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
