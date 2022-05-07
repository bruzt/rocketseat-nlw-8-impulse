import { Text, View } from "react-native";

import { Copyright } from "../Copyright";
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { styles } from "./styles";
import { Option } from "../Option";
import { FeedbackType } from "../Widget";

interface IProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
