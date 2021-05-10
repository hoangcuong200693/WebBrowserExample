import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from './Colors';
import Icon from './icon/Icon';

type Props = {
  size?: number;
  onPress?: () => void | null;
};

const BackButton: React.FC<Props> = ({onPress, size}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="back" color={Colors.ink300} size={size ?? 24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

export default BackButton;
