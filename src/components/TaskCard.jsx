// TaskCard.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";

const TaskCard = ({ task, onPress }) => {
  return (
    <View style={styles.card}>
      <Button
        title={task.title}
        onPress={onPress}
        style={styles.taskButton}
        color="#007AFF" // Cor do botão
      />
      <Text style={styles.description}>{task.description}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Data:</Text>
        <Text style={styles.dateValue}>
          {new Date(task.date).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  taskButton: {
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  dateValue: {
    color: "#555",
  },
});

export default TaskCard;
