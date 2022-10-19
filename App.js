import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [image, setImage] = useState(null);

  const handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { name: value, id: Date.now(), checked: false }]);
      axios
        .post("https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo", {
          name: value,
        })
        .catch(function (error) {
          console.log("err   " + error);
        });
      setValue("");
    }
  };
  const handleDeleteTodo = async (id) => {
    console.log("Xoa thành công");
    await fetch(
      `https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo/${id}`,
      { method: "DELETE" }
    );
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    axios
      .put(`https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo/${id}`, {
        id: id,
        name: value,
      })
      .then((res) => {
        fetch("https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo")
          .then((res) => res.json())
          .then((todo) => {
            setTodos(todo);
          });
      });
  };

  const handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  useEffect(() => {
    fetch("https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo")
      .then((res) => res.json())
      .then((todo) => {
        setTodos(todo);
      });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      // handleUpdata(result);
      const uri = result.uri;
      const type = "image/jpg";
      const name = Date.now();
      const source = { uri, type, name };

      handleUpdata(source);
    }
  };

  const handleUpdata = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "DemoTodoApp");
    data.append("cloud_name", "dvuoju1qg");
    console.log(data.file);
    fetch("https://api-us.cloudinary.com/v1_1/dvuoju1qg/image/upload", {
      method: "POST",
      body: data,
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "multipart/form-data",
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        Alert.alert("Error While Uploading" + err);
      });
  };
  const handleDelImg = () => {
    setImage('')
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 6 }}>
        <ScrollView style={{ width: "100%" }}>
          {todos.map((task) => (
            <Task
              text={task.name}
              text2={task.image}
              key={task.id}
              checked={task.checked}
              setChecked={() => handleChecked(task.id)}
              delete={() => handleDeleteTodo(task.id)}
              edit={() => handleEdit(task.id)}
            />
          ))}
        </ScrollView>
      </View>

      {image && (
        <View style={{ flex: 1 }} flexDirection="row">
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: "100%" }}
          />
          <TouchableOpacity style={styles.buttondel} onPress={handleDelImg}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.header}>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={(value) => setValue(value)}
            value={value}
          />
        </SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={() => handleAddTodo()}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon
            name="camera"
            size={30}
            color="#900"
            style={[styles.text, { paddingTop: 7 }]}
            onPress={pickImage}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttondel: {
    backgroundColor: "#DDDDDD",
    padding:5,
    width: 20,
    height: 30,
  },
  text: {
    fontSize: 40,
    backgroundColor: "black",
    borderRadius: 50,
    width: 45,
    height: 55,
    textAlign: "center",
    justifyContent: "center",
    color: "white",
  },
  header: {
    flex: 1,
    backgroundColor: "lightgray",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 280,
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: 30,
  },
});
