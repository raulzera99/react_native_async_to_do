import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Text, Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskCard from "../components/TaskCard";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState({});

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

  useEffect(() => {
    const filtered = tasks.reduce((result, task) => {
      if (!result[task.status]) {
        result[task.status] = [];
      }
      result[task.status].push(task);
      return result;
    }, {});

    setFilteredTasks(filtered);
  }, [tasks]);

  const goToTaskDetails = (taskId) => {
    navigation.navigate("TaskDetails", { taskId });
  };

  const handleTaskToggle = (taskId) => {
    // Atualize o status da tarefa no AsyncStorage sendo que os tipos de status são: aberta e realizada.

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (task.status === "aberta") task.status = "realizada";
        else task.status = "aberta";
      }
      return task;
    });

    setTasks(updatedTasks);
    AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);

    filterTasksByStatus();
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
              <TaskCard
                task={item}
                onPress={() => goToTaskDetails(item.id)}
                onPressEdit={() =>
                  navigation.navigate("EditTaskScreen", { taskId: item.id })
                }
                onToggle={() => handleTaskToggle(item.id)}
              />
            )}
          />
        </View>
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
  horizontalFilterBar: {
    flexDirection: "row",
  },
  horizontalFilterBar: {
    padding: 10,
  },
  statusButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statusButton: {
    flex: 1,
    margin: 5,
  },
  selectedStatusButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default HomeScreen;
