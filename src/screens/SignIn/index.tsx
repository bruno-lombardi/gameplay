import React from "react";
import { View, Image, Text, StatusBar } from "react-native";
import { styles } from "./styles";

import SignInIllustration from "../../assets/illustration.png";
import ButtonIcon from "../../components/ButtonIcon";

const SignIn: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <Image
        source={SignInIllustration}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Organize{"\n"}
          suas jogatinas{"\n"}
          facilmente
        </Text>

        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games {"\n"}
          favoritos com seus amigos
        </Text>

        <ButtonIcon title="Entrar com Discord" />
      </View>
    </View>
  );
};

export default SignIn;
