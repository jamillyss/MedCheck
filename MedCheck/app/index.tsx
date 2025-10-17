import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router'; // 1. IMPORTAR a peça Link

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <Text>Minha tela inicial, feita do zero!</Text>

      {/* 2. ADICIONAR a nossa "porta" mágica */}
      <Link href="/login" style={styles.link}>
        Ir para Login
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16, // Adiciona um espacinho entre os textos
  },
  // 3. ADICIONAR um estilo para o link parecer um botão
  link: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden', // Garante que o fundo arredondado funcione bem
  }
});