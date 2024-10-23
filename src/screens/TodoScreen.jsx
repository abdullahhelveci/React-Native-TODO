import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { AddCircle, CloseCircle, Edit2, Forbidden2, TickCircle, Trash } from 'iconsax-react-native';

const {width, height} = Dimensions.get('window');

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [editTodoText, setEditTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      } else {
        setTodos([]);
      }
    } catch (error) {}
  };

  const editTodo = () => {
    if (selectedTodo) {
      const updatedTodos = todos.map(item =>
        item.id === selectedTodo.id ? {...item, text: editTodoText} : item,
      );

      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setOpen(false);
      setSelectedTodo(null);
      setEditTodoText('');
    }
  };

  const deleteTodo = id => {
    const filtered = todos.filter(item => item.id !== id);
    setTodos(filtered);
    saveTodos(filtered);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = () => {
    if (todo.trim() === '') return;
    const updatedTodos = [...todos, {id: uuid.v4(), text: todo}];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTodo('');
  };

  const completedTodo = async id => {
    const updateTodos = todos.map(item => item.id === id ? {...item,completed: !item.completed} : item)

    setTodos(updateTodos),
    saveTodos(updateTodos)
  }

  return (
    <LinearGradient colors={['#fef3c7', '#a78bfa']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>React-Native Todo-List</Text>
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: 'column',
              width: width * 0.94,
              height: height * 0.08,
              gap: 10,
              marginBottom: 50,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                onChangeText={text => setTodo(text)}
                placeholder="Type a todo.."
                style={styles.input}
                value={todo}
              />
              <TouchableOpacity
                onPress={addTodo}
                style={[styles.button, styles.addButton]}>
                <AddCircle size='32' color='#ff8a65' variant='Broken' />
              </TouchableOpacity>
            </View>

            {open && (
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.input}
                  placeholder="edit.."
                  value={editTodoText}
                  onChangeText={text => setEditTodoText(text)}
                />
                <TouchableOpacity
                  onPress={editTodo}
                  style={[
                    styles.button,
                    styles.addButton
                  ]}>
                  
                  <TickCircle size='32' color='blue' variant='Broken' />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <FlatList
          data={todos}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[styles.todoText, item.completed && styles.competedText]}>
                {item.text}
              </Text>
              <View style={{flexDirection: 'row'}}>

              <View style={styles.buttonContainer}>
                  <TouchableOpacity
                  onPress={() => completedTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    {
                      item.completed ? (
                        <CloseCircle size='24' color='#000' variant='Broken' />
                      ) : (
                        <TickCircle size='27' color='green' variant='Broken' />
                      )
                    }
                  </TouchableOpacity>
                </View>


                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                  onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                   
                   <Trash size='27' color='red' variant='Broken' />
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  {open ? (
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.updateButton
                      ]}
                      onPress={() => {
                        setOpen(!open);
                      }}>
                      <Forbidden2 size='27' color='#ff8a65' variant='Broken' />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.button, styles.updateButton]}
                      onPress={() => {
                        setSelectedTodo(item);
                        setEditTodoText(item.text);
                        setOpen(!open);
                      }}>
                      <Edit2 size='27' color='yellow' variant='Broken' />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  todoText:{
    fontWeight: 'bold',
    fontSize: 18,
    textAlign:'center'
  },
  competedText:{
    textDecorationLine: 'line-through',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#ff8a65',
    borderRadius: 10,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: 'Gray',
  },
  button: {
    padding: 8,
    width: 40,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
  buttonContainer: {},
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop: 15,
    borderWidth: 1,
    padding: 7,
    borderRadius: 10,
    borderColor: 'gray',
  }
});
