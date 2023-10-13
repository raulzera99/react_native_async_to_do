import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { Button, Card, CheckBox } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";

const TaskCard = ({ task, onPress, onPressEdit, onToggle }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <Card style={styles.card}>
        <Card.Title style={styles.title}>{task.title}</Card.Title>
        <Card.Divider />
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.date}>
          Data de Término: {new Date(task.date).toLocaleString()}
        </Text>
        <View style={styles.footer}>
          <Button
            icon={<Icon name="edit" color="#ffffff" />}
            buttonStyle={styles.editButton}
            title=" EDITAR"
            onPress={onPressEdit}
          />
          <CheckBox
            title="Concluída"
            {...(task.status === "realizada" ? { checked: true } : {}) }
            onPress={onToggle}
          />
        </View>
      </Card>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#b0b0b0",
    borderRadius: 5,
  },
});

export default TaskCard;
