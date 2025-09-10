/*
Navicat MySQL Data Transfer

Source Server         : ruoyi -vue-plus
Source Server Version : 80042
Source Host           : localhost:3306
Source Database       : ry_plus

Target Server Type    : MYSQL
Target Server Version : 80042
File Encoding         : 65001

Date: 2025-09-09 11:34:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for canteen_info
-- ----------------------------
DROP TABLE IF EXISTS `canteen_info`;
CREATE TABLE `canteen_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `canteen_name` varchar(100) NOT NULL COMMENT '食堂名称',
  `location` varchar(255) DEFAULT NULL COMMENT '食堂位置',
  `open_time` varchar(100) DEFAULT NULL COMMENT '开放时间',
  `manager` varchar(100) DEFAULT NULL COMMENT '负责人',
  `unit_id` int DEFAULT NULL COMMENT '所属单位ID',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `tenant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='食堂信息表';
