import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Text, Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskCard from "../components/TaskCard";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
      }
    };

    fetchTasks();
  }, []);

  const goToTaskDetails = (taskId) => {
    navigation.navigate("TaskDetails", { taskId });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant="h3" style={styles.text}>
          Lista de Tarefas
        </Text>

        <View style={{ flex: 1 }}>
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              //   <View style={styles.taskContainer}>
              //     <Button
              //       title={item.title}
              //       onPress={() => goToTaskDetails(item.id)}
              //       style={styles.taskButton}
              //     />
              //     <Text>{item.description}</Text>
              //     <Text>Data: {new Date(item.date).toLocaleString()}</Text>
              //   </View>
              <TaskCard task={item} onPress={() => goToTaskDetails(item.id)} />
            )}
          />
        </View>

        {/* {tasks.map((task) => (
            <Button
              key={`task_${task.id}`}
              title={task.title}
              onPress={() => goToTaskDetails(task.id)}
              style={styles.btn}
            />
          ))} */}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 20,
  },
  btn: {
    marginBottom: 10,
  },
};

export default HomeScreen;
