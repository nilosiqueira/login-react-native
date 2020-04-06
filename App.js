import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text, Animated, Keyboard  } from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 155, y: 130}))

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDigHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      })
    ]).start();

  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 65,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 55,
        duration: 100,
      })
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 155,
        duration: 100,
      }),
      Animated.timing(logo.y, {
        toValue: 130,
        duration: 100,
      })
    ]).start();
  }

  return (
      <KeyboardAvoidingView style={styles.background}>
        <View style={styles.containerlogo}>
          <Animated.Image 
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./assets/icon.png')} />
        </View>

        <Animated.View 
        style={[
          styles.container,
          {
            opacity: opacity,

            transform: [
              { translateY: offset.y }
            ]
          }
        ]}>
        <TextInput 
        style={styles.input}
        placeholder='Email'
        autoCorrect={false}
        onChangeText={() => {}}
        />
        <TextInput 
        style={styles.input}
        placeholder='Senha'
        autoCorrect={false}
        onChangeText={() => {}}
        />
      
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}>Criar conta gratuita</Text>
        </TouchableOpacity>

        </Animated.View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  containerlogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7
  },
  submitText: {
    color: '#fff',
    fontSize: 18
  },
  btnRegister: {

  },
  registerText: {
    marginTop: 10,
  },
  registerText: {
    color: '#FFF'
  }
})