/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-10 23:36:13
 * @Last Modified by: qiuz
 */

// import React from "react";
import { ComponentOptions, FunctionComponent } from '@tarojs/taro';
// import { AtModal } from 'taro-ui';
// import styles from './index.module.scss';
// import { View, Image } from '@tarojs/components';
// import { CLOSE_ICON } from './constant';
import { TaroModalProps } from './type';

const TaroModal: FunctionComponent<TaroModalProps> & {
  options?: ComponentOptions;
} = () => {
  // const { visible = false, closable = false, onClose = () => {} } = props;
  return null;
  // return (
  //   <AtModal isOpened={visible}>
  //     {closable && (
  //       <Image src={CLOSE_ICON} onClick={onClose} className={styles["at-modal-content-close-iocn"]} />
  //     )}
  //     <View className={styles["at-modal-content"]}>{props.children}</View>
  //   </AtModal>
  // );
};

TaroModal.options = {
  addGlobalClass: true,
};

export default TaroModal;
