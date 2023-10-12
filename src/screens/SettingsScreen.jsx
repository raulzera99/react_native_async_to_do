import React from "react";
import { View, Alert, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const clearAllDataAndReset = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      Alert.alert(
        "Dados Apagados e Aplicação Resetada",
        "Todos os dados locais foram apagados e a aplicação foi resetada com sucesso.",
        [{ text: "OK", onPress: () => console.log("Alerta fechado.") }]
      );
    } catch (error) {
      console.error("Erro ao apagar dados: ", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Limpar Dados Locais e Resetar"
        onPress={clearAllDataAndReset}
        color="#FF0000"
      />
    </View>
  );
};

export default SettingsScreen;
