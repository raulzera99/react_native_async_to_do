import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TextInput, Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditTaskScreen = ({ navigation, route }) => {
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
        console.error("Erro ao buscar tarefa para edição: ", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskStatus, setTaskStatus] = useState("aberta");

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setTaskDate(new Date(task.date));
      setTaskStatus(task.status);
    }
  }, [task]);

  const saveEditedTask = async () => {
    try {
      const editedTask = {
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        date: taskDate,
        status: taskStatus,
      };

      const tasks = await AsyncStorage.getItem("tasks");
      const taskArray = JSON.parse(tasks) || [];

      const updatedTasks = taskArray.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );

      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      console.error("Erro ao salvar tarefa editada: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Editar Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Título da Tarefa"
        value={taskTitle}
        onChangeText={(text) => setTaskTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
      />
      <Text style={{ marginVertical: 20 }}>Data de Término da Tarefa: </Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={taskDate}
        mode="datetime"
        is24Hour={true}
        display="default"
        onChange={(event, date) => setTaskDate(date)}
      />
      <Text style={{ marginTop: 20 }}>Status da Tarefa:</Text>
      <Picker
        style={styles.picker}
        selectedValue={taskStatus}
        onValueChange={(itemValue) => setTaskStatus(itemValue)}
      >
        <Picker.Item label="Aberta" value="aberta" />
        <Picker.Item label="Realizada" value="realizada" />
        <Picker.Item
          label="Parcialmente Realizada"
          value="parcialmente_realizada"
        />
        <Picker.Item label="Atrasada" value="atrasada" />
        <Picker.Item label="Cancelada" value="cancelada" />
      </Picker>
      <Button
        title="Salvar Edição"
        onPress={saveEditedTask}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  picker: {
    width: "100%",
  },
});

export default EditTaskScreen;
