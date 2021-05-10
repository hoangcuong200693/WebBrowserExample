import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  ReturnKeyTypeOptions,
} from 'react-native';
import BackButton from './BackButton';
import CloseButton from './CloseButton';
import {Colors} from './Colors';

type Props = {
  onChangeText: (value: string) => void;
  value?: string;
  placeholder?: string;
  autoFocus?: boolean | null;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmit?: () => void;
  inputRef?: React.RefObject<TextInput>;
  showBack?: boolean;
  onBackClick?: () => void;
};

const InputBar: React.FC<Props> = ({
  onChangeText,
  value,
  placeholder,
  autoFocus = true,
  returnKeyType,
  onSubmit,
  inputRef,
  showBack,
  onBackClick,
}: Props) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      {showBack === true && <BackButton size={20} onPress={onBackClick} />}
      <View style={styles.textInputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
          autoFocus={autoFocus ?? true}
          keyboardType="url"
          autoCompleteType="off"
          onSubmitEditing={onSubmit}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        {value !== '' && isFocus === true && (
          <CloseButton
            size={20}
            onPress={() => {
              onChangeText('');
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.white400,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.ink100,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.blue500,
    marginHorizontal: 8,
    marginBottom: Platform.OS === 'android' ? 4 : 8,
  },
  icon: {
    marginLeft: 11,
    marginEnd: 11,
    marginTop: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    color: Colors.gray500,
    padding: 0,
    fontSize: 15,
  },
});

export default InputBar;
