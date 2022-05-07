import { View, Image, Text, TouchableOpacity } from "react-native";

import successImg from "../../../assets/success.png";
import { Copyright } from "../Copyright";
import { styles } from "./styles";

interface IProps {
  onAnotherPress: () => void;
}

export function Success({ onAnotherPress }: IProps) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o Feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onAnotherPress}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
