import styled from 'styled-components/native';
//Background,Nome,Saldo,Tittle

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;
export const Container = styled.View`
  margin-left: 15px;
  margin-bottom: 25px;
`;

export const Nome = styled.Text`
  font-size: 19px;
  color: #fff;
  font-style: italic;
`;
export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
`;
export const Tittle = styled.Text`
  margin-left: 5px;
  margin-bottom: 10px;
  color: #00b94a;
`;

export const List = styled.FlatList.attrs({
  marginHorizontal: 15,
})`
  padding-top: 15px;
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-left: 8px;
  margin-right: 8px;
`;
export const AreaView = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: baseline;
`;
