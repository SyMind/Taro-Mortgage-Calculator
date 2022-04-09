/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2020-06-28 13:47:24
 * @Last Modified by: qiuz
 * @Last Modified time: 2021-01-04 22:04:16
 */

import React, { Component } from "react";
import { View, Text, Image, Input, Button } from "@tarojs/components";
import styles from "./index.module.scss";
import { RIGHT_ARROW } from "./constans";
import { Pciker, Modal } from "@components";

interface LineWrapProps {
  type: string[];
  data: any[];
  onChangePicker: (...args: any) => void;
  onInputChange: (...args: any) => void;
  onBlur: (...args: any) => void;
}

export class LineWrap extends Component<LineWrapProps, any> {
  static defaultProps = {
    data: [],
    type: [],
    onChangePicker: () => {},
    onInputChange: () => {},
    onBlur: () => {}
  };

  static options = {
    addGlobalClass: true
  };

  constructor(props: LineWrapProps) {
    super(props);
    this.state = {
      visible: false,
      explainData: {},
      focus: []
    };
  }

  handlePickerChange = (data: any, index: number) => (value: any) => {
    const valueMap = data.range.filter(
      (item: any) => item.value === Number(value[0])
    );
    this.props.onChangePicker(data, valueMap[0] || data.range[0], index);
  };

  handleInputChange = (item: any, index: number) => (e: any) => {
    let { value } = e.detail;
    if (item.inputType === "number" || item.keyboardType === "number-pad") {
      value = parseInt(value, 10);
    }
    this.props.onInputChange(item, value, index);
  };

  showExplain = (data: any) => () => {
    this.setState({
      explainData: data,
      visible: true
    });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  onMoreClick = (_url: string) => () => {};

  onFocus = (index: number) => () => {
    const { focus } = this.state;
    focus[index] = true;
    this.setState({
      focus
    });
  };

  onBlur = (loan: any, index: number) => (e: any) => {
    const { focus } = this.state;
    focus[index] = false;
    this.setState(
      {
        focus
      },
      () => {
        loan.blurCheck && this.props.onBlur(e);
      }
    );
  };
  render() {
    const { data, type } = this.props;
    const { visible, explainData, focus } = this.state;
    const list = data.filter(
      _item => type.indexOf(_item && _item.renderType) > -1
    );
    return (
      <View className={styles["loan-content"]}>
        {explainData.title && (
          <Modal
            className={styles["compute-modal"]}
            visible={visible}
            closable
            transparent
            animationType="none"
            onClose={this.closeModal}
          >
            <View className={styles["explain"]}>
              <Text className={styles["explain-title"]}>{explainData.title}</Text>
              <View className={styles["explain-tip"]}>
                <Text className={styles["explain-tip-text"]}>
                  {explainData.content}
                </Text>
              </View>

              <Button className={styles["explain-btn"]} onClick={this.closeModal}>
                <Text className={styles["explain-btn-text"]}>我知道了</Text>
              </Button>
            </View>
          </Modal>
        )}
        {list.map((loan: any, index: number) => {
          let valueIndex = 0;
          if (loan.range) {
            loan.range = loan.rangeFilter
              ? loan.range.filter(_r => _r.limit === loan.rangeFilter)
              : loan.range;
            valueIndex = loan.range.findIndex(
              (item: any) => item.value === Number(loan.value)
            );
          }
          return (
            <View key={loan.name} className={styles["input-content"]}>
              <View className={styles["input-content__label"]}>
                <Text className={styles["input-content__label-text"]}>{loan.name}</Text>
                {loan.icon && (
                  <View onClick={this.showExplain(loan.explain)}>
                    <Image
                      className={styles["input-content__label-icon"]}
                      src={loan.icon}
                    />
                  </View>
                )}
              </View>
              <View className={styles["value-wrap"]}>
                {loan.type === "selector" ? (
                  <View className={styles["picker-box"]}>
                    <Pciker
                      mode="selector"
                      title={loan.name}
                      styleName="picker-box__picke"
                      value={[loan.value]}
                      range={loan.range}
                      onChange={this.handlePickerChange(loan, index)}
                    >
                      <Text className={styles["picker-box__picker__text"]}>
                        {loan.range[valueIndex] && loan.range[valueIndex].label}
                      </Text>
                    </Pciker>
                  </View>
                ) : (
                  <Input
                    // taro内置不支持 rn 的某些类型
                    // @ts-ignore
                    keyboardType={loan.keyboardType}
                    type={loan.inputType || "text"}
                    maxLength={loan.maxLength}
                    className={styles["input"]}
                    style={loan.valueStyle || {}}
                    disabled={
                      process.env.TARO_ENV !== "h5" ? loan.readOnly : false
                    }
                    readOnly={IS_H5 ? loan.readOnly : false}
                    onBlur={this.onBlur(loan, index)}
                    onFocus={this.onFocus(index)}
                    onInput={this.handleInputChange(loan, index)}
                    value={`${
                      loan.value !== 0
                        ? (loan.ratio ? loan.ratio * loan.value : loan.value) ||
                          ""
                        : focus[index]
                        ? ""
                        : 0
                    }`}
                  />
                )}
                <View className={styles["unit"]}>
                  {loan.unit === "arrowright" ? (
                    <Image className={styles["arrow-right"]} src={RIGHT_ARROW} />
                  ) : (
                    <Text className={styles["unit__text"]} style={loan.unitStyle}>
                      {loan.unit}
                    </Text>
                  )}
                </View>
              </View>
              <Text className={styles["input-content-line"]} />
            </View>
          );
        })}
      </View>
    );
  }
}
