import React from "react";
import { TouchableOpacity, View, Image, Text, TouchableOpacityProps } from "react-native";

import DiscordImg from "../../assets/discord.png";
import { styles } from "./styles";

type ButtonIconProps = TouchableOpacityProps & {
  title: string
}

const ButtonIcon: React.FC<ButtonIconProps> = ({title, ...rest}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonIcon;
