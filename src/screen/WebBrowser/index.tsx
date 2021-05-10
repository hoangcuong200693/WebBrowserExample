import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {WebViewSource} from 'react-native-webview/lib/WebViewTypes';
import {Colors} from '../../component/Colors';
import InputBar from '../../component/InputBar';
import {formatUrl} from '../../util/UrlUtil';

const WebBrowser = () => {
  const [canGoBack, setCanGoback] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>('');
  const [linkSubmit, setLinkSubmit] =
    useState<WebViewSource | undefined>(undefined);
  const submitUrl = useCallback(() => {
    setLinkSubmit({uri: formatUrl(url)});
  }, [url]);

  const webviewRef = useRef<WebView>(null);
  const reload = useCallback(() => webviewRef.current?.reload(), []);
  const goBack = useCallback(() => webviewRef.current?.goBack(), []);

  const onStartLoading = useCallback(() => {
    setLoading(true);
  }, []);
  const onStopLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack === true) {
        goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack, goBack]);

  const renderLoading = useCallback(
    () => (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color={Colors.darkblue600} />
      </View>
    ),
    [],
  );
  const renderError = useCallback(
    (_: string | undefined, __: number, errorDesc: string) => (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.errorText}>{errorDesc}</Text>
        <TouchableOpacity onPress={reload}>
          <Text style={styles.reloadButton}>Reload</Text>
        </TouchableOpacity>
      </View>
    ),
    [reload],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <InputBar
          onChangeText={setUrl}
          autoFocus={false}
          value={url}
          onSubmit={submitUrl}
          returnKeyType={'go'}
          placeholder={'Input URL'}
          onBackClick={goBack}
          showBack={canGoBack}
        />
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={reload}
              enabled={isEnabled}
            />
          }>
          <WebView
            ref={webviewRef}
            source={linkSubmit}
            scalesPageToFit={Platform.select({android: false})}
            allowsLinkPreview
            renderLoading={renderLoading}
            renderError={renderError}
            onLoadStart={onStartLoading}
            onLoadEnd={onStopLoading}
            cacheEnabled
            startInLoadingState={true}
            onNavigationStateChange={navState => {
              setCanGoback(navState.canGoBack);
              setUrl(navState.url);
              setLoading(navState.loading);
            }}
            pullToRefreshEnabled
            onScroll={e => setEnabled(e.nativeEvent.contentOffset.y === 0)}
          />
        </ScrollView>
        {isLoading && renderLoading()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {flex: 1, flexDirection: 'column', alignItems: 'center'},
  safe: {flex: 1},
  container: {flex: 1},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  containerLoading: {
    flex: 1,
  },
  errorText: {
    color: Colors.red500,
  },
  reloadButton: {
    color: Colors.white400,
    padding: 10,
    marginTop: 20,
    backgroundColor: Colors.primary500,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default WebBrowser;
