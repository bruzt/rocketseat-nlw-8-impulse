import { Image, Text, TextInput, View } from "react-native";
import { ArrowLeft } from "phosphor-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

import { styles } from "./style";
import { theme } from "../../../theme";
import { FeedbackType } from "../Widget";
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { ScreenshotButton } from "../ScreenshotButton";
import { SubmitButton } from "../SubmitButton";
import { useState } from "react";
import { api } from "../../../services/api";

interface IProps {
  feedbackType: FeedbackType;
  onBackPress: () => void;
  onFeedbackSent: (feedbackSent: boolean) => void;
}

export function Form({ feedbackType, onBackPress, onFeedbackSent }: IProps) {
  const [feedbackComment, setFeedbackComment] = useState("");
  const [screenshot, setScreeshot] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const feedbackInfo = feedbackTypes[feedbackType];

  async function takeShot() {
    try {
      const uri = await captureScreen({
        format: "jpg",
        quality: 0.8,
      });

      setScreeshot(uri);
    } catch (error) {
      console.log(error);
    }
  }

  function removeShot() {
    setScreeshot(null);
  }

  async function handleSubmitButton() {
    try {
      setIsSending(true);

      const screenshotBase64 =
        screenshot &&
        (await FileSystem.readAsStringAsync(screenshot, {
          encoding: "base64",
        }));

      await api.post("/feedbacks", {
        type: feedbackType,
        comment: feedbackComment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      });

      setIsSending(false);
      onFeedbackSent(true);
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackPress}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo!"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        value={feedbackComment}
        onChangeText={setFeedbackComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={takeShot}
          onRemoveShot={removeShot}
        />

        <SubmitButton
          isLoading={isSending}
          disabled={isSending}
          onPress={handleSubmitButton}
        />
      </View>
    </View>
  );
}
