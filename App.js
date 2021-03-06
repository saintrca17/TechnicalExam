import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  CheckBox,
  KeyboardAvoidingView
} from 'react-native';
import validator from 'validator';
import { Button } from './Button';
import View2 from './View2';
import EStyleSheet from 'react-native-extended-stylesheet';
import logo from './assets/images/Logo.png';

EStyleSheet.build();


/* Main */
export default class AwesomeProject extends Component {
  render() {
    return (

      <KeyboardAvoidingView style={styles.bckgrndClrLogin} behavior="padding" enabled>
        <LogoContainer />
        <LoginContainer />
      </KeyboardAvoidingView>

    );
  }
}

/* Logo Container */
class LogoContainer extends Component {
  render() {
    return (
      <View style={styles.logoCntnr}>
        <Image source={logo} style={styles.logo}></Image>
      </View>
    );
  }
}

/* Login Container */
class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: null,
      isPasswordValid: null,
      isFormValid: false,
    }
  }

  render() {
    return (
      <View style={styles.loginCntnr}>
        <Text style={styles.inputLbl}>Email</Text>
        <TextInput style={styles.input} placeholder={"Input email address"} onChangeText={(text) => this.validate(text, 'email')} />
        <View2 hide={this.state.isEmailValid == true || this.state.isEmailValid == null}>
          <Text style={styles.errorlbl}>not correct for email address</Text>
        </View2>
        <Text style={[styles.inputLbl, styles.mdmpaddingtop]}>Password</Text>
        <TextInput style={styles.input} secureTextEntry={true} placeholder={"Input password"} onChangeText={(text) => this.validate(text, 'password')} />
        <View2 hide={this.state.isPasswordValid == true || this.state.isPasswordValid == null}>
          <Text style={styles.errorlbl}>please use at least 6-12 characters</Text>
        </View2>
        <View style={[styles.rememberMe, styles.mdmpaddingtop]}>
          <CheckBox style={styles.chckbox} />
          <Text style={styles.checkboxLbl}> Remember me</Text>
        </View>
        <View style={styles.lrgpaddingtop}>
          {this.state.isFormValid == true ?
            (
              <Button text="Sign In"
                onPress={() => console.warn('Valid Form!')} disabled={false} />
            ) : (
              <Button text="Sign In" disabled={true} />
            )
          }
        </View>
      </View>
    );
  }

  /* this functions */
  validate(data, type) {

    if (type == 'email') {
      if (validator.isEmail(data) == true) {
        console.warn("Valid email.");
        this.setState({ isEmailValid: true })

      } else {
        console.warn("Invalid email.");
        this.setState({ isEmailValid: false })

      }
    }

    if (type == 'password') {
      if (data.length >= 6 && data.length <= 12) {
        console.warn("Valid password.");
        this.setState({ isPasswordValid: true })
      }
      else {
        console.warn("Invalid password.");
        this.setState({ isPasswordValid: false })
      }
    }

    if (this.state.isEmailValid && this.state.isPasswordValid) {
      this.setState({ isFormValid: true })
    } else {
      this.setState({ isFormValid: false })
    }

  }

}

/* Styles */
const styles = StyleSheet.create({
  bckgrndClrLogin: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#fbf8ff'
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoCntnr: {
    marginTop: 100,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 200
  },
  loginCntnr: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    /* backgroundColor: 'yellow' */
  },
  inputLbl: {
    color: 'black',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    marginBottom: 3
  },
  input: {
    height: 40,
    borderColor: '#7d59c0',
    borderRadius: 7,
    borderWidth: 1,
  },
  mdmpaddingtop: {
    paddingTop: 15
  },
  lrgpaddingtop: {
    paddingTop: 30
  },
  rememberMe: {
    flexDirection: 'row'
  },
  checkboxLbl: {
    color: 'black',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 15,
    marginTop: 3
  },
  chckbox: {
    borderColor: '#7d59c0'
  },
  errorlbl: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'HelveticaNeue-Italic',
  }

});

