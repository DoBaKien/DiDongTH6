import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
const Task = (props) => (
  <View style={styles.taskWrapper}>
    <Icon
      name={props.checked ? "check" : "square"}
      size={30}
      color="#900"
      style={{ marginLeft: 15 }}
      onPress={props.setChecked}
    />

    <View>
      {/* if the task is checked toggle a vertical line on top of task */}
      {props.checked && <View style={styles.verticalLine}></View>}
      <Text style={styles.task}>{props.text}</Text>
    </View>

    <Icon
      name="trash-2"
      size={30}
      color="#900"
      style={{ marginLeft: "auto" }}
      onPress={props.delete}
    />
  </View>
);

export default Task;

const styles = StyleSheet.create({
  taskWrapper: {
    marginTop: "5%",
    flexDirection: "row",
    borderColor: "#FFFFFF",
    borderBottomWidth: 1.5,
    width: "100%",
    alignItems: "stretch",
    minHeight: 40,
  },
  task: {
    paddingBottom: 20,
    paddingLeft: 10,
    marginRight: 70,
    marginTop: 6,
    borderColor: "#F0F0F0",
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  verticalLine: {
    borderBottomColor: "red",
    borderBottomWidth: 4,
    marginLeft: 10,
    width: "100%",
    position: "absolute",
    marginTop: 15,
  },
});
