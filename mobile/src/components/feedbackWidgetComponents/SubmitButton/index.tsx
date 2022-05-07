import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../../theme";

import { styles } from "./styles";

interface IProps extends TouchableOpacityProps {
  isLoading: boolean;
}

export function SubmitButton({ isLoading, ...rest }: IProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.title}>Enviar Feedback</Text>
      )}
    </TouchableOpacity>
  );
}
