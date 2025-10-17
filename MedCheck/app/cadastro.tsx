import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const isEmailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isDDDValido = (telefone: string) => {
  if (telefone.length < 2) return false;
  const ddd = telefone.substring(0, 2);
  const dddsValidos = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
  return dddsValidos.includes(ddd);
};
const isSenhaInvalida = (senha: string) => {
    if ("0123456789".includes(senha) || "9876543210".includes(senha)) return true;
    if (new Set(senha.split('')).size === 1) return true;
    return false;
};

export default function TelaDeCadastro() {
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const [cpfError, setCpfError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const handleMudancaCampoNumerico = (text: string, setValor: (value: string) => void, setError: (value: string) => void, nomeCampo: string) => {
    if (/[^0-9]/.test(text)) {
      setError(`O campo ${nomeCampo} aceita apenas números.`);
    } else {
      setError('');
      setValor(text);
    }
  };

  const handleCadastro = () => {
    if (!cpf || !nome || !email || !senha || !telefone) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (!isEmailValido(email)) {
      Alert.alert('Erro', 'O formato do e-mail é inválido.');
      return;
    }
    // Adicione aqui outras validações finais se desejar
    
    Alert.alert('Sucesso!', 'Conta criada!', [{ text: 'OK', onPress: () => router.push('/login') }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua Conta</Text>

      <TextInput
        style={[styles.input, cpfError ? styles.inputError : null]}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => handleMudancaCampoNumerico(text, setCpf, setCpfError, 'CPF')}
        keyboardType="numeric"
        maxLength={11}
      />
      {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

      <TextInput 
        style={styles.input} 
        placeholder="Nome Completo" 
        value={nome} 
        onChangeText={setNome} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email} 
        onChangeText={setEmail} // A CORREÇÃO ESTÁ AQUI
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, telefoneError ? styles.inputError : null]}
        placeholder="Telefone com DDD"
        value={telefone}
        onChangeText={(text) => handleMudancaCampoNumerico(text, setTelefone, setTelefoneError, 'Telefone')}
        keyboardType="phone-pad"
        maxLength={11}
      />
      {telefoneError ? <Text style={styles.errorText}>{telefoneError}</Text> : null}

      <TextInput
        style={[styles.input, senhaError ? styles.inputError : null]}
        placeholder="Senha numérica de 6 dígitos"
        value={senha}
        onChangeText={(text) => handleMudancaCampoNumerico(text, setSenha, setSenhaError, 'Senha')}
        keyboardType="numeric"
        maxLength={6}
        secureTextEntry
      />
      {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoDoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Já tem uma conta? Faça login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  input: { 
    width: '100%', height: 50, backgroundColor: '#fff', borderRadius: 8, 
    paddingHorizontal: 15, fontSize: 16, borderWidth: 1, borderColor: '#ddd',
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  botao: { width: '100%', height: 50, backgroundColor: '#28a745', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  textoDoBotao: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 20, color: '#007BFF', fontSize: 16 },
});