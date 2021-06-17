-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2021 at 01:02 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech-product`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `buy_price` varchar(11) NOT NULL,
  `sell_price` varchar(11) NOT NULL,
  `stock` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `image`, `name`, `buy_price`, `sell_price`, `stock`, `created_at`, `updated_at`) VALUES
(1, 'images\\1623916801329-sepatu.jpg', 'Sepatu', '50000', '35000', 20, '2021-06-17 04:05:12', '2021-06-17 11:00:30'),
(8, 'images\\1623927332943-celana.jpg', 'Celana', '40000', '35000', 9, '2021-06-17 08:51:28', '2021-06-17 11:00:38'),
(9, 'images\\1623924261656-baju.jpg', 'Baju', '55000', '40000', 28, '2021-06-17 10:04:21', '2021-06-17 10:04:21'),
(10, 'images\\1623924323613-kacamata.jpg', 'Kacamata', '55000', '40000', 2, '2021-06-17 10:05:23', '2021-06-17 10:05:23'),
(11, 'images\\1623924374582-topi.jpg', 'Topi', '30000', '40000', 40, '2021-06-17 10:06:14', '2021-06-17 10:06:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
