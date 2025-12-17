/**
 * Fix for "Failed to set an indexed property [0] on 'CSSStyleDeclaration'"
 * 
 * This patch must be loaded FIRST, before React Native Web import
 * It intercepts all attempts to set indexed properties on CSSStyleDeclaration
 */

if (typeof window !== 'undefined') {
  const proxiedStyles = new WeakMap<CSSStyleDeclaration, CSSStyleDeclaration>();
  
  function createProxiedStyle(style: CSSStyleDeclaration): CSSStyleDeclaration {
    if (proxiedStyles.has(style)) {
      return proxiedStyles.get(style)!;
    }
    
    const proxied = new Proxy(style, {
      set: function(target, prop, value) {
        if (typeof prop === 'string' && /^\d+$/.test(prop)) {
          return true;
        }
        try {
          (target as any)[prop] = value;
          return true;
        } catch (e) {
          return true;
        }
      },
      get: function(target, prop) {
        return (target as any)[prop];
      },
      defineProperty: function(target, prop, descriptor) {
        if (typeof prop === 'string' && /^\d+$/.test(prop)) {
          return true;
        }
        try {
          Object.defineProperty(target, prop, descriptor);
          return true;
        } catch (e) {
          return true;
        }
      }
    });
    
    proxiedStyles.set(style, proxied);
    return proxied;
  }
  
  const originalDefineProperty = Object.defineProperty;
  (Object as any).defineProperty = function(obj: any, prop: string | symbol, descriptor: PropertyDescriptor) {
    if (obj instanceof CSSStyleDeclaration && typeof prop === 'string' && /^\d+$/.test(prop)) {
      return obj;
    }
    return originalDefineProperty.call(this, obj, prop, descriptor);
  };
  
  const originalStyleDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style') || 
                                   Object.getOwnPropertyDescriptor(Element.prototype, 'style');
  
  if (originalStyleDescriptor && originalStyleDescriptor.get) {
    const originalStyleGetter = originalStyleDescriptor.get;
    
    Object.defineProperty(HTMLElement.prototype, 'style', {
      get: function() {
        const style = originalStyleGetter.call(this) as CSSStyleDeclaration;
        return createProxiedStyle(style);
      },
      configurable: true,
      enumerable: true
    });
  }
  
  if (typeof SVGElement !== 'undefined') {
    const svgStyleDescriptor = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'style');
    if (svgStyleDescriptor && svgStyleDescriptor.get) {
      const originalSvgStyleGetter = svgStyleDescriptor.get;
      
      Object.defineProperty(SVGElement.prototype, 'style', {
        get: function() {
          const style = originalSvgStyleGetter.call(this) as CSSStyleDeclaration;
          return createProxiedStyle(style);
        },
        configurable: true,
        enumerable: true
      });
    }
  }
  
  const originalError = console.error;
  console.error = function(...args: any[]) {
    const message = args.join(' ');
    if (message.includes('Failed to set an indexed property')) {
      return;
    }
    originalError.apply(console, args);
  };
  
  const originalErrorHandler = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (typeof message === 'string' && message.includes('Failed to set an indexed property')) {
      return true;
    }
    if (originalErrorHandler) {
      return originalErrorHandler.call(this, message, source, lineno, colno, error);
    }
    return false;
  };
}

