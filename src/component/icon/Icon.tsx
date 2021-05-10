import React from 'react';
import {View} from 'react-native';
import {Colors} from '../Colors';
import BackAndroidIcon from './icons/BackAndroid';
import CloseOutline from './icons/CloseOutline';
import {IconBodyType} from './types';

type Props = IconBodyType & {
  name: string;
  style?: any;
};

// Perhaps we should keep it sorted alphabetically? Or have some kind of knowledge base/repo/wiki regarding the icons?
const icons: {[name: string]: React.ComponentType<any>} = {
  closeOutline: CloseOutline,
  back: BackAndroidIcon,
};

const Icon = ({name, color, size, style}: Props) => {
  const IconBody = icons[name];
  return (
    <View style={[style, iconStyles.container]}>
      {IconBody ? <IconBody color={color} size={size} /> : null}
    </View>
  );
};

Icon.defaultProps = {
  name: '',
  color: Colors.gray400,
  size: 24,
};

const iconStyles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Icon;
