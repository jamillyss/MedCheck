import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../firebaseConfig'; // Importa nossa chave de conexão

// --- FUNÇÕES DE VALIDAÇÃO (Corrigidas e Testadas) ---

// Valida se o e-mail tem um formato válido
const isEmailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Valida se o DDD existe
const isDDDValido = (telefone: string) => {
  if (telefone.length < 2) return false;
  const ddd = telefone.substring(0, 2);
  const dddsValidos = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', 
    '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', 
    '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', 
    '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', 
    '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', 
    '93', '94', '95', '96', '97', '98', '99'
  ];
  return dddsValidos.includes(ddd);
};

// Valida se a senha é inválida (sequencial ou repetida) - VERSÃO CORRIGIDA
const isSenhaInvalida = (senha: string) => {
  // 1. Verifica se todos os dígitos são iguais (ex: 111111)
  if (new Set(senha.split('')).size === 1) {
    return true;
  }
  
  // 2. Verifica as sequências mais comuns
  const sequencias = [
    "012345", "123456", "234567", "345678", "456789",
    "987654", "876543", "765432", "654321", "543210"
  ];

  if (sequencias.includes(senha)) {
    return true;
  }
  
  return false;
};

// Inicializa o serviço de Autenticação
const auth = getAuth(app);

export default function TelaDeCadastro() {
  const router = useRouter();

  // Estados dos valores
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  // Estados dos erros instantâneos e carregamento
  const [cpfError, setCpfError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- VALIDAÇÃO ATIVA (Em tempo real) - VERSÃO CORRIGIDA ---
  const handleMudancaCampoNumerico = (text: string, setValor: (value: string) => void, setError: (value: string) => void, nomeCampo: string) => {
    // 1. Filtra o texto, permitindo apenas números
    const textoFiltrado = text.replace(/[^0-9]/g, '');
    
    // 2. Atualiza o estado SEMPRE, mas apenas com o texto filtrado
    setValor(textoFiltrado);
    
    // 3. Se o texto original era diferente do filtrado, o usuário tentou digitar algo errado
    if (text !== textoFiltrado) {
      setError(`O campo ${nomeCampo} aceita apenas números.`);
    } else {
      setError(''); // Limpa o erro se o usuário está digitando números
    }
  };

  // --- VALIDAÇÃO FINAL (No Botão) - ESTRUTURA CORRIGIDA ---
  const handleCadastro = async () => {
    setIsLoading(true); // 1. Ligar o "carregando"

    try {
      // 2. Bloco de Validações Locais
      if (!cpf || !nome || !email || !senha || !telefone) {
        throw new Error('Todos os campos são obrigatórios.');
      }
      if (cpf.length !== 11) {
        throw new Error('O CPF deve conter exatamente 11 números.');
      }
      if (!isEmailValido(email)) {
        throw new Error('O formato do e-mail é inválido.');
      }
      if (telefone.length < 10 || !isDDDValido(telefone)) {
        throw new Error('O telefone deve ser válido e conter um DDD existente (mínimo 10 dígitos).');
      }
      if (senha.length !== 6) {
        throw new Error('A senha deve conter exatamente 6 números.');
      }
      if (isSenhaInvalida(senha)) {
        throw new Error('A senha não pode ser sequencial (ex: 123456) ou ter todos os números repetidos (ex: 111111).');
      }

      // 3. Bloco de Validação do Firebase
      // Se passou por tudo, tenta criar o usuário
      await createUserWithEmailAndPassword(auth, email, senha);
      
      // 4. Bloco de Sucesso
      Alert.alert('Sucesso!', 'Sua conta foi criada! Você será redirecionado para o login.', [
        { text: 'OK', onPress: () => router.push('/login') }
      ]);

    } catch (error: any) {
      // 5. Bloco de Erro (Pega TUDO, local ou do Firebase)
      console.error("Erro no cadastro:", error); // Para vermos o erro no terminal
      
      let mensagemErro = error.message; // Pega a mensagem dos "throw new Error"
      
      // Traduz erros específicos do Firebase
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = 'Este e-mail já está em uso por outra conta.';
      } else if (error.code === 'auth/weak-password') {
        mensagemErro = 'A senha é muito fraca (padrão do Firebase). Tente outra.';
      } else if (error.message.includes('auth/')) {
        mensagemErro = "Ocorreu um erro de autenticação. Tente novamente."
      }

      Alert.alert('Erro no Cadastro', mensagemErro);

    } finally {
      // 6. Bloco Final (SEMPRE roda, dando erro ou sucesso)
      setIsLoading(false); // Desliga o "carregando"
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crie sua Conta</Text>

      {/* --- CAMPOS COM VALIDAÇÃO ATIVA --- */}
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
        autoCapitalize="words"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email} 
        onChangeText={setEmail}
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

      {/* --- BOTÃO INTELIGENTE --- */}
      <TouchableOpacity 
        style={[styles.botao, isLoading ? styles.botaoDesabilitado : null]} // Estilo de desabilitado
        onPress={handleCadastro} 
        disabled={isLoading} // Desabilita o botão
      >
        <Text style={styles.textoDoBotao}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Já tem uma conta? Faça login
      </Link>
    </View>
  );
}

// --- ESTILOS COMPLETOS ---
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
  botao: { 
    width: '100%', height: 50, backgroundColor: '#28a745', borderRadius: 8, 
    justifyContent: 'center', alignItems: 'center', marginTop: 10 
  },
  botaoDesabilitado: {
    backgroundColor: '#94d3a2', // Cor mais clara quando desabilitado
  },
  textoDoBotao: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 20, color: '#007BFF', fontSize: 16 },
});