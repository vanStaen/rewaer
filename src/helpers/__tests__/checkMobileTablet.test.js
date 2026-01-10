import { isMobileCheck, isMobileOrTabletCheck } from '../dev/checkMobileTablet';

describe('isMobileCheck', () => {
  const originalNavigator = navigator;

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
  });

  it('should return boolean', () => {
    const result = isMobileCheck();
    expect(typeof result).toBe('boolean');
  });

  it('should detect iPhone as mobile', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileCheck()).toBe(true);
  });

  it('should detect Android mobile with specific user agent', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Linux; Android 10; SM-G960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileCheck()).toBe(true);
  });

  it('should not detect iPad as mobile', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X)',
        vendor: 'Apple',
      },
      configurable: true,
    });
    expect(isMobileCheck()).toBe(false);
  });

  it('should not detect desktop as mobile', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileCheck()).toBe(false);
  });

  it('should detect BlackBerry as mobile', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800;)',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileCheck()).toBe(true);
  });

  it('should handle non-empty user agent gracefully', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        vendor: '',
      },
      configurable: true,
    });
    const result = isMobileCheck();
    expect(typeof result).toBe('boolean');
  });
});

describe('isMobileOrTabletCheck', () => {
  const originalNavigator = navigator;

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
    });
  });

  it('should return boolean', () => {
    const result = isMobileOrTabletCheck();
    expect(typeof result).toBe('boolean');
  });

  it('should detect iPhone as mobile or tablet', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileOrTabletCheck()).toBe(true);
  });

  it('should detect iPad as mobile or tablet', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 13_2 like Mac OS X)',
        vendor: 'Apple',
      },
      configurable: true,
    });
    expect(isMobileOrTabletCheck()).toBe(true);
  });

  it('should detect Android tablet as mobile or tablet', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-T590)',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileOrTabletCheck()).toBe(true);
  });

  it('should not detect desktop as mobile or tablet', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileOrTabletCheck()).toBe(false);
  });

  it('should detect Kindle as mobile or tablet', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Kindle; Linux)',
        vendor: '',
      },
      configurable: true,
    });
    expect(isMobileOrTabletCheck()).toBe(true);
  });
});
