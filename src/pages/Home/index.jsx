import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { format, isBefore } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../Contexts/auth';
import Header from '../../Components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from '../../Components/DatePicker';
import {
  Background,
  Container,
  Nome,
  Saldo,
  Tittle,
  List,
  AreaView,
} from './styles';
import Historicolist from '../../Components/Historicolist';
export default function Home() {
  const { user } = useContext(AuthContext);
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState(new Date());
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref('users')
        .child(uid)
        .on('value', (snapshot) => {
          setSaldo(snapshot.val().saldo);
        });
      await firebase
        .database()
        .ref('historico')
        .child(uid)
        .orderByChild('date')
        .equalTo(format(new Date(), 'dd/MM/yyyy'))
        .limitToLast(10)
        .on('value', (snapshot) => {
          setHistorico([]);
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };
            setHistorico((oldArray) => [...oldArray, list].reverse());
          });
        });
    }
    loadList();
  }, [newDate]);

  function handleDelete(data) {
    //pegando a data do item
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${anoItem}`);
    //pegando data hoje:
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`);

    if (isBefore(dateItem, dateHoje)) {
      alert('Você não pode excluir um registro antigo!');
      return;
    }
    Alert.alert(
      'Cuidado Atençao!',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data),
        },
      ]
    );
  }

  function handleShowPicker() {
    setShow(true);
  }
  function handleclose() {
    setShow(false);
  }
  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date);
  };

  async function handleDeleteSuccess(data) {
    await firebase
      .database()
      .ref('historico')
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === 'despesa'
          ? (saldoAtual += parseFloat(data.valor))
          : (saldoAtual -= parseFloat(data.valor));

        await firebase
          .database()
          .ref('users')
          .child(uid)
          .child('saldo')
          .set(saldoAtual);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R${saldo.toFixed(2)}</Saldo>
      </Container>

      <AreaView>
        <TouchableOpacity onPress={handleShowPicker}>
          <MaterialIcons name="event" size={30} color="#FFF" />
        </TouchableOpacity>
        <Tittle>Últimas movimentações</Tittle>
      </AreaView>
      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Historicolist data={item} deleteItem={handleDelete} />
        )}
      />
      {show && (
        <DatePicker onClose={handleclose} date={newDate} onChange={onChange} />
      )}
    </Background>
  );
}
