import React, { useEffect, useState } from "react";
import { View, SectionList, StyleSheet } from "react-native";
import { Text, Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskCard from "../components/TaskCard";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

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

    const sections = Object.keys(filtered).map((status) => ({
      title: status,
      data: filtered[status],
    }));

    // Deixa as tarefas "canceladas" no final da lista.
    sections.sort((a, b) => {
      if (a.title === "cancelada" && b.title === "cancelada") {
        return 0;
      } else if (a.title === "cancelada") {
        return 1;
      } else if (b.title === "cancelada") {
        return -1;
      }
      return 0;
    });
    // Deixa as tarefas abertas no início da lista e as ordena por data e horário de término
    sections.sort((a, b) => {
      if (a.title === "aberta" && b.title === "aberta") {
        const dateA = new Date(a.data[0].date).getTime();
        const dateB = new Date(b.data[0].date).getTime();

        if (dateA === dateB) {
          // Se as datas forem iguais, compare o horário.
          const timeA = new Date(a.data[0].date).getTime();
          const timeB = new Date(b.data[0].date).getTime();
          return timeA > timeB ? 1 : -1;
        } else {
          return dateA > dateB ? 1 : -1;
        }
      }
      return 0;
    });

    setFilteredTasks(sections);
  }, [tasks]);

  const goToTaskDetails = (taskId) => {
    navigation.navigate("TaskDetails", { taskId });
  };

  const handleTaskToggle = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        if (task.status === "aberta") task.status = "realizada";
        else task.status = "aberta";
      }
      return task;
    });

    // Separe as tarefas realizadas e não realizadas.
    const openTasks = updatedTasks.filter(
      (task) => task.status !== "realizada"
    );

    const completedTasks = updatedTasks.filter(
      (task) => task.status === "realizada"
    );

    // Combine as tarefas novamente, com as tarefas realizadas no final.
    const reorganizedTasks = [...openTasks, ...completedTasks];

    setTasks(reorganizedTasks);
    AsyncStorage.setItem("tasks", JSON.stringify(reorganizedTasks));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tarefas</Text>

      <View style={styles.sectionList}>
        <SectionList
          sections={filteredTasks}
          keyExtractor={(item, index) => item.id.toString()}
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
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{capitalize(title)}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4", // Cor de fundo
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold", // Negrito
    color: "#333", // Cor do texto
    textAlign: "center", // Alinhamento horizontal
  },
  sectionList: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: "#009688", // Cor de fundo do cabeçalho da seção
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Cor do texto
    textAlign: "center", // Alinhamento horizontal
  },
});

export default HomeScreen;
