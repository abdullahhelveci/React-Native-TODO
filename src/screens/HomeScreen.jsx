import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window')

const HomeScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          style={{flex: 1}}
          source={require('../../src/assets/animations/confetti.json')}
          autoPlay
          loop
        />
      </View>

    <TouchableOpacity
    onPress={() => navigation.navigate('Todo')}
    >
      <LinearGradient style={styles.addTaskButton} colors={['#a78bfa','#fef3c7']}>
        <Text style={styles.addTaskText}>New Task, Who's In?</Text>
      </LinearGradient>
    </TouchableOpacity>

    <TouchableOpacity
    // onPress={() => navigation.navigate('Todo')
    >
      <LinearGradient style={styles.resetButton} colors={['#a7f3d0','#ff6347']}>
        <Text style={styles.resetText}>Reset</Text>
      </LinearGradient>
    </TouchableOpacity>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#fef3c7'
  },
  lottie:{
    width:width*0.9,
    height: width
  },
  addTaskButton:{
    paddingVertical:15,
    paddingHorizontal:30,
    marginVertical:20,
    borderRadius:15,
    shadowColor:'#000',
    shadowOffset: {width:0,height: 2},
    shadowOpacity:0.3,
    shadowRadius:10,
    marginTop:10,
    elevation:4
  },
  addTaskText:{
    color: '#fff',
    fontWeight:'bold',
    textAlign:'center',
  },
  resetButton:{
    paddingVertical:15,
    paddingHorizontal:30,
    borderRadius:15,
    shadowColor:'#000',
    shadowOffset: {width:0,height: 2},
    shadowOpacity:0.3,
    shadowRadius:10,
    marginTop:10,
    elevation:4
  },
  resetText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center'
  }
});
