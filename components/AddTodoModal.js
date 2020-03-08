import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements';

const AddTodoModal = props => {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={props.showModal}
        >   
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Image 
                    source={{uri: "https://media0.giphy.com/media/iDClePHKmkrBJ9Pkuf/source.gif"}}
                    style={{marginTop: -80, width: 180, height: 180}}
                />
                <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold'}}>What do you want to get done today?</Text>
                <Input 
                    placeholder="Read for 30 mins"
                    containerStyle={{width: '90%', marginVertical: 20}}
                    inputStyle={{fontSize: 22, color: 'lightgrey'}}
                    placeholderTextColor="grey"
                    onChangeText={(text) => props.handleChangeText(text)}
                    value={props.newTodoText}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={props.addTodo} activeOpacity={0.8} style={{...styles.button, backgroundColor: '#0299F0'}}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.closeModal} activeOpacity={0.8} style={{...styles.button, backgroundColor: '#B2BABB'}}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101010',
        flex: 1,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center'
    },
    button: {padding: 15, width: 150, marginHorizontal: 5},
    buttonText: {color: 'white', fontSize: 18, textAlign: 'center'}
});

export default AddTodoModal;