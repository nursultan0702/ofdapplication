import React, { Component } from "react";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Footer,
  FooterTab,
  DatePicker,
  Input,
  Item
} from "native-base";
import styles from "../../styles";


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      email: 'email',
      password: 'password',
      isDateTimePickerVisible: false,
      stateDate:'00-00-0000'
    };
  }
  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    });
  }
  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false
    });
  }
  toggleTab3() {
    this.setState({
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false
    });
  }
  toggleTab4() {
    this.props.navigation.navigate('Profile');
    this.setState({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true
    });
  }

  login(){
      const email = this.state.email;
      const password = this.state.password;
      fetch('https://test-tandau.iberica.kz/serv/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
            dataSource: responseJson,
            }, function(){
                console.warn("succes"+this.state.dataSource.token);
            });

        })
        .catch((error) =>{
            console.warn(error);
        });
  }
  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    console.warn('A date has been picked: ', date);
    this.setState({
      stateDate: date
    })
    this.hideDateTimePicker();
  };

render() {
return (
  <Container style={styles.container}>
    <Header>
      <Left>
        <Button style={{paddingLeft:30}} transparent>
          <Icon name="camera" />
        </Button>
      </Left>
      <Body>
     
      </Body>
      <Right>
        <Button style={{paddingRight:30}} transparent>
          <Icon name="search" />
        </Button>
      </Right>
    </Header>
    <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
    <Item rounded>
    <Button onPress={this.showDateTimePicker} transparent>
          <Text>text</Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode='datetime'
        />
    </Item>
    <Item rounded>
        <Input  onChangeText={(email) => this.setState({email})}
                 placeholder="email"/>
    </Item>
    <Item rounded>
        <Input  onChangeText={(password) => this.setState({password})}
                 placeholder="password"/>
    </Item>
        <Button style={styles.inputs} onPress={() => this.login()} full primary><Text>Login</Text></Button>
    </Content>
    <Footer>
      <FooterTab>
        <Button active={this.state.tab1} onPress={() => this.toggleTab1()}>
          <Icon active={this.state.tab1} name="apps" />
          <Text>Apps</Text>
        </Button>
        <Button active={this.state.tab2} onPress={() => this.toggleTab2()}>
          <Icon active={this.state.tab2} name="camera" />
          <Text>Camera</Text>
        </Button>
        <Button active={this.state.tab3} onPress={() => this.toggleTab3()}>
          <Icon active={this.state.tab3} name="compass" />
          <Text>Compass</Text>
        </Button>
        <Button active={this.state.tab4} onPress={() => this.toggleTab4()}>
          <Icon active={this.state.tab4} name="contact" />
          <Text>Contact</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
);
}
}

export default HomeScreen;


