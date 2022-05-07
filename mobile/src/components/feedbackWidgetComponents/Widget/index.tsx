import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { styles } from "./styles";
import { theme } from "../../../theme";
import { Options } from "../Options";
import { Form } from "../Form";
import { feedbackTypes } from "../../../utils/feedbackTypes";
import { Success } from "../Success";

export type FeedbackType = keyof typeof feedbackTypes;

function WidgetComponent() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleBackPress() {
    setFeedbackType(null);
  }

  function handleAnotherPress() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onAnotherPress={handleAnotherPress} />
        ) : (
          <>
            {feedbackType == null ? (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              <Form
                feedbackType={feedbackType}
                onBackPress={handleBackPress}
                onFeedbackSent={setFeedbackSent}
              />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetComponent);
