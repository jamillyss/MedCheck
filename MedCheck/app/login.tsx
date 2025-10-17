import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';

export default function TelaDeLogin() {
  // 1. Criando as "memórias" para guardar o e-mail e a senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 2. A função que será executada quando o botão for pressionado
  const handleLogin = () => {
    // 3. Verificação: se e-mail OU senha estiverem vazios...
    if (!email || !senha) {
      // ...mostre um alerta na tela.
      Alert.alert(
        'Atenção!',
        'Por favor, preencha todos os campos.'
      );
      return; // E pare a função aqui.
    }

    // 4. Se a verificação passar, execute este código.
    console.log('Login bem-sucedido!');
    console.log('E-mail:', email);
    console.log('Senha:', senha);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Bem-vindo ao MedCheck</Text>
      
      {/* Campo de E-mail/Usuário, conectado à memória 'email' */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail ou usuário"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Adiciona um teclado otimizado para e-mail
        autoCapitalize="none" // Garante que o e-mail comece com letra minúscula
      />

      {/* Campo de Senha, conectado à memória 'senha' */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão de Entrar, que chama a função 'handleLogin' ao ser tocado */}
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoDoBotao}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}

// Folha de estilos para organizar o visual
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  botao: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textoDoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});