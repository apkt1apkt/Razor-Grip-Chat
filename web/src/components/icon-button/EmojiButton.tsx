import "emoji-mart/css/emoji-mart.css";
import { useState } from "react";
import { Picker } from "emoji-mart";
import { useReactiveVar } from "@apollo/client";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import EmojiIcon from "@material-ui/icons/EmojiEmotions";
import IconButton from "@material-ui/core/IconButton";

import { themeVar } from "@web/reactive";
import { bottomPaneHeight } from "@web/fixed";

export default function EmojiButton(props: EmojiButtonProps) {
  const { className, getValue } = props;
  const [showPicker, setShowPicker] = useState(false);
  const theme = useReactiveVar(themeVar);
  const toggleShowPicker = () => setShowPicker(!showPicker);
  const onHidePicker = () => setShowPicker(false);
  const handleSelect = (emojiObj: any) => {
    if (getValue) getValue(emojiObj.native);
  };
  return (
    <>
      <ClickAwayListener onClickAway={onHidePicker}>
        <div className={className}>
          <IconButton onClick={toggleShowPicker} color="primary" size="small">
            <EmojiIcon />
          </IconButton>
          <div style={{ display: showPicker ? "block" : "none" }}>
            <Picker
              set="twitter"
              showSkinTones={false}
              showPreview={false}
              autoFocus
              theme={theme}
              onSelect={handleSelect}
              style={{ position: "absolute", bottom: bottomPaneHeight, left: 0 }}
            />
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}

type EmojiButtonProps = {
  className?: string;
  getValue?: (emoji: string) => void;
};
