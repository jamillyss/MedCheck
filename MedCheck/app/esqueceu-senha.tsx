import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';

// Reutilizamos nossa função de validação de e-mail!
const isEmailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function TelaEsqueceuSenha() {
  const router = useRouter(); // Para navegar de volta ao login
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    // 1. Validação: O campo está vazio?
    if (!email) {
      Alert.alert('Atenção!', 'Por favor, digite o seu e-mail.');
      return;
    }

    // 2. Validação: O formato do e-mail é válido?
    if (!isEmailValido(email)) {
      Alert.alert('Atenção!', 'Por favor, digite um formato de e-mail válido.');
      return;
    }

    // 3. Se tudo estiver certo, simulamos o sucesso
    console.log('Solicitação de recuperação para o e-mail:', email);
    Alert.alert(
      'Verifique seu e-mail',
      `Se houver uma conta associada a ${email}, um link para redefinir sua senha foi enviado.`,
      // Botão que leva de volta ao login após o sucesso
      [{ text: 'OK', onPress: () => router.push('/login') }] 
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recuperar Senha</Text>
      <Text style={styles.instrucao}>
        Digite o e-mail associado à sua conta e nós enviaremos as instruções para redefinir sua senha.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botao} onPress={handleRecuperarSenha}>
        <Text style={styles.textoDoBotao}>Enviar Instruções</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Lembrou a senha? Voltar para o Login
      </Link>
    </View>
  );
}

// Estilos consistentes com o resto do app
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
    marginBottom: 20,
  },
  instrucao: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
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
    backgroundColor: '#ffc107', // Um amarelo/laranja para "atenção/recuperação"
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textoDoBotao: {
    color: '#212529', // Texto escuro para contrastar com o amarelo
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#007BFF',
    fontSize: 16,
  },
});