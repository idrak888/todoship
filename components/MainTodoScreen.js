import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import TodoModule from './TodoModule';
import AddTodoModal from './AddTodoModal';

class MainTodoScreen extends Component {
    state = {
        showModal: false,
        newTodoText: '',
        todoModules: []
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = async () => {
        try {
            const d = new Date();
            var today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            let lastDate = await AsyncStorage.getItem('lastDate');

            if (lastDate && JSON.parse(lastDate) == today) {
                let todoModules = await AsyncStorage.getItem('todoModules');
                this.props.updateTodoModules(JSON.parse(todoModules));
                this.setState({todoModules: JSON.parse(todoModules)});

                if (this.props.todoModules[0].todos.length < 1) {
                    this.setState({showModal: true});
                }
            } else {
                var arr = [];
                var newTodoModule = {date: today, todos: [], showTodos: true, checkedTodos: 0};
                arr.push(newTodoModule);

                this.setState({todoModules: arr});
                this.updateTodoModules(arr);
                this.updateLastDate(today);
            }
            
        } catch (e) {
            console.log(e);
        }
    }
    checkTodo = (text, date) => {
        var todoModules = this.props.todoModules;
        for (let todo of todoModules[0].todos) {
            if (todo.text == text) {
                todo.checked = !todo.checked;
                break;
            }
        }
        var checkedTodos = todoModules[0].todos.filter(todo => todo.checked);
        todoModules[0].checkedTodos = checkedTodos.length;
        
        this.setState({todoModules});
        this.updateTodoModules(todoModules);
    }
    toggleModule = date => {
        var todoModules = this.props.todoModules;
        var todoModule = todoModules.filter(todoModule => todoModule.date === date);
        todoModule[0].showTodos = !todoModule[0].showTodos;
        this.setState({todoModules});
    }
    toggleModal = () => {
        var showModal = this.state.showModal;
        this.setState({showModal: !showModal});
    }
    handleChangeText = text => {
        this.setState({newTodoText: text});
    }
    addTodo = () => {
        var todoModules = this.props.todoModules;
        todoModules[0].todos.push({text: this.state.newTodoText, checked: false});

        this.setState({todoModules});
        this.updateTodoModules(todoModules);
        this.setState({showModal: false, newTodoText: ''});
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <StatusBar translucent {...this.props} barStyle="light-content" />
                </View>
                <AddTodoModal 
                    addTodo={this.addTodo}
                    handleChangeText={this.handleChangeText} 
                    newTodoText={this.state.newTodoText} 
                    closeModal={this.toggleModal} 
                    showModal={this.state.showModal}
                />
                <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white', paddingHorizontal: 10}}>TodoShip</Text>
                <FlatList 
                    data={this.state.todoModules}
                    keyExtractor={item => item.date}
                    style={{marginVertical: 25}}
                    renderItem={data => {
                    return <TodoModule
                        toggleModule={(date) => this.toggleModule(date)}
                        checkTodo={(text) => this.checkTodo(text, data.item.date)} 
                        checkedTodos={data.item.checkedTodos}
                        todos={data.item.todos} 
                        date={data.item.date} 
                        showTodos={data.item.showTodos}/>
                    }}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={this.toggleModal} style={styles.button}>
                    <Icon name="ios-add" size={50} color="white"/>
                </TouchableOpacity>
            </View>
        );
    }
    updateTodoModules(updatedTodoModules) {
        AsyncStorage.setItem('todoModules', JSON.stringify(updatedTodoModules));
        this.props.updateTodoModules(updatedTodoModules);
    }
    updateLastDate(date) {
        AsyncStorage.setItem('lastDate', JSON.stringify(date));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101010',
        padding: 10,
        paddingVertical: 80
    },
    button: {
        backgroundColor: '#0299F0',
        position: 'absolute',
        bottom:0,
        right: 0,
        marginRight: 20,
        marginBottom: 40,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return { todoModules: state.appReducer.todoModules }
}

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        updateTodoModules: updatedTodoModules => dispatch({ type: 'UPDATE_TODO_MODULES', updatedTodoModules })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTodoScreen);