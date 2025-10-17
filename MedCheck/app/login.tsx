import { Link } from 'expo-router'; // 1. Importamos a peça <Link> para navegação
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TelaDeLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Atenção!', 'Por favor, preencha todos os campos.');
      return;
    }
    console.log('Login bem-sucedido!');
    console.log('E-mail:', email);
    console.log('Senha:', senha);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>Bem-vindo ao MedCheck</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail ou usuário"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoDoBotao}>Entrar</Text>
      </TouchableOpacity>

      {/* 2. ADICIONAMOS ESTA SEÇÃO PARA OS LINKS */}
      <View style={styles.linksContainer}>
        <Link href="/cadastro" style={styles.link}>
          Não tem uma conta? Cadastre-se
        </Link>
        <Link href="/esqueceu-senha" style={styles.link}>
          Esqueceu sua senha?
        </Link>
      </View>

    </View>
  );
}

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
  },
  // 3. ADICIONAMOS OS ESTILOS PARA OS LINKS
  linksContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
  },
});