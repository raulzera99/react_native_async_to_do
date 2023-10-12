import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskDetailsScreen = ({ route }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const tasks = await AsyncStorage.getItem("tasks");
        const taskArray = JSON.parse(tasks) || [];

        const selectedTask = taskArray.find((item) => item.id === taskId);
        setTask(selectedTask);
      } catch (error) {
        console.error("Erro ao buscar detalhes da tarefa: ", error);
      }
    };

    fetchTask();
  }, [taskId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Tarefa</Text>
      {task ? (
        <View style={styles.taskDetails}>
          <Text style={styles.label}>ID da Tarefa:</Text>
          <Text style={styles.text}>{task.id}</Text>
          <Text style={styles.label}>Título:</Text>
          <Text style={styles.text}>{task.title}</Text>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.text}>{task.description}</Text>
          <Text style={styles.label}>Data e Hora:</Text>
          <Text style={styles.text}>
            {new Date(task.date).toLocaleString()}
          </Text>
          <Text style={styles.label}>Situação:</Text>
          <Text style={styles.text}>{task.status}</Text>
        </View>
      ) : (
        <Text style={styles.noTask}>Detalhes da tarefa não encontrados</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskDetails: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  noTask: {
    fontSize: 18,
    color: "gray",
  },
});

export default TaskDetailsScreen;
