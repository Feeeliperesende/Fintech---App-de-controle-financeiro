import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Container, Tipo, IconView, Tipotext, ValorText } from './styles';
import { Feather } from '@expo/vector-icons';
export default function Historicolist({ data, deleteItem }) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Tipo>
          <IconView tipo={data.tipo}>
            <Feather
              name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
              color="#FFF"
              size={20}
            />
            <Tipotext>{data.tipo}</Tipotext>
          </IconView>
        </Tipo>
        <ValorText>R${data.valor}</ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
