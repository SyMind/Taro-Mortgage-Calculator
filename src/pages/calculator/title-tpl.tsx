/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2020-06-28 13:47:24
 * @Last Modified by: qiuz
 */

import React, { FunctionComponent } from "react";
import { ComponentOptions } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import classNames from 'classnames';
import styles from "./index.module.scss";

interface TitleTplProps {
  title: string;
  data: any[];
  activeIndex: number;
  onWayClick: (...args: any) => void;
}

export const TitleTpl: FunctionComponent<TitleTplProps> & {
  options?: ComponentOptions;
} = props => {
  const {
    title = "",
    data = [],
    onWayClick = () => {},
    activeIndex = 0
  } = props;

  const handleClick = (item: any, index: number) => () => {
    onWayClick(item, index);
  };

  return (
    <View className={styles["compute-way"]}>
      <Text className={styles["compute-way__title"]}>{title}</Text>
      <View className={styles["compute-way__way-box"]}>
        {data.map((item: any, index: number) => {
          return (
            <View
              key={item.id}
              onClick={handleClick(item, index)}
              className={styles["pseudo-content"]}
            >
              <Text
                className={classNames(styles["pseudo-content__text"], {
                  [styles["pseudo-content__text-active"]]: activeIndex === item.index
                })}
              >
                {item.name}
              </Text>
              {activeIndex === item.index && (
                <View className={styles["pseudo-content__pseudo"]} />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

TitleTpl.options = {
  addGlobalClass: true
};
