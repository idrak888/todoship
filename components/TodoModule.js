import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux';

const TodoModule = props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => props.toggleModule(props.date)} style={styles.head}>
                <Text style={{fontSize: 25, color: 'white'}}>{props.date}</Text>
                <Text style={{fontSize: 22, color: '#0299F0', fontWeight: 'bold'}}>{props.checkedTodos}/{props.todos.length}</Text>
            </TouchableOpacity>
            {props.showTodos ? 
                <View style={styles.inner}>
                    <FlatList
                        data={props.todos}
                        keyExtractor={item => item.text}
                        renderItem={data => {
                            return (
                                <View style={styles.todo}>       
                                    <Text style={{color: 'white', fontSize: 22}}>{data.item.text}</Text>
                                    <CheckBox 
                                        checked={data.item.checked}
                                        onPress={() => props.checkTodo(data.item.text)}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
                :
                <View></View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    head: {
        backgroundColor: '#303030',
        padding: 18,
        width: '100%',
        marginTop: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#0299F0',
        borderWidth: 1
    },
    todo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#202020', 
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        borderBottomColor: '#353535', 
        borderBottomWidth: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoModule);