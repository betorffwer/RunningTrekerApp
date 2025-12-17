import { Link } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

/**
 * Safe wrapper for Link component that fixes
 * "Failed to set an indexed property [0] on 'CSSStyleDeclaration'"
 * on web platform by wrapping Link in View
 */
export function SafeLink(
  props: React.ComponentProps<typeof Link>
) {
  const { style, children, ...restProps } = props;
  
  if (Platform.OS === 'web') {
    const flattenedStyle = StyleSheet.flatten(style) as ViewStyle | undefined;
    
    if (props.asChild) {
      return (
        <View style={flattenedStyle}>
          <Link {...restProps} />
        </View>
      );
    }
    
    return (
      <View style={flattenedStyle}>
        <Link {...restProps}>
          {children}
        </Link>
      </View>
    );
  }
  
  return <Link {...props} />;
}

