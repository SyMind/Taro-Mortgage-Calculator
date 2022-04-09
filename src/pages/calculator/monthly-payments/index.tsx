/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-10 23:41:04
 * @Last Modified by: qiuz
 */

import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import {
  MONTY_DATA,
  MONTY_TITLE,
  CHECK_RIDIO_Y,
  CHECK_RIDIO
} from "../constans";
import styles from"./index.module.scss";
import { getGlobalData, getStorageData } from "@utils";
import { SafeAreaView, StatusBar } from "@components";

export default class HouseLoanComputeMontylyPayments extends Component<
  any,
  any
> {
  page: number = 1;
  total: number = 0;

  constructor(props: any) {
    super(props);
    this.state = {
      checked: "equalInterest",
      equalInterest: {},
      equalPrincipal: {},
      equalInterestMonthList: [],
      interestList: [],
      assessInfo: null,
      equalPrincipalMonthList: [],
      principalList: [],
      tip: "",
      loanAmount: 0
    };
  }

  async componentDidMount() {
    const params = getGlobalData("COMPUTE_RESULT") || {};
    this.init(params);
    const { type = "equalInterest" } =
      (await getStorageData("USER_LOAN_WAY")) || {};
    this.setState({
      checked: type
    });
  }

  init = async (data: any = {}) => {
    try {
      const {
        equalInterestMonthList = [],
        equalPrincipalMonthList = []
      } = data;
      this.total = Math.floor(equalInterestMonthList.length / 10);
      this.setState({
        interestList: equalInterestMonthList.slice(0, 10),
        principalList: equalPrincipalMonthList.slice(0, 10),
        ...data
      });
    } catch (error) {
      console.log(error);
    }
  };

  seleceFirst = (data: any) => async () => {
    await Taro.setStorage({ key: "USER_LOAN_WAY", data });
    this.setState(
      {
        checked: data.type
      },
      () => {
        Taro.showToast({
          title: `月供将以${data.title}的形式展示`,
          icon: "none"
        });
      }
    );
  };

  onScrollToLower = () => {
    if (this.page >= this.total) return;
    this.page++;
    const { equalInterestMonthList, equalPrincipalMonthList } = this.state;
    this.setState({
      interestList: equalInterestMonthList.slice(0, this.page * 10),
      principalList: equalPrincipalMonthList.slice(0, this.page * 10)
    });
  };

  render() {
    const {
      checked,
      interestList,
      principalList,
      loanAmount,
      tip
    } = this.state;
    return (
      <SafeAreaView className={styles["montyly-payments"]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView
          className={styles["scroll-content"]}
          scrollY
          enableBackToTop
          onScrollToLower={this.onScrollToLower}
        >
          <View className={styles["content"]}>
            <View className={styles["title"]}>
              <Text className={styles["title-text"]}>贷款总额</Text>
              <Text className={styles["title-amount"]}>{loanAmount}</Text>
              <Text className={styles["title-text"]}>万</Text>
            </View>
            <Text className={styles["tip-info"]}>{tip}</Text>

            <View className={styles["compared"]}>
              {MONTY_DATA.map((item: any) => {
                return (
                  <View className={styles["equal-box"]} key={item.type}>
                    <Text className={styles["equal-box-title"]}>{item.title}</Text>
                    <View className={styles["equal-box-wrap"]}>
                      <Text className={styles["equal-box-wrap-title"]}>
                        {MONTY_TITLE[item.type]}
                      </Text>
                      <Text className={styles["amount"]}>
                        {this.state[item.type].payMonth}
                      </Text>
                    </View>
                    <View className={styles["equal-box-wrap"]}>
                      <Text className={styles["equal-box-wrap-title"]}>
                        利息总额（万元）
                      </Text>
                      <Text className={styles["amount"]}>
                        {this.state[item.type].totalInterest}
                      </Text>
                    </View>
                    <View className={styles["equal-box-wrap"]}>
                      <Text className={styles["equal-box-wrap-title"]}>特点</Text>
                      <Text className={styles["advant"]}>
                        {item.type !== "equalPrincipal"
                          ? "每月月供稳定"
                          : `每月递减${this.state[item.type].monthDecline}元`}
                      </Text>
                    </View>
                    <View
                      className={styles["equal-box-wrap btn-wrap"]}
                      onClick={this.seleceFirst(item)}
                    >
                      <Image
                        className={styles["radio"]}
                        src={
                          item.type === checked ? CHECK_RIDIO_Y : CHECK_RIDIO
                        }
                      />
                      <Text className={styles["btn-wrap-text"]}>优先看{item.title}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View className={styles["pay-monty"]}>
              <Text className={styles["pay-monty-title"]}>还款细则</Text>
              <View className={styles["line line-first"]}>
                <Text className={styles["line-text line-monty"]} />
                <Text className={styles["line-text line-amount line-first-title"]}>
                  等额本息
                </Text>
                <Text className={styles["line-text line-amount line-first-title"]}>
                  等额本金
                </Text>
              </View>
              {interestList.map((item: any, index: number) => {
                return (
                  <View
                    key={index + ""}
                    className={`line ${
                      index % 2 === 0 ? "line-even" : "line-odd"
                    }`}
                  >
                    <Text className={styles["line-text line-monty"]}>
                      第{index + 1}个月
                    </Text>
                    <Text className={styles["line-text line-amount"]}>￥{item}</Text>
                    <Text className={styles["line-text line-amount"]}>
                      ￥{principalList[index]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
