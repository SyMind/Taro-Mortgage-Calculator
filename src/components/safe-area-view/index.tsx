/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2020-12-10 23:39:59
 * @Last Modified by: qiuz
 */
import { View } from "@tarojs/components";
import classNames from 'classnames';
import styles from "./index.module.scss";
import { TaroSafeAreaViewType } from "./type";

let SafeAreaView: any;
if (process.env.TARO_ENV === "rn") {
  SafeAreaView = require("react-native-safe-area-context").SafeAreaView;
}

const TaroSafeAreaView: TaroSafeAreaViewType = props => {
  const { className = "", style = {}, edges = ["right", "bottom", "left"] } = props;

  if (process.env.TARO_ENV === "rn") {
    return (
      <SafeAreaView
        edges={edges}
        className={classNames(styles["safe-area-view"], className)}
        style={style}
      >
        {props.children}
      </SafeAreaView>
    );
  }
  return (
    <View className={classNames(styles["safe-area-view"], className)} style={{ ...(style as object) }}>
      {props.children}
    </View>
  );
};

TaroSafeAreaView.options = {
  addGlobalClass: true
};

export default TaroSafeAreaView;
