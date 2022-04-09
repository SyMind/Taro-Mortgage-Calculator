/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-10 23:40:47
 * @Last Modified by: qiuz
 */

import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";
import { SafeAreaView, StatusBar } from "@components";
import { getStorageData } from "@utils";

export default class HouseLoanComputeMontylyPayments extends Component<
  any,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      historyList: []
    };
  }

  async componentDidMount() {
    const data = await getStorageData("LOAN_HISTORY") || {};
    this.setState({
      historyList: data
    });
  }

  render() {
    const { historyList = [] } = this.state;
    return (
      <SafeAreaView className={styles["history"]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View className={styles["history-content"]}>
          {historyList.map((item: any, index: number) => {
            return (
              <View key={index + ""} className={styles["wrap"]}>
                <View className={styles["wrap-item"]}>
                  <Text className={styles["title"]}>
                    公积金贷{item.accumulatFundYear}年
                  </Text>
                  <Text className={styles["amount"]}>{item.accumulatTotalPirce}万</Text>
                </View>
                <View className={styles["wrap-item"]}>
                  <Text className={styles["title"]}>商业贷{item.commerceLoanYear}年</Text>
                  <Text className={styles["amount"]}>{item.commerceTotalPirce}万</Text>
                </View>
                <View className={styles["wrap-item"]}>
                  <Text className={styles["title"]}>{item.payMonthStr}</Text>
                  <Text className={styles["amount"]}>{item.firstPay}元</Text>
                </View>
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}
