import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>Edit app/index.tsx to edit this screen.</Text>
      
      <TouchableOpacity> 
        <Text>Click me  </Text>  
      </TouchableOpacity>

    <Link href={"/about"}> visit about screen</Link>

    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
      },
  text: {
    fontSize: 20,
    color:"red"
  }
    });
