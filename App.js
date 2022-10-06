import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";

export default function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
      axios
        .post("https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo", {
          name: value,
        })
        .catch(function (error) {
          console.log(error);
        });
      setValue("");
    }
  };
  const handleDeleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.key !== id) return true;
      })
    );
  };
  const handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };
  const handleCheckedP = (id) => {
    setPosts(
      posts.map((todo) => {
        if (todo.id === id) todo.checked = !todo.checked;
        return todo;
      })
    );
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://633ec50a0dbc3309f3bcca92.mockapi.io/app/list/todo")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 6 }}>
        <ScrollView style={{ width: "100%" }}>
          {posts.map((post) => (
            <Task
              key={post.id}
              text={post.name}
              checked={post.checked} // toggle the checked icon
              setChecked={() => handleCheckedP(post.id)}
            />
          ))}

          {todos.map((task) => (
            <Task
              text={task.text}
              key={task.key}
              checked={task.checked} // toggle the checked icon
              setChecked={() => handleChecked(task.key)}
              delete={() => handleDeleteTodo(task.key)}
            />
          ))}
        </ScrollView>
      </View>
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
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    marginTop: 30,
  },
});
