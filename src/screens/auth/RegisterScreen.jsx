import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Salvar as informações de cadastro localmente no AsyncStorage
      await AsyncStorage.setItem("fullName", fullName);
      await AsyncStorage.setItem("nickname", nickname);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login"); // Redireciona para a tela de login após o cadastro.
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={(text) => setNickname(text)}
        value={nickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Já tem uma conta? Faça login aqui
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: "blue",
  },
});

export default RegisterScreen;
