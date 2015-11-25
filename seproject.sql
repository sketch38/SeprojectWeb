-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2015 at 12:03 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `seproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `ca_id` int(15) NOT NULL AUTO_INCREMENT,
  `ca_name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `color` varchar(10) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`ca_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ca_id`, `ca_name`, `color`) VALUES
(0, 'course', '#4683ea'),
(1, 'admission', '#f0c20e'),
(2, 'competition', '#3dbb55'),
(3, 'training', '#db3239'),
(4, 'test', '');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE IF NOT EXISTS `course` (
  `cid` int(30) NOT NULL AUTO_INCREMENT,
  `cnum` varchar(6) CHARACTER SET utf8 NOT NULL,
  `title` varchar(500) CHARACTER SET utf8 NOT NULL,
  `detail` text CHARACTER SET utf8 NOT NULL,
  `teacher` varchar(100) CHARACTER SET utf8 NOT NULL,
  `type` varchar(100) CHARACTER SET utf8 NOT NULL,
  `ca_id` int(30) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`cid`, `cnum`, `title`, `detail`, `teacher`, `type`, `ca_id`) VALUES
(1, '269202', 'algorithm for isne', 'next from data sturcture on the first year.', 'ken cosh', 'isne#2', 0),
(2, '269101', 'introduction to isne', 'start introduction of information systems and network engineering.', 'ken cosh', 'isne#3', 0),
(3, '269200', 'web programming', 'introduction of web programming.', 'ken cosh', 'isne#2', 0),
(4, '261305', 'operationsystems', 'introduction of operation systems.', 'Narissara Elamkanitchat', 'isne#3', 0),
(5, '261361', 'software engineering', 'Se fundamentals including development process and life cycle,requirements analysis,design,construction and testing, operation and maintenance,quality and professional ethics.', 'lachana Ramingwong', 'isne#3', 0),
(6, '269340', 'data centric app dev', 'next from database ', 'Juggapong Natwichai', 'isne#3', 0),
(7, '205502', 'test', 'undefined', 'test', 'isne#2', 0),
(8, '111111', 'test refresh', 'test', 'test', 'test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `courseday`
--

CREATE TABLE IF NOT EXISTS `courseday` (
  `cid` int(30) NOT NULL,
  `day` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courseday`
--

INSERT INTO `courseday` (`cid`, `day`) VALUES
(1, 'tue'),
(1, 'fri'),
(2, 'mon'),
(2, 'thu'),
(3, 'mon'),
(3, 'thu'),
(4, 'tue'),
(4, 'fri'),
(5, 'mon'),
(5, 'thu'),
(6, 'mon'),
(6, 'thu'),
(7, 'mon'),
(7, 'thu'),
(7, 'fri'),
(7, 'wed'),
(8, 'wed');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `eid` int(30) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `detail` longtext NOT NULL,
  `ca_id` int(30) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eid`, `title`, `detail`, `ca_id`) VALUES
(2, 'การลงทะเบียนนักศึกษาใหม่ประจำปีการศึกษา 2558', '', 1),
(3, 'ประกาศผลการแข่งขัน icode ประจำปี 2558', '', 2),
(4, 'test', 'test', 3),
(5, 'test event refresh', 'test', 3);

-- --------------------------------------------------------

--
-- Table structure for table `pic`
--

CREATE TABLE IF NOT EXISTS `pic` (
  `pid` int(30) NOT NULL AUTO_INCREMENT,
  `eid` int(30) NOT NULL,
  `pic` blob NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `slide`
--

CREATE TABLE IF NOT EXISTS `slide` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_link` text NOT NULL,
  `s_text` text NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `slide`
--

INSERT INTO `slide` (`s_id`, `s_link`, `s_text`) VALUES
(1, 'pic/marshmallow-1600.jpg', 'Trick and Trips in Marshmallow '),
(2, 'pic/IMG_7901.jpg', 'Welcome to Department of computer Engineering.'),
(3, 'pic/IMG_5979.jpg', 'Invitation to listen present project of 4th years computer engineering student.'),
(4, 'pic/testpic.jpg', 'Present Project Se for 3rd years information systems and network engineering student');

-- --------------------------------------------------------

--
-- Table structure for table `termtime`
--

CREATE TABLE IF NOT EXISTS `termtime` (
  `term_id` int(30) NOT NULL,
  `order` varchar(100) CHARACTER SET utf8 NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  PRIMARY KEY (`term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `termtime`
--

INSERT INTO `termtime` (`term_id`, `order`, `startdate`, `enddate`) VALUES
(0, 'midterm', '0000-00-00', '0000-00-00'),
(1, 'final', '0000-00-00', '0000-00-00'),
(2, 'semester', '2015-11-22', '2015-11-28');

-- --------------------------------------------------------

--
-- Table structure for table `time`
--

CREATE TABLE IF NOT EXISTS `time` (
  `tid` int(30) NOT NULL AUTO_INCREMENT,
  `cid` int(15) NOT NULL DEFAULT '0',
  `eid` int(15) NOT NULL DEFAULT '0',
  `start_date` date DEFAULT '0000-00-00',
  `end_date` date DEFAULT '0000-00-00',
  `start_time` time(6) DEFAULT '00:00:00.000000',
  `end_time` time(6) DEFAULT '00:00:00.000000',
  `time_post` timestamp(6) NULL DEFAULT NULL,
  `room` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`tid`),
  UNIQUE KEY `cid` (`cid`,`eid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `time`
--

INSERT INTO `time` (`tid`, `cid`, `eid`, `start_date`, `end_date`, `start_time`, `end_time`, `time_post`, `room`) VALUES
(1, 1, 0, '0000-00-00', '0000-00-00', '09:30:00.000000', '11:00:00.000000', NULL, '303'),
(2, 2, 0, '0000-00-00', '0000-00-00', '09:30:00.000000', '11:00:00.000000', NULL, '521'),
(3, 3, 0, '0000-00-00', '0000-00-00', '13:00:00.000000', '14:30:00.000000', NULL, '518'),
(4, 4, 0, '0000-00-00', '0000-00-00', '08:00:00.000000', '09:30:00.000000', NULL, '501'),
(5, 5, 0, '0000-00-00', '0000-00-00', '09:30:00.000000', '11:00:00.000000', NULL, '502'),
(6, 6, 0, '0000-00-00', '0000-00-00', '11:00:00.000000', '12:30:00.000000', NULL, '518'),
(8, 0, 2, '2015-11-25', '2015-11-25', '09:00:00.000000', '17:00:00.000000', '2015-10-25 14:09:26.000000', '521'),
(9, 0, 3, '2015-11-20', '2015-11-20', '08:00:00.000000', '17:00:00.000000', '2015-10-25 18:25:10.000000', '518'),
(10, 0, 4, '2015-11-25', '2015-11-25', '09:30:00.000000', '17:30:00.000000', '2015-10-25 18:36:25.000000', '516'),
(11, 7, 0, '0000-00-00', '0000-00-00', '14:30:00.000000', '17:00:00.000000', NULL, '521'),
(12, 8, 0, '0000-00-00', '0000-00-00', '16:11:00.000000', '16:15:00.000000', NULL, '111'),
(13, 0, 5, '2015-11-25', '2015-11-25', '16:10:00.000000', '16:15:00.000000', '2015-11-25 09:10:54.000000', '111');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uid` int(15) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `pass`) VALUES
(1, 'test', 'root');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
