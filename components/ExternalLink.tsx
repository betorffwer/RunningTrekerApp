import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }
) {
  const { style, children, ...restProps } = props;
  
  if (Platform.OS === 'web') {
    const flattenedStyle = StyleSheet.flatten(style) as ViewStyle | undefined;
    return (
      <View style={flattenedStyle}>
        <Link
          target="_blank"
          {...restProps}
          href={props.href as any}
        >
          {children}
        </Link>
      </View>
    );
  }
  
  return (
    <Link
      target="_blank"
      {...props}
      href={props.href as any}
      onPress={(e) => {
        // Prevent the default behavior of linking to the default browser on native.
        e.preventDefault();
        // Open the link in an in-app browser.
        WebBrowser.openBrowserAsync(props.href as string);
      }}
    />
  );
}
