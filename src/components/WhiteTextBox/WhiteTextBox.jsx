import React from "react";
import WhiteBox from "../Containers/WhiteBox";
import Flex from "../Flex/Flex";
import styles from "./WhiteTextBox.module.scss";
import { P12, P13, P16 } from "../TXT/TXT";

function WhiteTextBox({
  // for WhiteBox
  children,
  topline = false,
  botline = false,
  topmargin = false,
  botmargin = false,
  className = "",
  // for text and content
  top_text = null,
  main_text = null,
  bot_text = null,
  flcn = "",
  ttcn = "",
  mtcn = "",
  btcn = "",
}) {
  return (
    <WhiteBox
      botline={botline}
      topline={topline}
      botmargin={botmargin}
      topmargin={topmargin}
      className={className}
    >
      <Flex flex="between" className={`${styles.flex} ${flcn}`}>
        <div className={styles.txts}>
          {top_text && (
            <P13 className={`${styles.top_text} ${ttcn}`}>{top_text}</P13>
          )}
          {main_text && (
            <P16 className={`${styles.main_text} ${mtcn}`}>{main_text}</P16>
          )}
          {bot_text && (
            <P12 className={`${styles.bot_text} ${btcn}`}>{bot_text}</P12>
          )}
        </div>

        <div className={styles.additionals}>{children}</div>
      </Flex>
    </WhiteBox>
  );
}

export default WhiteTextBox;
