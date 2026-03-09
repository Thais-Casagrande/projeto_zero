//importa a biblioteca react 
// useEffect é gatilho de ação
// useState serve para o app pegar as infos do BD e guardar no usestate para aparecer na tela
import React, { useEffect, useState } from 'react'; 
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
// aqui importa componentes nativos do react

export default function TabOneScreen() {//vai carregar esse function assim que o app abrir
  const [dados, setDados] = useState([]);// começa array vazio pq não te nada do BD ainda
  //setdadod é a unica função permitida para alterar o valor dos dados

  const [loading, setLoading] = useState(true); //app coemça "carregando" por padrão

  useEffect(() => {// meu gatilho de ação useeffect vao receber o fetch
    // aqui vai o endereço de IPv4 :3000/dados 
    fetch('http://192.168.1.10:3000/dados') //esse é o meu, coloque o de vocês
      .then(res => res.json()) //quando server responde, trabforma em json
      .then(json => {
        setDados(json);// pega lista do BD e guarda na variável dados
        setLoading(false);  //avisa o seu app que ja tem, os dados, para de carregar e mostra a lista json
      })
      .catch(err => { // se servidor estiver desligado cai aqui
        console.error("Erro ao conectar na API:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {// o loading começou como true, então quando chegar nessa linha, ele vai ver se ainda é evrdadeira
    return ( // se for executa e para aqui
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }
// se não, vem para o return principal, onde os dados foram carregados
  return (
    <View style={styles.container}> 
      <Text style={styles.titulo}>APP projeto_zero</Text>
      <FlatList
        data={dados} // recebe as infos do BD que estão guardadas no useState
        keyExtractor={(item) => item.id.toString()}// usanos o id no BD e tranformando em string
        renderItem={({ item }) => ( // para cada item do array vai criar um componente visual
          <View style={styles.card}>
            <Text style={styles.texto}>{item.conteudo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#27ae60', textAlign: 'center' },
  card: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#27ae60' },
  texto: { fontSize: 16 }
});