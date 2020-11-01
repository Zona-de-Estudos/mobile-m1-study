import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from "./services/api"

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("projects")
        .then(res => setProjects(res.data))
        .catch(err => console.error(err))
    })

    async function handleAddProject() {
        const obj = {
            "title": "Novo Projeto 12412356",
            "owner": "johnvidal77"
        };

        try{
            const response = await api.post("projects", obj)

            setProjects([...projects, response.data])
        } catch(err) {
            console.error(err)
        }
    }

    return (
            <>
            <StatusBar barStyle="light-content" backgroundColor="#7158c9"/>
            <SafeAreaView style={Styles.container}>
                <FlatList
                    style={Styles.list}
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({item}) => (
                        <Text style={Styles.text}>{item.title}</Text>
                    )}
                    />
                <TouchableOpacity onPress={handleAddProject} activeOpacity={0.6} style={Styles.button}>
                    <Text style={Styles.buttonText}>Adicionar Projetos</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </>
        )
}

const Styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#7159c1",
        },
        list: {
            padding: 15
        },
        text: {
            fontSize: 16,
            fontWeight: "400",
            color: "#FFF"
        },
        button: {
            backgroundColor: "#FFF",
            margin: 20,
            height: 50,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center"
        },
        buttonText: {
            fontSize: 24,
            color: "#7159c1",
            fontWeight: "bold"
        }
    }
)

export default App
