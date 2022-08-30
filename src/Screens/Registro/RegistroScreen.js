import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {mainStyles, registroStyles, loginStyles} from '@styles/stylesGeneral';
import MyTextInput from '@Components/common/MyTextInput';
import color from '@styles/colors';
import ToolBar from '@Components/common/toolBar';
import {SocialIcon} from '@rneui/themed';
import MyButton from '@Components/common/MyButton';

function goToScreen(props, routeName) {
  props.navigation.navigate(routeName);
}

export default function RegistroScreen(props) {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: color.WHITE}}>
      <StatusBar backgroundColor={color.PRINCIPALCOLOR} translucent={true} />
      <ToolBar
        titulo="Introduce tus datos"
        onPressLeft={() => goToScreen(props, 'Login')}
        iconLeft={true}
      />
      <View style={mainStyles.container}>
        <MyTextInput
          keyboardType={null}
          placeholder="Usuario"
          image="account-circle"
        />
        <MyTextInput
          keyboardType="email-address"
          placeholder="Correo electrónico"
          image="email"
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Password"
          image="lock"
          bolGone={true}
          secureTextEntry={hidePassword}
          onPressIcon={() => setHidePassword(!hidePassword)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Confirmar Password"
          image="lock"
          bolGone={true}
          secureTextEntry={hidePasswordConfirm}
          onPressIcon={() => setHidePasswordConfirm(!hidePasswordConfirm)}
        />
        <MyTextInput
          keyboardType={null}
          placeholder="Tipo usuario"
          image="account-circle"
        />
        <MyButton
          titulo="SIGUIENTE"
          onPress={() => goToScreen(props, 'RegistroAdd')}
        />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: color.GRAY, fontSize: 16}}>
            o crea tu cuenta con tus redes sociales.{' '}
          </Text>
        </View>
        <View style={registroStyles.containerSocial}>
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title="Continuar con Facebook"
            button
            type="facebook"
          />
          <SocialIcon
            style={registroStyles.buttonSocialIcon}
            title="Continuar con Google"
            button
            type="google-plus-official"
          />
        </View>
        <View style={loginStyles.boxTransparent} />
      </View>
    </ScrollView>
  );
}
